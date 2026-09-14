import { Check, CheckCircle, Close, Delete, RadioButtonUnchecked, Visibility, VisibilityOff } from "@mui/icons-material";
import { alpha, Box, IconButton, MenuItem, Select, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../toolkit/apis/plansTasksApi";
import usePostData from "../../hooks/usePostData";
import BtnConfirm from "../ui/BtnConfirm";

const PRIORITY_CONFIG = {
    high: { label: "هام", color: "error.main" },
    mid: { label: "متوسط", color: "warning.main" },
    low: { label: "اقل", color: "primary.main" },
};


function TaskCard({ task, plan, setTask }) {
    const [isTaskEditing, setEditingTask] = useState(false)
    const [editingTaskText, setEditingTaskText] = useState('')

    const [note, setNote] = useState('')

    const [sendData, status] = useUpdateTaskMutation()
    const [editTask] = usePostData(sendData)

    const updateTask = async (body) => {
        await editTask({ _id: task._id, ...body })
        setTask({ _id: task._id, plan: task.plan, ...body })
        setEditingTask(false)
        setNote('')
    }


    const [sendDelete, deleteStatus] = useDeleteTaskMutation()
    const [deleteTaskFc] = usePostData(sendDelete)

    const deleteTask = async () => {
        await deleteTaskFc({ _id: task._id })
        setTask({ _id: task._id, plan: task.plan, isDelete: true })
        setEditingTask(false)
    }

    return (
        <Box key={task.id} sx={{
            display: "flex", alignItems: "flex-start", gap: 1, px: 1, py: 0.75,
            borderRadius: 1.5,
            bgcolor: task.done ? alpha(plan.color, 0.05) : "transparent",
            opacity: task.hidden ? 0.5 : 1,
            "&:hover": { bgcolor: alpha(plan.color, 0.06) },
            transition: "background 0.15s",
        }}>
            {/* Done toggle */}
            <IconButton size="small" sx={{ mt: 0.1, color: task.done ? plan.color : "text.disabled", p: 0.25 }}
                onClick={() => updateTask({ done: !task.done })}>
                {task.done ? <CheckCircle fontSize="small" /> : <RadioButtonUnchecked fontSize="small" />}
            </IconButton>

            {/* Task body */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                {isTaskEditing ? (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <TextField size="small" value={editingTaskText} autoFocus
                            onChange={e => setEditingTaskText(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") updateTask({ title: editingTaskText }); if (e.key === "Escape") setEditingTask(null); }}
                            sx={{ flex: 1, "& .MuiInputBase-input": { py: 0.4, fontSize: 13 } }} />
                        <IconButton size="small" onClick={() => updateTask({ title: editingTaskText })}><Check fontSize="small" /></IconButton>
                        <IconButton size="small" onClick={() => setEditingTask(null)}><Close fontSize="small" /></IconButton>
                    </Box>
                ) : (
                    <Typography variant="body2" sx={{
                        textDecoration: task.done ? "line-through" : "none",
                        color: task.done ? "text.secondary" : "text.primary",
                        cursor: "text", wordBreak: "break-word",
                        "&:hover": { color: plan.color }
                    }} onClick={() => { setEditingTask(true); setEditingTaskText(task.title) }}>
                        {task.title}
                    </Typography>
                )}
                {/* Note */}
                {isTaskEditing ? <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <TextField label="ملحوظه" size="small" value={note} autoFocus
                        onChange={e => setNote(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") updateTask({ note }); if (e.key === "Escape") setEditingTask(null); }}
                        sx={{ flex: 1, "& .MuiInputBase-input": { py: 0.2, fontSize: 13 } }} />
                    <IconButton size="small" onClick={() => updateTask({ note })}><Check fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => setEditingTask(null)}><Close fontSize="small" /></IconButton>
                </Box> : (
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25, fontStyle: "italic" }}>
                        {task.note}
                    </Typography>
                )}
            </Box>

            {/* Priority */}
            <Select size="small" value={task.priority || ''}
                onChange={e => updateTask({ priority: e.target.value })}
                sx={{ fontSize: 11, bgcolor: PRIORITY_CONFIG[task.priority]?.color || 'transparent', color: 'grey.0', height: 24, "& .MuiSelect-select": { py: 0.25, px: 1 }, minWidth: 60 }}>
                {Object.entries(PRIORITY_CONFIG).map(([k, v]) => (
                    <MenuItem key={k} value={k} sx={{ fontSize: 12 }}>{v.label}</MenuItem>
                ))}
            </Select>

            {/* Task actions */}
            <Stack direction="row" spacing={0}>
                {/* <Tooltip title={task.hidden ? "Show task" : "Hide task"}>
                    <IconButton size="small" sx={{ p: 0.4 }} onClick={() => toggleTaskHidden(plan.id, task.id)}>
                        {task.hidden ? <Visibility sx={{ fontSize: 15 }} /> : <VisibilityOff sx={{ fontSize: 15 }} />}
                    </IconButton>
                </Tooltip> */}

                <Tooltip title="Delete task">
                    <div>
                        <BtnConfirm btn={<IconButton size="small" color="error" sx={{ p: 0.4 }} onClick={() => deleteTask(task.id, task.id)}>
                            <Delete sx={{ fontSize: 15 }} />
                        </IconButton>} />
                    </div>
                </Tooltip>
            </Stack>
        </Box>
    )
}

export default TaskCard