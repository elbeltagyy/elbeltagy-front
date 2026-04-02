import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { FlexColumn, FlexRow } from "../../../style/mui/styled/Flexbox";
import SwitchStyled from "../../../style/mui/styled/SwitchStyled";
import {  buildRegexFromArray, lettersAndSymbolsArray, normalizeQuestion, parseQuestions } from "./ParseDoc";

const questionPatterns = [
    "<2->",
    "<2–>",
    "<2.>",
    "<aA->",
    "<aA–>",
    "<aA.>"
]
const lettersAndSymbols = {
    letters: ['ا', 'أ', 'أ –', 'ب', 'ج', 'د', 'جـ'],
    symbols: ['(', ')', '-', '--', '_', '–', 'ـ'],
    joined: { before: ['('], after: [')'] }
}

const optionPatterns =
    [...lettersAndSymbolsArray(lettersAndSymbols), '<a)>', '<(a)>', '<A)>','<(A)>',"<➀>", '<➁>', '<➂>', '<➂>', '<➃>']


function WordManual({ setQuestions, extractorFc, accept = '.docx', isAi = false ,aiFormatting, preDefined={},info={}}) {
    const [schema, setSchema] = useState({ questionPatterns: null, optionPatterns: null });
    const [inputSchema, setInputSchema] = useState('')
    const [isWideSchema, setISWideSchema] = useState(true);
    const [isSaved, setIsSave] = useState(false)
    const [dir, setDir] = useState('rtl');
    const [isKeepHtml, setIsKeepHtml] = useState(false)

    function extractPatternsFromSchema() {
        const questionPatterns = [];
        const optionPatterns = [];

        const lines = inputSchema
            .split(/\r?\n/)
            .map(l => l.trim())
            .filter(Boolean);

        let foundExplicitQuestion = false;
        let foundExplicitOption = false;
        const autoPatterns = [];

        for (const line of lines) {
            // 1️⃣ explicit q= with double << >>
            let match = line.match(/^(q|Q)\s*=\s*(<<[^>]+>>)/);
            if (match) {
                questionPatterns.push(match[2]);
                foundExplicitQuestion = true;
                continue;
            }

            // 2️⃣ explicit q= with single <>
            match = line.match(/^(q|Q)\s*=\s*(<[^>]+>)/);
            if (match) {
                questionPatterns.push(match[2]);
                foundExplicitQuestion = true;
                continue;
            }

            // 3️⃣ explicit o= with double << >>
            match = line.match(/^(o|O)\s*=\s*(<<[^>]+>>)/);
            if (match) {
                optionPatterns.push(match[2]);
                foundExplicitOption = true;
                continue;
            }

            // 4️⃣ explicit o= with single <>
            match = line.match(/^(o|O)\s*=\s*(<[^>]+>)/);
            if (match) {
                optionPatterns.push(match[2]);
                foundExplicitOption = true;
                continue;
            }

            // 5️⃣ fallback: detect first << >> or < >
            match = line.match(/(<<[^>]+>>|<[^>]+>)/);
            if (match) {
                autoPatterns.push(match[1]);
            }
        }

        // 🧠 auto-distribution if q= / o= not used
        if (!foundExplicitQuestion && autoPatterns.length) {
            questionPatterns.push(autoPatterns[0]);
        }

        if (!foundExplicitOption && autoPatterns.length > 1) {
            optionPatterns.push(...autoPatterns.slice(1));
        }
        setIsSave(true);
        setSchema({
            questionPatterns,
            optionPatterns
        })
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const text = await extractorFc(file, { isHtml: isKeepHtml, isArray: !isAi});
        // console.log('extracted ==>',text)
        const rawQuestions = (isAi && aiFormatting) ? await aiFormatting({text: text.slice(0, 20000)}) : parseQuestions(text,
            {
                questionPatterns: (schema.questionPatterns && !isWideSchema) ? schema.questionPatterns : questionPatterns,
                optionPatterns: (schema.optionPatterns && !isWideSchema) ? schema.optionPatterns : optionPatterns
            });
        // console.log('ait reponse ==>', rawQuestions)
        const normalized = rawQuestions.map(normalizeQuestion(preDefined));
        setQuestions(normalized)
    };
    // console.log(buildRegexFromArray(optionPatterns).test('a)  mahmoud'))
    // console.log(schema)
    return (
        <Box mt={'24px'}>
            <FlexColumn gap={'16px'}>
                {!isAi ? (

                    <Box>
                        <FlexRow>
                            <SwitchStyled
                                checked={isWideSchema}
                                onChange={setISWideSchema} label={'استعمال محددات تلقائيه'}
                            />
                            {!isWideSchema &&
                                <SwitchStyled
                                    checked={dir === 'rtl'}
                                    onChange={(v) => setDir(v ? 'rtl' : 'ltr')} label={'Right to Left'}
                                />}
                        </FlexRow>

                        {!isWideSchema && <>
                            <TextField dir={dir} helperText={info.markers} fullWidth label="حدد شكل السؤال" onChange={(e) => setInputSchema(e.target.value)} rows={6} multiline />
                            <Button variant="contained" onClick={extractPatternsFromSchema}>{isSaved ? 'تم الحفظ' : 'اكتشف الشكل'}</Button>
                            <FlexRow gap={'24px'}>
                                {(schema.questionPatterns?.length && isSaved) && <ul>
                                    السؤال: {schema.questionPatterns.map(p => (<li key={p}>{p} </li>))}
                                </ul>}
                                {schema.optionPatterns?.length && isSaved && (<ul>
                                    الاختيارات: {schema.optionPatterns.map(p => (<li key={p}>{p} </li>))}
                                </ul>)}
                            </FlexRow>
                        </>}
                    </Box>
                ) : <SwitchStyled
                    checked={isKeepHtml}
                    onChange={setIsKeepHtml} label={'حفظ التنسيقات (في حالات الرموز الكيميائيه)'}
                />}

                <input
                    type="file"
                    accept={accept}
                    onChange={handleUpload}
                />
            </FlexColumn>
        </Box>
    )
}

export default WordManual
