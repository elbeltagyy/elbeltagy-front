import { Alert, Box, Button, Typography } from "@mui/material";
import TabInfo from "../ui/TabInfo";
import { getFullDate } from "../../settings/constants/dateConstants";
import Grid from "../../style/vanilla/Grid";
import PaymentMethods from "../payment/PaymentMethods";
import { useState } from "react";
import { FlexColumn } from "../../style/mui/styled/Flexbox";
import { FilledHoverBtn } from "../../style/buttonsStyles";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function OrderSummary({ course, C }) {

    return (
        <Box sx={{ borderRadius: "16px", overflow: "hidden", backgroundColor: C.card, border: `1px solid ${C.line}`, maxWidth: '310px', maxHeight: '65vh' }}>
            <Box sx={{ position: "relative" }}>
                <Box
                    component="img"
                    src={course?.thumbnail?.url}
                    alt={course.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
            </Box>
            <Box sx={{ p: 2.5 }}>
                <Typography
                    sx={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: C.mutedSoft,
                        mb: 1.5,
                    }}
                >
                    الكورس المختار
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: C.paper, mb: 0.5 }}>{course.name}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: C.muted, mb: 2 }}>
                    <TabInfo count={getFullDate(course.createdAt)} i={2} />
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 2, borderTop: `1px solid ${C.line}` }}>
                    <Typography sx={{ fontSize: "0.85rem", color: C.muted }}>سعر الكورس الحالي</Typography>
                    <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "1.1rem", color: C.forge }}>
                        ${course.price}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

function StepPayment({ course, C, setStep }) {

    const [paid, setPaid] = useState(false)
    const handelResponse = () => {
        setPaid(true)
    }
    const navigate = useNavigate()
    return (
        <Box>
            <Button size='small' onClick={() => setStep(0)} endIcon={<MdArrowBack />} sx={{ color: 'grey.500' }}>الرجوع للكورسات</Button>

            <Grid>
                <Box sx={{ bgcolor: 'background.alt', width: '100%', borderRadius: '16px' }}>
                    <PaymentMethods
                        inModal={false} handelResponse={handelResponse}
                        course={course?._id} price={course.price} note={'بمجرد الدفع انتقل الي الصفحه الرئيسيه, هتلاقي الكورس متفعل بس بعد الدفع'}
                        title={'شراء الكورس ' + course.name}
                        subTitle={'شراء الكورس ' + course.name}
                    />
                    
                    {/* Handel response + Back Button */}
                    {paid && (<FlexColumn gap={'16px'}>
                        <Alert severity="success" variant="filled">تم ارسال الدفع, يمكنك متابعه الكورس من هنا </Alert>
                        <FilledHoverBtn onClick={() => navigate("/courses/" + course?.index)}>الذهاب للكورس</FilledHoverBtn>
                    </FlexColumn>)}
                </Box>

                <OrderSummary C={C} course={course} />
            </Grid>
        </Box>
    )
}

export default StepPayment