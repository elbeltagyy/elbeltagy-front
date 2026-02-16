import { useState } from "react";
import Section from "../../../style/mui/styled/Section"
import CreateQuestions from "../CreateQuestions"

import TabsAutoStyled from "../../../style/mui/styled/TabsAutoStyled";
import WordManual from "./WordManual";
import TitleWithDividers from "../../ui/TitleWithDividers";
import { useFormatQAiMutation } from "../../../toolkit/apis/questionsApi";
import usePostData from "../../../hooks/usePostData";
import WrapperHandler from "../../../tools/WrapperHandler";
 
 
import MakeForm from "../../../tools/makeform/MakeForm";
import useGrades from "../../../hooks/useGrades";


function QuestionsExtraction({ extractorFc, accept, title, grade }) {
    const {grades} = useGrades()
    const [questions, setQuestions] = useState([]);
    const [preDefined, setPreDefined] = useState({grade})

    const [formatAi, status] = useFormatQAiMutation()
    const [formatQuestions] = usePostData(formatAi)


    const info = {
        ai: 'AI قد تظهر بعض الاخطاء و النتيجه لا تكون متشابهه فى كل مره',
        markers: 'يمكن تخصيص محددات لشكل السؤال و الاختيار كما يلي:  q <1->  السؤال يبدا باي رقم يتبعه -, <<q>> السؤال يبدا بحرف q, <q> السؤال يبدا باي حرف, o نفس الكلام لتحديد الاختيار ولكن بوصف حرف, ِo or q يمكن عدم وضع هذه الرموز وسيتعرف النظام ان اول محدد هو سؤال والباقي للاختيارات'
    }

    const tabs = [
        { label: 'استخراج يدويا', component: <WordManual setQuestions={setQuestions} extractorFc={extractorFc} accept={accept} info={info} preDefined={preDefined}  />  },
        { label: 'استخراج AI', component: <WordManual setQuestions={setQuestions} extractorFc={extractorFc} accept={accept} isAi aiFormatting={formatQuestions} preDefined={preDefined} /> }
    ]

    const inputs = [
        {
            name: 'grade',
            label:'الصف الدراسي',
            type: 'select',
            options: grades.map(g => ({label: g.name, value: g.index})),
        }
    ]

    return (
        <Section>
            <TitleWithDividers title={title} />
            <MakeForm preValue={preDefined}  inputs={inputs} disableConfirm  onSubmit={setPreDefined} isResetNewVal SEND={'حفظ'} />
            <TabsAutoStyled originalTabs={tabs} searchVal="extraction" />
            <br />
            {questions.length > 0 &&
                <CreateQuestions questions={questions} />
            }
            <WrapperHandler status={status} />
        </Section>
    )
}

export default QuestionsExtraction