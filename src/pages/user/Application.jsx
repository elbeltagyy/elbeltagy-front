import { useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";

import StepRail from "../../components/application/Steps";
import ShowCourses from "../../components/application/ShowCourses";
import { useSelector } from "react-redux";
import StepRegister from "../../components/application/StepRegister";
import StepPayment from "../../components/application/StepPayment";
import { useLazyGetOneApplicationQuery } from "../../toolkit/apis/applicationsApi";
import usePaginate from "../../hooks/usePaginate";
import { useSearchParams } from "react-router-dom";
import InfoText from "../../components/ui/InfoText";

const C = {
  ink: "#12141C",
  inkSoft: "#181C28",
  card: "#1E2333",
  paper: "#EAEBEF",
  muted: "#8B92A6",
  mutedSoft: "#5C6478",
  forge: "#FF5A1F",
  forgeSoft: "rgba(255,90,31,0.14)",
  success: "#34D399",
  successSoft: "rgba(52,211,153,0.14)",
  error: "#F4574B",
  line: "rgba(255,255,255,0.08)",
};

export default function Application() {
  const [step, setStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const user = useSelector(s => s.global.user)
  const [params] = useSearchParams()


  function selectCourse(course) {
    setSelectedCourse(course);
    setStep(user?._id ? 2 : 1);
  }
  const [getData] = useLazyGetOneApplicationQuery()
  const { data: application = {} } = usePaginate({ getData, params: { _id: params.get('id'), } })

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, sm: 4 },
      }}
    >

      <InfoText label={'اسم الاستماره'} description={<Typography
        sx={{
          fontSize: { xs: "1.9rem", sm: "2.3rem" },
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        {application?.title}
      </Typography>} />
      {application?.description && (
        <Typography sx={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
          {application?.description}
        </Typography>
      )}
      <StepRail step={step} user={user} />

      <Box sx={{ width: "100%", maxWidth: 1024 }}>
        {step === 0 && <ShowCourses C={C} onSelect={selectCourse} courses={application?.courses || []} />}
        {step === 1 && true && !user?._id && ( //selectedCourse
          <StepRegister setStep={setStep} />
        )}
        {step === 2 && selectedCourse && (
          <StepPayment C={C} setStep={setStep} course={selectedCourse} />
        )}
        {/* {step === 3 && selectedCourse && (
          <SuccessStep course={selectedCourse} name={signup.name} onReset={reset} onBack={() => setStep(3)} />
        )} */}
      </Box>
    </Box>
  );
}