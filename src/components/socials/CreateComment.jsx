import { AttachFile, Close, Image, Send } from "@mui/icons-material"
import { IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useCreateCommentMutation } from "../../toolkit/apis/socials/facebookApi"
import usePostData from "../../hooks/usePostData"
import Loader from "../../style/mui/loaders/Loader"
import { useRef } from "react"

function CreateComment({ id, pageId, sx, placeholder = "Write a comment…", setReset }) {

    const fileInputRef = useRef();

    const [sendData, status] = useCreateCommentMutation()
    const [sendComment] = usePostData(sendData)

    const [values, setValues] = useState({
        message: '',
        file: ''
    })
    const handelValues = (k, v) => setValues({ ...values, [k]: v })

    const handelComment = async () => {
        await sendComment({ id, pageId, ...values })
        if (setReset) {
            setReset(r => !r)
        }
        setValues({
            message: '',
            file: ''
        })
    }

    return (
        <Stack direction={'column'}>
            {values.file && (
                <Paper variant="outlined" sx={{ p: 1, display: "flex", alignItems: "center", gap: 1, borderRadius: 2 }}>
                    <AttachFile color="primary" fontSize="small" />
                    <Typography variant="body2" flex={1} color="primary.main">{values.file.name}</Typography>
                    <IconButton size="small" onClick={() => handelValues('file', '')}><Close fontSize="small" /></IconButton>
                </Paper>
            )}
            <input ref={fileInputRef} type="file" hidden onChange={(e) => {
                const f = e.target.files[0];
                if (f) handelValues('file', f);
            }} />
            <Stack direction="row" gap={1} mt={1} sx={{ ...sx }}>
                <TextField size="small" fullWidth placeholder={placeholder} value={values.message}
                    onChange={(e) => handelValues('message', e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handelComment()}
                    sx={{ bgcolor: "background.default", borderRadius: 5, "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
                />
                {/* <IconButton size="small" color="primary" onClick={() => fileInputRef.current.click()}><Image /></IconButton> */}
                <IconButton color="primary" size="small" onClick={handelComment} disabled={status.isLoading}>{status.isLoading ? <Loader /> : <Send />}</IconButton>
            </Stack>
        </Stack>
    )
}

export default CreateComment