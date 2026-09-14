import { Typography } from "@mui/material"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import Section from "../../style/mui/styled/Section"

function OfficialWhatsapp() {
    return (
        <Section sx={{ p: '16px', bgcolor: 'background.alt' }}>
            <TitleWithDividers title={'واتساب الرسمي'} />
            <Typography variant="h4" fontWeight={800}>كيفيه استخدام واتساب الرسمي</Typography>
            <ul>
                <li><Typography>اطلب من المبرمج تفعيل واتساب الرسمي وربطه برقمك البيزنس</Typography></li>
                <li><Typography>واتساب بيزنس له تسعيره و غير مجاني  - خدمه مدفوعه من ميتا</Typography></li>
                <li><Typography>يتم محاسبتك على الرسائل المرسله و رسائل الدعايا اغلي من الرسائل العاديه</Typography></li>
                <li><Typography>واتساب الرسمي اكثر امانا </Typography></li>
                {/* <li><Typography></Typography></li> */}
            </ul>
        </Section>
    )
}

export default OfficialWhatsapp