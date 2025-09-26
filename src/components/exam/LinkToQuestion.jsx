import { memo, useMemo, useState } from "react"
import { FilledHoverBtn } from "../../style/buttonsStyles"
import ModalStyled from "../../style/mui/styled/ModalStyled"
import AdminGetQuestions from "../questions/AdminGetQuestions"
import TabInfo from "../ui/TabInfo"
import { Box } from "@mui/material"
import Section from "../../style/mui/styled/Section"

const LinkToQuestion = ({ props }) => {

    const [open, setOpen] = useState(false)
    const [selectedQs, setSelectedQs] = useState([])

    const selections = useMemo(() => {
        return props?.getFieldMeta('linkedQuestions')?.value || []
    }, [props?.getFieldMeta('linkedQuestions')?.value])

    const linkQs = (qs) => {
        const handelQs = qs.map(q => ({ ...q, notSchema: true }))

        props.setFieldValue('questions', [...props.getFieldMeta('questions').value, ...handelQs])
        props.setFieldValue('linkedQuestions', [...selections, ...handelQs])

        setOpen(false)
    }

    return <div>
        <FilledHoverBtn onClick={() => setOpen(true)}>ربط اسئله جديده</FilledHoverBtn>

        {/* <FilledHoverBtn colorm="orange" onClick={() => setOpenUpdate(true)}> تعديل الاسئله</FilledHoverBtn> */}

        <div>
            <TabInfo title={"عدد الاسئله التى تم ربطها"} count={selections?.length ?? 0} i={0} />
        </div>

        <ModalStyled open={open} setOpen={setOpen} fullScreen={true} >
            <Section>
                <Box>
                    <AdminGetQuestions setSelectedQs={setSelectedQs} allSelected={true} />
                </Box>
                <FilledHoverBtn onClick={() => linkQs(selectedQs)}>ربط الاسئله</FilledHoverBtn>
            </Section>
        </ModalStyled>
    </div>
}

export default memo(LinkToQuestion)
