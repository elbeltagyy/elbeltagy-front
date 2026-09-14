import { Add } from "@mui/icons-material"
import { Box, Button, Stack, Typography } from "@mui/material"
import BtnModal from "../ui/BtnModal"
import TemplateForm from "./TemplateForm";
import { useCreateTemplateMutation } from "../../toolkit/apis/templateApis";
import usePostData from "../../hooks/usePostData";


function CreateTemplate({ templates = [], setTemplates }) {

    const [sendData, status] = useCreateTemplateMutation()
    const [createTemplate] = usePostData(sendData)

    const addTemplate = async (values, props) => {
        const newTemp = await createTemplate(values)
        if (setTemplates) {
            setTemplates(p => [newTemp, ...p])
        }
        props.resetForm()
    }

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Box>
                <Typography variant="h5" fontWeight={800}> اسئله الطلاب المتكرره</Typography>
                <Typography variant="body2" color="text.secondary">
                    {/* {stats.visible} active · {stats.hidden} hidden  */}
                    · {templates.length} total
                </Typography>
            </Box>
            <BtnModal
                component={<TemplateForm onSubmit={addTemplate} status={status} />}
                btn={<Button variant="contained" startIcon={<Add />} size="small">
                    انشاء سؤال جديد
                </Button>} />
        </Stack>
    )
}

export default CreateTemplate