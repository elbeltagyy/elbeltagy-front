import { Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useCreateCommunityQuestionMutation } from "../../toolkit/apis/communtyQuestionsApi"
import usePostData from "../../hooks/usePostData"
import TypingBar from '../ui/TypingBar'
import { useSelector } from "react-redux"

function AskQuestion({ addQuestion, preCourse, preLecture }) {

    // const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [sendData, status] = useCreateCommunityQuestionMutation()
    const [sendQuestion] = usePostData(sendData)
    const user = useSelector(s => s.global.user)

    const onSubmit = async (values) => {
        const body = { content, attachments: values.attachments, user: user._id }
        if (preCourse) body.courses = [preCourse]
        if (preLecture) body.lectures = [preLecture]
        const res = await sendQuestion(body, true)
        setContent('')
        addQuestion({ ...res, user })
    }

    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1.5}>
                {/* <TextField size="small" placeholder="عنوان السؤال !" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    inputProps={{ "aria-label": "عنوان السؤال" }}
                    fullWidth
                /> */}
                <Typography variant="h6">اسال سؤالك</Typography>
                <TextField variant="filled" size="small"
                    placeholder={'1- عنوان السؤال أو الموضوع\n2- يستحسن اسم الدرس وشرح السؤال بالتفصيل'}
                    value={content}
                    onChange={(e) => setContent(e.target.value)} multiline minRows={6} fullWidth />
                <TypingBar status={status}
                    hide={{ text: true, file: true }}
                    handleSubmit={onSubmit}
                    activateSendBtn={true}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    {/* {activeCourse === ALL ? (
                        <TextField select size="small" value={course} onChange={(e) => setCourse(e.target.value)} sx={{ minWidth: 180 }}>
                            {COURSES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                        </TextField>
                    ) : (
                        <Typography variant="body2" color="text.secondary">النشر في {activeCourse}</Typography>
                    )} */}
                    {/* <Button variant="contained" disableElevation disabled={!title.trim()} onClick={() => { }}>انشر السؤال</Button> */}
                </Stack>
            </Stack>
        </Paper>
    )
}

export default AskQuestion