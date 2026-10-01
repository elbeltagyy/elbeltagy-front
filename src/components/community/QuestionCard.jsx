import { Avatar, Box, Button, Card, CardActions, Chip, Divider, Stack, Typography } from '@mui/material'
import { useAddCommunityQuestionLikeMutation, useDeleteCommunityQuestionMutation, useUpdateCommunityQuestionMutation } from '../../toolkit/apis/communtyQuestionsApi';
import usePostData from '../../hooks/usePostData';


import QuestionCardHeader from './QuestionCardHeader';
import BtnModal from '../ui/BtnModal';
import { FiMessageCircle, FiShare2 } from 'react-icons/fi';
import QuestionCardContent from './QuestionCardContent';
import Comments from './Comments';
import { useState } from 'react';

import CreateCommunityComment from './CreateCommunityComment';
import LikeBtn from './LikeBtn';
import { communityStatus } from '../../settings/constants/communityConstants';
import { FlexRow } from '../../style/mui/styled/Flexbox';
import SwitchStyled from '../../style/mui/styled/SwitchStyled';
import ShowMultiMedia from '../ui/ShowMultiMedia';

function QuestionCard({ q = {}, deleteQuestion, setQuestions, isAdmin }) {

    const [createdComments, setComments] = useState(q?.firstAuthorReplay || [])

    const [sendDelete] = useDeleteCommunityQuestionMutation()
    const [deleteQuestionFc] = usePostData(sendDelete)

    const [sendData] = useAddCommunityQuestionLikeMutation()
    const [makeLike] = usePostData(sendData)

    const [sendUpdate] = useUpdateCommunityQuestionMutation()
    const [updateQuestion] = usePostData(sendUpdate)

    const handleAction = async (action, v) => {
        if (action === 'like') {
            await makeLike({ like: true, _id: q._id })
            setQuestions(prev => prev.map(p => {
                if (p._id === q._id) {
                    return { ...p, likes: (p.likes ?? 0) + 1, isLiked: true }
                } else {
                    return p
                }
            }))
        }

        if (action === 'disLike') {
            await makeLike({ disLike: true, _id: q._id, dislike: true }) //backend dislike all sm
            setQuestions(prev => prev.map(p => {
                if (p._id === q._id) {
                    return { ...p, likes: (p.likes ?? 1) - 1, isLiked: false }
                } else {
                    return p
                }
            }))
        }
        if (action === 'delete') {
            await deleteQuestionFc({ _id: q._id })
            deleteQuestion(q)
        }
        if (action === 'share') {
            const link = `${window.location.origin}/community?questionId=${q._id}`;
            try {
                await navigator.clipboard.writeText(link);
                window.alert("تم نسخ الرابط");
            } catch {
                window.alert(`الرابط: ${link}`);
            }
        }
        if (action === 'update' && isAdmin) {
            const res = await updateQuestion({ _id: q._id, ...v })
            setQuestions(p => p.map(p => {
                if (p._id === q._id) {
                    return { ...p, ...res, user: p.user, firstAuthorReplay: p.firstAuthorReplay }
                } else {
                    return p
                }
            }))
        }
    };
    // const submitComment = async (values) => {
    //     //Remove question when edit
    //     setQuestions(p => p.filter(p => p._id !== q._id))

    // }

    const onCommentCreate = (v) => {
        setComments(c => [...c, v])
        setQuestions(p => p.map(p => {
            //Only edit replies count
            if (p._id === q._id) {
                const status = ((p.firstAuthorReplay?.length ?? 0) === 0 && isAdmin) ? 'published' : p.status
                return { ...p, status, replies: p.replies + 1 }
            } else {
                return p
            }
        }))
    }

    return (
        <Card variant="outlined">
            <QuestionCardHeader handleAction={handleAction} q={q} isAdmin={isAdmin} />
            <QuestionCardContent q={q} />

            <Divider sx={{ mx: 2 }} />
            {isAdmin && (
                <>
                    <FlexRow gap='12px' m={'12px 12px 0 12px'}>
                        {communityStatus.filter(c => c.isAction ?? true).map(status => {
                            return <Chip
                                onClick={() => {
                                    if (q.status !== status.value) {
                                        handleAction('update', { status: status.value })
                                    }
                                }}
                                key={status.value} sx={{ bgcolor: q.status === status.value && (q.status === 'published' ? 'primary.main' : 'error.main') }} size='small' label={status.label} />
                        })}
                        <SwitchStyled label={'فعال؟'} checked={q.isActive} onChange={(v) => handleAction('update', { isActive: v })} />
                    </FlexRow>
                    <Divider sx={{ mx: 2 }} />
                </>
            )}
            <CardActions sx={{ px: 1.5 }}>
                {/* , bgcolor: 'background.default'  */}
                <LikeBtn comment={q} handleAction={handleAction} />

                <BtnModal screenType={'lg'}
                    component={<Comments q={q} onCommentCreate={onCommentCreate} isAdmin={isAdmin} />}
                    btn={<Button
                        startIcon={<FiMessageCircle />}
                        size="small">
                        <span style={{ margin: '0 4px' }}>{q.replies} </span>
                        رد
                    </Button>} />
                <Button size="small" color="inherit"
                    onClick={() => handleAction('share')}
                    startIcon={<FiShare2 />}
                    sx={{ color: "text.secondary" }}>
                    مشاركة
                </Button>
            </CardActions>


            <Stack spacing={1.5} mt={1} sx={{ px: 2, pb: 2 }}>
                {createdComments.map((c) => (
                    <Stack key={c._id} direction="row" spacing={1.5}>
                        <Avatar />
                        <Box sx={{ bgcolor: "background.default", borderRadius: 3, px: 1.5, py: 1 }}>
                            <Typography variant="caption" fontWeight={700} display="block">المشرف</Typography>
                            <Typography variant="body2">{c.content}</Typography>
                            <ShowMultiMedia attachments={c.attachments} allowSmallImages />
                        </Box>
                    </Stack>
                ))}
                <CreateCommunityComment q={q} onCreate={onCommentCreate} />
                {/* setComments={submitComment}  */}
            </Stack>
        </Card>
    )
}

export default QuestionCard