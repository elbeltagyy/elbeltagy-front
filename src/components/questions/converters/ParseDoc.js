import mammoth from "mammoth";
import { v4 as uuidv4 } from "uuid";

export const wordExtractor = async (file, settings) => {
  const isHtml = settings?.isHtml ?? false;
  const isArray = settings?.isArray ?? true;

  const arrayBuffer = await file.arrayBuffer();
  const result = isHtml
    ? await mammoth.convertToHtml({ arrayBuffer })
    : await mammoth.extractRawText({ arrayBuffer }); //extractRawText

  const text = result.value; //Content in string format
  const lines = isArray
    ? text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
    : text;
  // console.log(lines)
  return lines;
};
// import pdfToText from "react-pdftotext";
import { PDFParse } from "pdf-parse";
PDFParse.setWorker(
  "https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs",
);

export const pdfExtractor = async (file, settings) => {
  const isArray = settings.isArray ?? true;

  const arrayBuffer = await file.arrayBuffer();
  const parser = new PDFParse({ data: arrayBuffer });

  const result = await parser.getText();
  const text = result.text;

  const lines = isArray
    ? text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
    : text;

  return lines;
};
// Done

export const normalizeQuestion = (preDefined) => (q) => {
  const question = {
    ...preDefined,
    title: q.title || "",
    // hints: "",
    // image: "",
    rtOptionId: "",
    points: 1,
    isShuffle: true,
    clarifyText: "",
    clarifyUrl: "",
    options: [],
  };

  question.options = q.options.map((opt) => {
    const optId = uuidv4();
    if (opt.isCorrect) {
      question.rtOptionId = optId;
    }
    return {
      id: optId,
      title: opt.title,
    };
  });

  return question;
}

const normalizeOptionSpacing = (s) =>
  s
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s*([–\-ـ_])\s*/g, "$1");

export function parseQuestions(lines, settings = {}) {
  //manual extraction
  const questions = [];
  let currentQuestion = null;

  const questionReqEXp = buildRegexFromArray(settings.questionPatterns, "");
  const optionReqEXp = buildRegexFromArray(settings.optionPatterns, {
    flags: "g",
    anchor: false,
  });

  for (const rawLine of lines) {
    // const line = rawLine.trim();
    const line = normalizeOptionSpacing(rawLine.trim());
    if (!line) continue;

    // NEW QUESTION
    if (isQuestionStart(line, questionReqEXp)) {
      if (currentQuestion) questions.push(currentQuestion);
      currentQuestion = {
        title: stripQuestionStart(line, questionReqEXp),
        options: [],
      };
      continue;
    }

    if (!currentQuestion) continue;

    // INLINE OPTIONS
    const inline = splitTitleAndOptions(line, optionReqEXp);
    if (inline) {
      if (inline.title) currentQuestion.title += " " + inline.title;
      currentQuestion.options.push(
        ...extractOptionsFromLine(inline.optionsText, optionReqEXp),
      );
      continue;
    }

    // OPTIONS ONLY LINE
    const extracted = extractOptionsFromLine(line, optionReqEXp);
    if (extracted.length) {
      currentQuestion.options.push(...extracted);
      continue;
    }

    // CORRECT ANSWER LINE (D, E, B ...)
    if (currentQuestion && isAnswerLetter(line)) {
      const correctIndex = answerLetterToIndex(line);

      currentQuestion.options = currentQuestion.options.map((opt, i) => ({
        ...opt,
        isCorrect: i === correctIndex,
      }));

      currentQuestion.correctAnswer = line; // optional, for debugging
      continue;
    }

    // TITLE CONTINUATION
    if (currentQuestion.options.length === 0) {
      currentQuestion.title += " " + line;
    }
  }

  if (currentQuestion) questions.push(currentQuestion);
  return questions;
}

function isAnswerLetter(line) {
  return /^[A-E]$/.test(line.trim());
}

function answerLetterToIndex(letter) {
  return letter.charCodeAt(0) - 65; // A→0, B→1, ...
}

function extractOptionsFromLine(line, optionRegex) {
  const matches = [...line.matchAll(optionRegex)];
  if (!matches.length) return [];

  const options = [];

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = matches[i + 1]?.index ?? line.length;

    const rawOption = line.slice(start, end).trim();

    const cleanText = rawOption
      .replace(optionRegex, "") // 🔥 remove marker
      .trim();

    if (cleanText) {
      options.push({ title: cleanText });
    }
  }

  return options;
}

