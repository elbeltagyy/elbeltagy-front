import examMethods, { examConstants, getExamMethod } from "./examMethods";

const sectionConstants = {
  VIDEO: "فيديو",
  FILE: "ملف PDF",
  EXAM: "اختبار",
  LINK: "لينك",
  EXAM_EXERCISE: "تدريب",
};

export const sectionConstantsArr = [
    { value: sectionConstants.VIDEO, label: "فيديو", isActive: true },
    { value: sectionConstants.FILE, label: "ملف PDF", isActive: true },
    { value: sectionConstants.EXAM, label: "اختبار", isActive: true },
    { value: sectionConstants.EXAM_EXERCISE, label: "تدريب", isActive: true },
    { value: sectionConstants.LINK, label: "لينك", isActive: true },
];


export const examExerciseDefault = {
    isTime: false,
    method: examConstants.QUESTION,
}

export default sectionConstants;
