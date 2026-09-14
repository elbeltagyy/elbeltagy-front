import { Box, Chip, Collapse, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { CATEGORIES, CATEGORY_META } from "./categories";
import { ContentCopy, Delete, Edit, ExpandLess, ExpandMore, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDeleteTemplateMutation, useIncrementUsesMutation, useUpdateTemplateMutation } from "../../toolkit/apis/templateApis";
import usePostData from "../../hooks/usePostData";
import BtnModal from "../ui/BtnModal";
import TemplateForm from "./TemplateForm";
import BtnConfirm from "../ui/BtnConfirm";
import Loader from "../../style/mui/loaders/Loader";

function TemplateCard({ template, setTemplates, i }) {
    const [expanded, setExpanded] = useState(false)
    const [incrementUses] = useIncrementUsesMutation()

    const handleCopy = (t) => {
        navigator.clipboard.writeText(`${t.answer}`).then(async () => {
            incrementUses({ _id: template._id })
            setTemplates(prev => prev.map(x => x._id === t._id ? { ...x, uses: x.uses + 1 } : x));
            window.alert("تم النسخ بنجاح : " + t.answer + ' !');
        });
    };

    const [sendUpdate, statusUpdate] = useUpdateTemplateMutation()
    const [updateTemplateFc] = usePostData(sendUpdate)

    const updateTemp = async (v) => {
        const newTemp = await updateTemplateFc({ _id: template._id, ...v })
        if (setTemplates) {
            setTemplates(p => {
                return p.map(prev => {
                    if (prev._id === newTemp._id) {
                        return { ...prev, ...newTemp }
                    } else {
                        return prev
                    }
                })
            })
        }
    }

    const [sendDelete, statusDelete] = useDeleteTemplateMutation()
    const [deleteTemplateFc] = usePostData(sendDelete)

    const deleteTemp = async () => {
        await deleteTemplateFc(template)
        if (setTemplates) {
            setTemplates(p => p.filter(p => p._id !== template._id))
        }
    }

    return (
        <Box
            key={template._id}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: template.hidden ? "action.hover" : "background.paper",
                opacity: template.hidden ? 0.65 : 1,
                overflow: "hidden",
                transition: "all 0.15s",
                "&:hover": { borderColor: "primary.light" }
            }}
        >
            {/* Card Header */}
            <Box
                sx={{ p: "12px 16px", display: "flex", alignItems: "flex-start", gap: 1.5, cursor: "pointer" }}>
                <Box sx={{ flex: 1, minWidth: 0 }} onClick={() => setExpanded(!expanded)}>
                    <Stack direction="row" gap={1} alignItems="center" mb={0.5} flexWrap="wrap">
                        <Chip
                            size="small"
                            label={i}
                            color={CATEGORY_META[template.category]?.color || "default"}
                            sx={{ height: 20, fontSize: 12, "& .MuiChip-icon": { fontSize: 13 } }}
                        />
                        <Chip
                            size="small"
                            label={CATEGORIES.find(c => c.value === template.category).label}
                            color={CATEGORY_META[template.category]?.color || "default"}
                            icon={CATEGORY_META[template.category]?.icon}
                            sx={{ height: 20, fontSize: 11, "& .MuiChip-icon": { fontSize: 13 } }}
                        />
                        {template.hidden && (
                            <Chip size="small" label="Hidden" icon={<VisibilityOff sx={{ fontSize: "13px !important" }} />}
                                sx={{ height: 20, fontSize: 11 }} />
                        )}
                        <Typography variant="caption" color="text.disabled">مرات الاستخدام {template.uses}×</Typography>
                        {/* <TabInfo count={template.isActive ? 'فعال للطلاب' : "غير فعال"} isBold={false} i={template.isActive ? 1 : 3} /> */}
                    </Stack>
                    <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1.5 }}>
                        {template.question}
                    </Typography>
                </Box>
                <Stack direction="row" alignItems="center" gap={0.5} flexShrink={0}>
                    <Tooltip title="نسخ الاجابه">
                        <IconButton size="small" onClick={e => { e.stopPropagation(); handleCopy(template); }}>
                            <ContentCopy sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title={template.isActive ? "الغاء تفعيل" : "تفعيل"}>
                        <IconButton size="small" onClick={e => { e.stopPropagation(); updateTemp({ isActive: !template.isActive }); }}>
                            {template.isActive ? <Visibility sx={{ fontSize: 16 }} /> : <VisibilityOff sx={{ fontSize: 16 }} />}
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Edit">
                        <div>
                            <BtnModal
                                component={<TemplateForm onSubmit={updateTemp} status={statusUpdate} template={template} />}
                                btn={<IconButton size="small">
                                    <Edit sx={{ fontSize: 16 }} />
                                </IconButton>} />
                        </div>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <div>
                            <BtnConfirm btn={<IconButton disabled={statusDelete.isLoading} size="small" color="error" onClick={deleteTemp}>
                                {statusDelete.isLoading ? <Loader /> : <Delete sx={{ fontSize: 16 }} />}
                            </IconButton>} />
                        </div>
                    </Tooltip>
                    {expanded ? <ExpandLess onClick={() => setExpanded(false)} sx={{ fontSize: 18, color: "text.secondary" }} /> : <ExpandMore onClick={() => setExpanded(true)} sx={{ fontSize: 18, color: "text.secondary" }} />}
                </Stack>
            </Box>

            {/* Expandable Answer */}
            <Collapse in={expanded}>
                <Divider />
                <Box sx={{ p: "12px 16px", bgcolor: "action.selected" }}>
                    <Typography variant="caption" fontWeight={600} color="text.secondary" display="block" mb={0.5}>
                        الاجابه
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                        {template.answer}
                    </Typography>
                </Box>
            </Collapse>
        </Box>
    )
}

export default TemplateCard