import { alpha, Box, Button, Stack, TextField, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { Add } from "@mui/icons-material";
import { useCreateTaskMutation } from "../../toolkit/apis/plansTasksApi";
import usePostData from "../../hooks/usePostData";
import { useState } from "react";
import Loader from "../../style/mui/loaders/Loader";

function Tasks({ plan, setPlans }) {
    const isDisabled = plan.isDisabled
    const [editedText, setEditedText] = useState('')

    const [sendData, status] = useCreateTaskMutation()
    const [createTask] = usePostData(sendData)
    const addTask = async () => {
        const newTask = await createTask({ title: editedText, plan: plan._id })
        setPlans(pre => {
            return pre.map(prev => {
                if (prev._id === newTask.plan) {
                    return { ...prev, tasks: [...prev.tasks, newTask] }
                } else {
                    return prev
                }
            })
        })
        setEditedText('')
    }

    const setTask = (task) => {
        setPlans(prev => prev.map(plan => {
            if (plan._id !== task.plan) return plan
            if (task.isDelete) {
                return {
                    ...plan,
                    tasks: plan.tasks.filter(t => t._id !== task._id)
                }
            }
            return {
                ...plan,
                tasks: plan.tasks.map(t =>
                    t._id === task._id ? { ...t, ...task } : t
                )
            }
        }))
    }

    return (
        <Box sx={{ px: 2, pt: 1, pb: 1.5 }}>
            {/* Tasks */}
            <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                {plan.tasks.map(task => { //.filter(t => showHidden || !t.hidden)
                    return <TaskCard key={task._id} plan={plan} task={task} setTask={setTask} />;
                })}

                {plan.tasks.length === 0 && (
                    <Typography variant="caption" color="text.disabled" sx={{ px: 1, py: 0.5, display: "block", fontStyle: "italic" }}>
                        No tasks yet — add one below
                    </Typography>
                )}
            </Stack>

            {/* Add task input */}
            {!isDisabled && (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField size="small" placeholder="Add task..." fullWidth
                        value={editedText}
                        onChange={e => setEditedText(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") addTask(plan.id); }}
                        sx={{ "& .MuiInputBase-input": { fontSize: 13, py: 0.75 } }} />

                    <Button disabled={status.isLoading} variant="outlined" size="small" onClick={() => addTask(plan.id)}
                        sx={{
                            minWidth: 0, px: 1.5, borderColor: plan.color, color: plan.color,
                            "&:hover": { borderColor: plan.color, bgcolor: alpha(plan.color, 0.08) }
                        }}>
                        {status.isLoading ? <Loader /> : <Add fontSize="small" />}
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default Tasks