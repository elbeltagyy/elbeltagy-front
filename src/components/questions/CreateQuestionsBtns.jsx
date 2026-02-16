import { useState } from "react"
import BtnsGroup from "../../style/mui/styled/BtnsGroup"
import BtnModal from "../ui/BtnModal"
import CreateQuestions from "./CreateQuestions"
import Section from "../../style/mui/styled/Section"

import RapidQuestions from "./converters/RapidQuestions"
import ModalStyled from "../../style/mui/styled/ModalStyled"

import QuestionsExtraction from "./converters/QuestionsExtraction"
import { pdfExtractor, wordExtractor } from "./converters/ParseDoc"

function CreateQuestionsBtns({ activeTag, grade, setReset }) {

    const [questions, setQuestions] = useState([])
    const [open, setOpen] = useState(false)
    const [close, setClose] = useState(false)

    const appendQuestions = (questions) => {
        setQuestions(questions)
        setClose(p => !p)
        setOpen(true)
    }
    //Each component
    //1- title & info
    //2- Form & action
    //3- onClick => setQuestions
    const btns = [
        {
            btn: <BtnModal color={'purple'}
                btnName={'انشاء سؤال يدويا' + ' ' + (activeTag ? activeTag.name : '')}
                size='medium' isFilledHover={true}
                component={<CreateQuestions defaultQuestion={{
                    grade: activeTag?.grade ?? grade, tags: activeTag
                }}
                    setReset={setReset} />}
            />
        }, {
            //
            btn: <BtnModal color={'green'} close={close}
                btnName={'انشاء اسئله سريعا ' + ' ' + (activeTag ? activeTag.name : '')}
                size='medium' isFilledHover={true}
                component={<RapidQuestions appendQuestions={appendQuestions} title={'انشاء اسئله سريعا ' + ' ' + (activeTag ? activeTag.name : '')} />}
            />
        }, {
            btn: <BtnModal
                btnName={' استخراج الاسئله من WORD' + ' ' + (activeTag ? activeTag.name : '')}
                size='medium' isFilledHover={true}
                component={<QuestionsExtraction
                    extractorFc={wordExtractor} grade={grade}
                    title={' استخراج الاسئله من WORD' + ' ' + (activeTag ? activeTag.name : '')} />}
            />
        }, {
            btn: <BtnModal color={'red'}
                btnName={'استخراج اسئلة من ملف PDF' + ' ' + (activeTag ? activeTag.name : '')}
                size='medium' isFilledHover={true}
                component={<QuestionsExtraction
                    extractorFc={pdfExtractor} accept={'.pdf'} grade={grade}
                    title={'استخراج اسئلة من ملف PDF' + ' ' + (activeTag ? activeTag.name : '')} />}
            />
        }, 
        // {
        //     btn: <BtnModal color={'orange'}
        //         btnName={'استخراج اسئلة من صوره' + ' ' + (activeTag ? activeTag.name : '')}
        //         size='medium' isFilledHover={true}
        //         component={<>Hello WOrld</>}
        //     />
        // },
    ]

    return (
        <div>
            <BtnsGroup btns={btns} />
            <ModalStyled open={open} setOpen={setOpen}>
                <Section>
                    <CreateQuestions questions={questions} setReset={setReset} />
                </Section>
            </ModalStyled>
            {/* <BtnModal btnName={'انشاء سؤال' + ' ' + (activeTag ? activeTag.name : '')}
                component={<CreateQuestions defaultQuestion={{
                    grade: activeTag?.grade ?? grade, tags: activeTag
                }} setReset={setReset} />}
                size='medium' isFilledHover={true} /> */}
        </div>
    )
}

export default CreateQuestionsBtns
