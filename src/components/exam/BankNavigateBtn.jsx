import { Button } from "@mui/material"
import { sendSuccess } from "../../style/buttonsStyles"
import ModalStyled from "../../style/mui/styled/ModalStyled"
import { useState } from "react"

function BankNavigateBtn({ navigateToAnswers, exam, questions, submit }) {

    const [open, setOpen] = useState(false)

    const checkIfAllAnswered = () => {
        const isAllAnswered = questions.every(question => question.rtOptionId && question.answer) //chosenOptionId
        return isAllAnswered
    }
    const action = () => {
        if (checkIfAllAnswered()) {
            navigateToAnswers('bank', { ...exam, questions, attempt: { answers: questions.map(q => q.answer), createdAt: new Date() } })
        } else {
            submit()
        }
    }

    const isAllHasChosenOption = () => {
        return questions.every(question => question.chosenOptionId)
    }

    return (
        <>
            {checkIfAllAnswered() && (
                <Button sx={sendSuccess} onClick={() => setOpen(true)} disabled={!checkIfAllAnswered()} >
                    عرض النتائج
                </Button>
            )}
            {/* (
                <Button sx={sendSuccess} onClick={() => setOpen(true)}>
                    ارسال و عرض النتائج
                </Button>
            )} */}
            <ModalStyled action={action} open={open} setOpen={setOpen} title={'هل انت متاكد؟'} desc={isAllHasChosenOption() ? "هل انت متاكد من ارسال البيانات ؟" : "هناك اسئله لم يتم حلها, هل انت متاكد من الاستمرار ؟"} />
        </>
    )
}

export default BankNavigateBtn
