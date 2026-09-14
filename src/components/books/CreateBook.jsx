import { Box } from "@mui/material"
import BookForm from "./BookForm"

import { bookConstantsArray } from "../../settings/constants/bookConstants"
import TitleWithDividers from "../ui/TitleWithDividers"
import BtnsGroup from "../../style/mui/styled/BtnsGroup"
import { useState } from "react"
import { useCreateBookMutation } from "../../toolkit/apis/booksApi"
import usePostData from "../../hooks/usePostData"

function CreateBook({ setReset, grade, gradeName }) {

    const [active, setActive] = useState('')
    const type = bookConstantsArray[active]?.value ?? null

    const [sendData, status] = useCreateBookMutation()
    const [createBook] = usePostData(sendData)

    const onSubmit = async (values) => {
        await createBook(values, true)
        if (setReset) setReset(p => !p)
    }

    return (
        <Box>
            <TitleWithDividers title={'اختر نوع الكتاب'} desc={gradeName && ('الصف الدراسي : ' + gradeName)} />
            <BtnsGroup sx={{ width: 'fit-content' }} btns={bookConstantsArray} state={{ active, setActive }} />
            {type && (
                <BookForm book={{ type, isActive: true, grade }} onSubmit={onSubmit} status={status} />
            )}

        </Box>
    )
}

export default CreateBook