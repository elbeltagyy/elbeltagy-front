import { Box } from "@mui/material"
import TitleWithDividers from "../ui/TitleWithDividers"
import ApplicationForm from "./ApplicationForm"
import { useState } from "react"
import { useCreateApplicationMutation } from "../../toolkit/apis/applicationsApi"
import usePostData from "../../hooks/usePostData"

function CreateApplication({ setReset }) {

    const [courses, setCourses] = useState([])
    const [sendData, status] = useCreateApplicationMutation()
    const [createApplication] = usePostData(sendData)


    const onSubmit = async (values) => {
        await createApplication({ ...values, courses })
        if (setReset) setReset(p => !p)
    }

    return (
        <Box>
            <TitleWithDividers title={'انشاء استماره'} />
            <ApplicationForm onSubmit={onSubmit} status={status} courses={courses} setCourses={setCourses} />
        </Box>
    )
}

export default CreateApplication