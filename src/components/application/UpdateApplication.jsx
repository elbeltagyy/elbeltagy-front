import { Box } from "@mui/material"
import TitleWithDividers from "../ui/TitleWithDividers"

import usePostData from "../../hooks/usePostData"
import { useUpdateApplicationMutation } from "../../toolkit/apis/applicationsApi"
import ApplicationForm from "./ApplicationForm"
import { useState } from "react"

function UpdateApplication({ application = {}, setReset }) {
    const [courses, setCourses] = useState(application.courses || [])

    const [sendData, status] = useUpdateApplicationMutation()
    const [updateApplicationFc] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const pre = await updateApplicationFc({ ...values, _id: application._id, courses })
        props.resetForm({ values: pre })
        if (setReset) setReset(p => !p)
    }
    return (
        <Box>
            <TitleWithDividers title={'تعديل الاستماره  ' + application.title} />
            <ApplicationForm application={application}
                courses={courses} setCourses={setCourses} onSubmit={onSubmit} status={status} />
        </Box>
    )
}

export default UpdateApplication