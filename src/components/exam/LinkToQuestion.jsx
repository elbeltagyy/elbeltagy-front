import { memo, useState } from "react"
import { FilledHoverBtn } from "../../style/buttonsStyles"
import ModalStyled from "../../style/mui/styled/ModalStyled"
import AdminGetQuestions from "../questions/AdminGetQuestions"
import TabInfo from "../ui/TabInfo"
import { Box } from "@mui/material"
import { useField } from "formik"
import Section from "../../style/mui/styled/Section"
import TitleWithDividers from "../ui/TitleWithDividers"

const LinkToQuestion = ({ value = [], setValue }) => {

    const [open, setOpen] = useState(false)
    const [selectedQs, setSelectedQs] = useState([])
    const [{ value: questions }, meta, { setValue: setQuestionsValue }] = useField('questions')

    const linkQs = (qs) => {
        const handelQs = qs.map(q => ({ ...q, notSchema: true }))

        setQuestionsValue([...questions, ...handelQs])
        setValue([...value, ...handelQs])
        setOpen(false)
    }

    return <div>
        <FilledHoverBtn onClick={() => setOpen(true)}>إضافة من بنك الأسئلة </FilledHoverBtn>

        {/* <FilledHoverBtn colorm="orange" onClick={() => setOpenUpdate(true)}> تعديل الأسئلة</FilledHoverBtn> */}

        <div>
            <TabInfo title={"عدد الأسئلة التى تم ربطها"} count={value?.length ?? 0} i={0} />
        </div>

        <ModalStyled open={open} setOpen={setOpen} fullScreen={true} >
            <Section>
                <Box>
                    <TitleWithDividers title={'قم باختيار الاسئله لاضافتها'} />
                    <AdminGetQuestions isShowHeader={true} setSelectedQs={setSelectedQs} allSelected={true} />
                </Box>
                <FilledHoverBtn onClick={() => linkQs(selectedQs)}>ربط الأسئلة</FilledHoverBtn>
            </Section>
        </ModalStyled>
    </div>
}

export default memo(LinkToQuestion)
