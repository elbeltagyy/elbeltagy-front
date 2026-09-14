import { Box } from "@mui/material"
import TitleWithDividers from "../ui/TitleWithDividers"
import BookForm from "./BookForm"
import { useUpdateBookMutation } from "../../toolkit/apis/booksApi"
import usePostData from "../../hooks/usePostData"

function UpdateBook({ book = {} }) {

    const [sendData, status] = useUpdateBookMutation()
    const [updateBook] = usePostData(sendData)

    const onSUbmit = async (values, props) => {
        const pre = await updateBook({ ...values, _id: book._id }, true)
        props.resetForm({ values: pre })
    }
    return (
        <Box>
            <TitleWithDividers title={'تعديل الكتاب  ' + book.title} />
            <BookForm book={book} onSubmit={onSUbmit} status={status} />
        </Box>
    )
}

export default UpdateBook