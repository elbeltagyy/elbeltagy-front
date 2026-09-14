import { Box, Button, Typography } from "@mui/material"
import TabsAutoStyled from "../../style/mui/styled/TabsAutoStyled"
import LoginForm from "../auth/LoginForm"
import SignupForm from "../auth/SignupForm"
import { MdArrowBack } from "react-icons/md"

function StepRegister({ setStep }) {

    const nextStep = () => setStep(2)

    const tabs = [
        { label: 'انشاء حساب', component: <SignupForm afterFc={nextStep} /> },
        { label: 'تسجيل الدخول', component: <LoginForm afterFc={nextStep} /> },
    ]

    return (
        <Box >
            <Box sx={{ maxWidth: 560, mb: '12px' }}>
                <Button size='small' onClick={() => setStep(0)} endIcon={<MdArrowBack />} sx={{ color: 'grey.500' }}>الرجوع للكورسات</Button>

                <Typography
                    sx={{
                        fontSize: { xs: "1.2rem", sm: "2.3rem" },
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                    }}
                >
                    اذا قمت بعمل اكونت او حساب من قبل, اختر تسجيل الدخول
                </Typography>
                <Typography sx={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                    اذا كان هذه اول مره لك على المنصه, اختر انشاء حساب
                </Typography>
            </Box>
            <TabsAutoStyled originalTabs={tabs} />
        </Box>
    )
}

export default StepRegister