function isQuestionStart(line, regExp) {
  return regExp.test(line);
  // return /^\d+\s*[-.]/.test(line) || /^[A-Za-z]\s*[-.]/.test(line);
}

function stripQuestionStart(line, regExp) {
  return line.replace(regExp, "").trim();
}

function splitTitleAndOptions(line, optionReqExp) {
  const match = optionReqExp.exec(line);
  optionReqExp.lastIndex = 0;

  if (!match) return null;

  const titlePart = line.slice(0, match.index).trim();
  const optionsPart = line.slice(match.index).trim();

  return {
    title: titlePart,
    optionsText: optionsPart,
  };
}

export const lettersAndSymbolsArray = (lettersAndSymbols) => {
  const { letters, symbols, joined = {} } = lettersAndSymbols;
  const formatted = letters
    .map((letter) => {
      const letterForms = symbols.map((symbol) => {
        return "<<" + letter + symbol + ">>";
      });
      const { before, after } = joined;
      const joinedLetters = before.map((b, i) => {
        return "<<" + b + letter + after[i] + ">>";
      });

      return [...letterForms, ...joinedLetters];
    })
    .flat();
  return formatted;
};

export function buildRegexFromArray(
  patterns,
  settings = { flags: "g", anchor: true },
) {
  const flags = settings.flags || "g";
  const anchor = settings.anchor;

  const CLASSES = {
    lower: "a-z",
    upper: "A-Z",
    digit: "0-9",
    arabic: "\u0600-\u06FF",
    circledDigit: "\u2780-\u2789",
  };

  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const buildClassAndLiterals = (content) => {
    let parts = [];
    let buffer = "";
    let currentClass = null;

    const flush = () => {
      if (!buffer) return;

      if (currentClass) {
        parts.push(`[${currentClass}]+`);
      } else {
        parts.push(escapeRegex(buffer));
      }

      buffer = "";
      currentClass = null;
    };

    for (const ch of content) {
      let cls = null;

      if (/[a-z]/.test(ch)) cls = CLASSES.lower;
      else if (/[A-Z]/.test(ch)) cls = CLASSES.upper;
      else if (/[0-9]/.test(ch)) cls = CLASSES.digit;
      else if (/[\u0600-\u06FF]/.test(ch)) cls = CLASSES.arabic;

      // same class → continue
      if (cls && cls === currentClass) {
        buffer += ch;
      }
      // switch class or literal
      else {
        flush();
        currentClass = cls;
        buffer += ch;
      }
    }

    flush();

    // 🔥 allow spaces between ALL parts (symbols before or after)
    return parts.join("\\s*");
  };

  const parseToken = (token) => {
    // << exact >>
    if (token.startsWith("<<") && token.endsWith(">>")) {
      const exact = token.slice(2, -2).replace(/\s+/g, "");
      return escapeRegex(exact);
    }

    // < class + symbols >
    if (token.startsWith("<") && token.endsWith(">")) {
      // const content = token.slice(1, -1);
      const content = token.slice(1, -1).replace(/\s+/g, "");
      return buildClassAndLiterals(content);
    }

    return escapeRegex(token);
  };

  const source = patterns
    .map(
      (pattern) =>
        pattern
          .match(/<<.*?>>|<.*?>|./g)
          .map(parseToken)
          .join("\\s*"), // 🔥 allow spaces between tokens too
    )
    .join("|");

  // numbering = start of line
  const NOT_DECIMAL_NUMBER = `(?!\\d+\\.\\d+)`;

  return anchor
    ? new RegExp(`^${NOT_DECIMAL_NUMBER}(${source})`, flags)
    : new RegExp(`${NOT_DECIMAL_NUMBER}(${source})`, flags);
}

//# ORIGIN ____________+++++++++++++++++++
// const OPTION_REGEX = (optionPatterns) =>
//   buildRegexFromArray(optionPatterns);
// new RegExp(
//   String.raw`(?:^|\s)(?:\(([AaBbCcDdأبجد])\)|([AaBbCcDdأبجد])(?:ـ)?\s*[)\-–—.(])\s*`,
//   "g",
// );
// const OPTION_REGEX = new RegExp(
//   String.raw`(?:^|\s)([AaBbCcDdأبجدد](?:ـ)?\s*[)\-–—.(])\s*`,
//   "g",
// );