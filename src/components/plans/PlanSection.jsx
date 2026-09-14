import { Block, Check, Close, Delete, ExpandLess, ExpandMore, Visibility, VisibilityOff } from "@mui/icons-material";
import { alpha, Box, Chip, Collapse, Divider, IconButton, LinearProgress, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";

import Tasks from "./Tasks";
import { useState } from "react";
import { useDeletePlanMutation, useUpdatePlanMutation } from "../../toolkit/apis/plansApi";
import usePostData from "../../hooks/usePostData";
import Loader from "../../style/mui/loaders/Loader";
import BtnConfirm from "../ui/BtnConfirm";

function PlanSection({ plan, setPlans, SECTION_COLORS }) {
    const isHidden = plan.isHidden;
    const isDisabled = plan.isDisabled;

    const totalTasks = plan.tasks.length;
    const doneTasks = plan.tasks.filter(t => t.done).length;
    const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    const [isEdited, setIsEdited] = useState(false)
    const [editedText, setEditedText] = useState()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const [sendData, status] = useUpdatePlanMutation()
    const [updatePlanFc] = usePostData(sendData)

    const updatePlan = async (body) => {
        await updatePlanFc({ _id: plan._id, ...body })
        setPlans(pre => {
            return pre.map(prev => {
                if (prev._id === plan._id) {
                    return { ...plan, ...body }
                } else {
                    return prev
                }
            })
        })
        setIsEdited(false)
    }

    const [sendDelete, deleteStatus] = useDeletePlanMutation()
    const [deletePlanFc] = usePostData(sendDelete)
    const deletePlan = async () => {
        await deletePlanFc({ _id: plan._id })
        setPlans(pre => pre.filter(prev => prev._id !== plan._id)
        )
    }

    return (
        <Paper key={plan._id} variant="outlined" sx={{
            borderRadius: 2.5,
            borderLeft: `4px solid ${plan.color}`,
            opacity: isDisabled ? 0.45 : isHidden ? 0.6 : 1,
            transition: "opacity 0.2s",
        }}>
            {/* Section header */}
            <Box sx={{ px: 2, pt: 1.5, pb: isCollapsed ? 1.5 : 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: 'wrap' }}>
                    {/* Color picker dots */}
                    <Box sx={{ display: "flex", gap: 0.5, mr: 0.5 }}>
                        {SECTION_COLORS.map(c => (
                            <Box key={c} onClick={() => updatePlan({ color: c })}
                                sx={{
                                    width: 12, height: 12, borderRadius: "50%", bgcolor: c, cursor: "pointer",
                                    border: plan.color === c ? "2px solid" : "1px solid transparent",
                                    borderColor: plan.color === c ? "text.primary" : "transparent",
                                    transition: "transform 0.15s", "&:hover": { transform: "scale(1.3)" }
                                }} />
                        ))}
                    </Box>

                    {/* Title */}
                    {isEdited ? (
                        <Box sx={{ display: "flex", flex: 1, gap: 1, alignItems: "center" }}>
                            <TextField size="small" value={editedText} autoFocus
                                onChange={e => setEditedText(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter") updatePlan({ title: editedText }); if (e.key === "Escape") setIsEdited(false); }}
                                sx={{ flex: 1, "& .MuiInputBase-input": { py: 0.5, fontSize: 14 } }} />
                            <IconButton size="small" onClick={() => updatePlan({ title: editedText })}><Check fontSize="small" /></IconButton>
                            <IconButton size="small" onClick={() => setIsEdited(false)}><Close fontSize="small" /></IconButton>
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", flex: 1, alignItems: "center", gap: 1 }}>
                            <Typography variant="body1" fontWeight={600} sx={{ flex: 1, cursor: "pointer", "&:hover": { color: plan.color } }}
                                onClick={() => { setIsEdited(true); setEditedText(plan.title); }}>
                                {plan.title}
                            </Typography>
                            {/* {isCurrent && (
                                <Chip icon={<TodayRounded sx={{ fontSize: 14 }} />} label="Current" size="small"
                                    sx={{ height: 20, fontSize: 11, bgcolor: alpha(plan.color, 0.12), color: plan.color, fontWeight: 700, "& .MuiChip-icon": { color: plan.color } }} />
                            )} */}
                            {isHidden && <Chip label="Hidden" size="small" sx={{ height: 20, fontSize: 11 }} />}
                            {isDisabled && <Chip label="Disabled" size="small" color="default" sx={{ height: 20, fontSize: 11 }} />}
                        </Box>
                    )}

                    {/* Section actions */}
                    <Stack direction="row" spacing={0.25}>
                        {/* <Tooltip title="Move up"><IconButton size="small" onClick={() => moveSection(section.id, -1)} disabled={idx === 0}><KeyboardArrowUp fontSize="small" /></IconButton></Tooltip> */}
                        {/* <Tooltip title="Move down"><IconButton size="small" onClick={() => moveSection(section.id, 1)} disabled={idx === visibleSections.length - 1}><KeyboardArrowDown fontSize="small" /></IconButton></Tooltip> */}
                        <Tooltip title={isHidden ? "Show section" : "Hide section"}>
                            <IconButton size="small" onClick={() => updatePlan({ isHidden: !plan.isHidden })}>
                                {isHidden ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={isDisabled ? "Enable section" : "Disable section"}>
                            <IconButton size="small" onClick={() => updatePlan({ isDisabled: !plan.isDisabled })}>
                                <Block fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={isCollapsed ? "Expand" : "Collapse"}>
                            <IconButton size="small" onClick={() => setIsCollapsed(!isCollapsed)}>
                                {isCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete section">
                            <div>
                                <BtnConfirm btn={<IconButton size="small" color="error" onClick={deletePlan}>{deleteStatus.isLoading ? <Loader /> : <Delete fontSize="small" />}</IconButton>} />

                            </div>
                        </Tooltip>
                    </Stack>
                </Box>

                {/* Progress bar */}
                {!isCollapsed && totalTasks > 0 && (
                    <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                        <LinearProgress variant="determinate" value={progress} sx={{
                            flex: 1, height: 6, borderRadius: 3,
                            bgcolor: alpha(plan.color, 0.12),
                            "& .MuiLinearProgress-bar": { bgcolor: plan.color, borderRadius: 3 }
                        }} />
                        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 48, textAlign: "right" }}>
                            {doneTasks}/{totalTasks} done
                        </Typography>
                    </Box>
                )}
            </Box>

            <Collapse in={!isCollapsed} timeout="auto" sx={{ pointerEvents: isDisabled && 'none' }}>
                <Divider />
                <Tasks plan={plan} setPlans={setPlans} />
            </Collapse>
        </Paper>
    )
}

export default PlanSection