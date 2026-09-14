import { Step, StepLabel, Stepper } from "@mui/material";

export default function StepRail({ step, user }) {
    const STEP_LABELS = user?._id ? ["تصفح", "الدفع"] : ["تصفح", "التسجيل", "الدفع"];

    return (
        <Stepper activeStep={step} alternativeLabel sx={{ width: '100%' }}>
            {STEP_LABELS.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}

