import { Avatar, Box, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import { getFullDate } from "../../settings/constants/dateConstants"

import InfoText from "../ui/InfoText"
import ShowMultiMedia from "../ui/ShowMultiMedia"
import BtnConfirm from "../ui/BtnConfirm"
import { useAddCommunityCommentLikeMutation, useDeleteCommunityCommentMutation, useUpdateCommunityCommentMutation } from "../../toolkit/apis/CommunityCommentsApi"
import usePostData from "../../hooks/usePostData"
import { DeleteForever } from "@mui/icons-material"
import LikeBtn from "./LikeBtn"
import SwitchStyled from "../../style/mui/styled/SwitchStyled"

function CommentCard({ comment, user, setComments, isAdmin }) {
    const authorName = comment.user.name
    const isMine = user._id === comment.user?._id

    const [sendDelete] = useDeleteCommunityCommentMutation()
    const [deleteComment] = usePostData(sendDelete)

    const [sendData] = useAddCommunityCommentLikeMutation()
    const [makeLike] = usePostData(sendData)

    const [sendUpdate] = useUpdateCommunityCommentMutation()
    const [updateComment] = usePostData(sendUpdate)

    const handleAction = async (action, v) => {
        if (action === 'delete') {
            await deleteComment({ _id: comment._id })
            setComments(p => p.filter(prev => prev._id !== comment._id))
        }

        if (action === 'like') {
            await makeLike({ like: true, _id: comment._id })
            setComments(prev => prev.map(p => {
                if (p._id === comment._id) {
                    return { ...p, likes: (p.likes ?? 0) + 1, isLiked: true }
                } else {
                    return p
                }
            }))
        }
        if (action === 'disLike') {
            await makeLike({ disLike: true, _id: comment._id, dislike: true })
            setComments(prev => prev.map(p => {
                if (p._id === comment._id) {
                    return { ...p, likes: (p.likes ?? 1) - 1, isLiked: false }
                } else {
                    return p
                }
            }))
        }
        if (action === 'activity' && isAdmin) {
            const res = await updateComment({ _id: comment._id, ...v })
            setComments(prev => prev.map(p => {
                if (p._id === comment._id) {
                    return { ...p, isActive: res.isActive }
                } else {
                    return p
                }
            }))
        }
    }


    return (
        <Card variant="outlined" key={comment._id} sx={{ mb: 2, outline: 'none !important' }}>
            <CardContent >
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                    <Stack direction="row" gap={1.5} alignItems="flex-start" flex={1}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, fontSize: 14 }}>{authorName[0]}</Avatar>
                        <Box flex={1}>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography variant="body2" fontWeight={700}>{authorName} {isMine && ("(أنا)")}</Typography>
                                <Chip size="small" color={isMine ? 'error' : "primary"} label={comment.user?.role} sx={{ fontSize: 11 }} />
                            </Stack>
                            <FlexRow gap={'6px'}>
                                <Typography variant="caption" color="text.secondary">{getFullDate((comment.createdAt))} </Typography>
                                ·
                                <LikeBtn comment={comment} handleAction={handleAction} />
                                {isAdmin && (
                                    <SwitchStyled checked={comment.isActive} onChange={(v) => handleAction('activity', { isActive: v })} label={'فعال؟'} />
                                )}
                            </FlexRow>
                            <Box sx={{ bgcolor: 'background.alt', p: '8px 12px', width: '100%', flex: 1, ml: 'auto' }}>
                                <InfoText label={'الرد'} description={comment.content} />
                                <ShowMultiMedia attachments={comment.attachments} />
                            </Box>
                            <Typography variant="caption" color="text.secondary" display="block" mt={0.3}>
                                {/* On: "{post.text.slice(0, 50)}{post.text.length > 50 ? "…" : ""}" */}
                            </Typography>

                        </Box>
                    </Stack>
                    <Stack direction="row">
                        {(isMine || isAdmin) && (
                            <BtnConfirm
                                btn={
                                    <IconButton onClick={() => handleAction('delete')} size="small" color="error"><DeleteForever fontSize="small" /></IconButton>
                                }
                            />
                        )}
                    </Stack>
                </Stack>
                {/* {isNested && (
                                    <CreateComment setReset={setReset} id={comment.id} pageId={page.id} placeholder="الرد علي التعليق" />
                                )} */}
            </CardContent>

        </Card>
    )
}

export default CommentCard