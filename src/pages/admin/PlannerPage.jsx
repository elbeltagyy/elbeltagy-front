import { useState, } from "react";
import {
  Box, Typography, IconButton, Tooltip,
  Button,
  Paper, Stack,
  Alert
} from "@mui/material";
import {
  Add, VisibilityOff, Visibility,
} from "@mui/icons-material";
import { getFullDate } from "../../settings/constants/dateConstants";
import PlanSection from "../../components/plans/PlanSection";
import usePaginate from "../../hooks/usePaginate";
import { useCreatePlanMutation, useLazyGetPlansQuery } from "../../toolkit/apis/plansApi";
import usePostData from "../../hooks/usePostData";
import Loader from "../../style/mui/loaders/Loader";

const MONTH_NAMES = [
  { value: 7, label: "اغسطس" },
  { value: 8, label: "سبتمبر" },
  { value: 9, label: "اكتوبر" },
  { value: 10, label: "نوفمبر" },
  { value: 11, label: "ديسمبر" },
  { value: 0, label: "يناير" },
  { value: 1, label: "فبراير" },
  { value: 2, label: "مارس" },
  { value: 3, label: "ابريل" },
  { value: 4, label: "مايو" },
  { value: 5, label: "يونيو" },
  { value: 6, label: "يوليو" },
];


const DEFAULT_SECTIONS = [
  {
    id: 1, title: "Q4 2024 — Oct to Dec", months: [9, 10, 11], color: "#5C6BC0", tasks: [
      { id: 101, text: "Plan annual roadmap", done: false, hidden: false, priority: "high", note: "" },
      { id: 102, text: "Q4 performance review", done: false, hidden: false, priority: "mid", note: "" },
    ]
  },
  {
    id: 2, title: "Q1 2025 — Jan to Mar", months: [0, 1, 2], color: "#00897B", tasks: [
      { id: 201, text: "Launch new feature", done: true, hidden: false, priority: "high", note: "Already shipped 🎉" },
      { id: 202, text: "Hire backend dev", done: false, hidden: false, priority: "mid", note: "" },
    ]
  },
  {
    id: 3, title: "Q2 2025 — Apr to Jun", months: [3, 4, 5], color: "#F57C00", tasks: [
      { id: 301, text: "Mid-year retrospective", done: false, hidden: false, priority: "low", note: "" },
    ]
  },
  {
    id: 4, title: "Q3 2025 — Jul to Sep", months: [6, 7, 8], color: "#8E24AA", tasks: [
      { id: 401, text: "Scale infrastructure", done: false, hidden: false, priority: "high", note: "" },
      { id: 402, text: "Content calendar", done: false, hidden: false, priority: "low", note: "" },
    ]
  },
];

const SECTION_COLORS = ["#5C6BC0", "#00897B", "#F57C00", "#8E24AA", "#E53935", "#0288D1", "#558B2F", "#6D4C41"];

function getCurrentMonth() {
  const now = new Date();
  const m = now.getMonth();
  return m
}

export default function PlannerPage() {
  // const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [showHidden, setShowHidden] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())

  const [getData, { isLoading, isSuccess }] = useLazyGetPlansQuery()
  const { data: plans = [], setData: setPlans } = usePaginate({ getData, key: 'plans', params: { month: currentMonth } })

  const [sendData, status] = useCreatePlanMutation()
  const [createPlan] = usePostData(sendData)

  async function addPlan() {
    const color = SECTION_COLORS[plans.length % SECTION_COLORS.length]
    const newPlan = await createPlan({ title: 'خطه جديده ' + (plans.length + 1), color, month: currentMonth })
    setPlans(prev => [newPlan, ...prev]);
  }

  const visibleSections = showHidden ? plans : plans.filter(s => !s.isHidden);

  return (
    <Box sx={{ maxWidth: 820, mx: "auto", px: 2, py: 3, fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: -0.5 }}>
            الخطه السنويه
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {getFullDate(new Date())}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Tooltip title={showHidden ? "Hide hidden sections" : "Show all sections"}>
            <IconButton size="small" onClick={() => setShowHidden(v => !v)} sx={{ border: "1px solid", borderColor: "divider" }}>
              {showHidden ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Button variant="contained" startIcon={<Add />} size="small" onClick={addPlan} disableElevation
            disabled={status.isLoading}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, color: 'grey.0' }}>
            انشاء خطه
          </Button>
        </Stack>
      </Box>

      {/* Timeline strip */}
      <Box sx={{ display: "flex", flexWrap: 'wrap', gap: "2px", mb: 3, borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
        {MONTH_NAMES.map((m, i) => {
          const isCurrent = m.value === currentMonth
          const colorIndex = Math.floor(i / 2);
          const color = SECTION_COLORS[colorIndex];

          return (
            <Box key={m.value} onClick={() => setCurrentMonth(m.value)} sx={{
              flex: 1, py: 1, textAlign: "center", fontSize: 11, fontWeight: isCurrent ? 700 : 400,
              bgcolor: isCurrent ? "grey.0" : color,
              color: isCurrent ? "primary.main" : "text.secondary",
              transition: "all 0.2s", cursor: 'pointer'
            }}>
              {m.value + 1}/{m.label}
            </Box>
          );
        })}
      </Box>

      {/* Overview row */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {[
          { label: "الخطط", value: plans.length },
          { label: "اجمالي المهمات", value: plans.flatMap(s => s.tasks).length },
          { label: "تم", value: plans.flatMap(s => s.tasks).filter(t => t.done).length },
          // { label: "المخفي", value: Object.values(hiddenSections).filter(Boolean).length },
        ].map(({ label, value }) => (
          <Paper key={label} variant="outlined" sx={{ flex: 1, p: 1.5, textAlign: "center", borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={700}>{value}</Typography>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Plans */}
      <Stack spacing={2}>
        {visibleSections.map((plan, idx) => {
          return <PlanSection
            setPlans={setPlans}
            key={idx}
            SECTION_COLORS={SECTION_COLORS}
            // currentPlanId={currentSectionId}
            plan={plan}
          />;
        })}
      </Stack>


      {isLoading ? <Loader /> : (isSuccess && plans?.length === 0) && <Alert severity="warning" variant="filled">قم بانشاء اول خطه الان</Alert>}
      {/* Footer add */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button disabled={status.isLoading} variant="outlined" startIcon={status.isLoading ? <Loader /> : <Add />} onClick={addPlan} sx={{ textTransform: "none", borderRadius: 2, borderStyle: "dashed" }}>
          {status.isLoading ? 'جاي اضافه خطه جديده' : 'اضافه خطه جديده'}
        </Button>
      </Box>
    </Box>
  );
}