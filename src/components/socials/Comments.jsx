import { Comment, DeleteForever, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, IconButton, Paper, Stack, Typography } from "@mui/material";

import Section from "../../style/mui/styled/Section";
import { useDeleteCommentMutation, useLazyGetCommentsQuery, useUpdateCommentMutation } from "../../toolkit/apis/socials/facebookApi";
import { getFullDate } from "../../settings/constants/dateConstants";
import { FlexBetween, FlexRow } from "../../style/mui/styled/Flexbox";
import BtnModal from "../ui/BtnModal";
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton";
import usePostData from "../../hooks/usePostData";
import CreateComment from "./CreateComment";
import InfoText from "../ui/InfoText";
import { useState } from "react";

import Loader from "../../style/mui/loaders/Loader";

import MakeSelect from "../../style/mui/styled/MakeSelect";
import BtnConfirm from "../ui/BtnConfirm";
import UpdateComment from "./UpdateComments";
import usePaginate from "../../hooks/usePaginate";

const sorts = [
    { label: 'من الاقدم للاحدث', value: 'old' },
    { label: 'من الاحدث للاقدم', value: 'new' }
]

const filters = [
    { label: 'كل التعليقات', value: 'all' },
    { label: 'التعليقات التي لم يتم الرد', value: '0' },
    { label: 'التعليقات التي تم الرد', value: '1' }
]

function Comments({ post, page = { name: 'test' }, title = 'التعليقات:', index = 1 }) {

    const [filter, setFilter] = useState('all') //all, 0 => not responded, 1 => responded
    const [sort, setSort] = useState('new')
    const [paging, setPaging] = useState({})

    const [getComments, { isLoading, isSuccess }] = useLazyGetCommentsQuery()

    const { data: comments, loadNext, setReset } = usePaginate({
        getData: getComments, key: 'comments',
        pollingInterval: 10000, skip: !post?.id,
        setPaging, pagingKey: 'paging',
        params: {
            id: post.id, pageId: page.id, sort, filter,
        }
    })

    const isNested = index < 3

    const [sendUpdate, statusUpdate] = useUpdateCommentMutation()
    const [updateComment] = usePostData(sendUpdate, null, setReset)

    const [sendDelete, statusDelete] = useDeleteCommentMutation()
    const [deleteComment] = usePostData(sendDelete, null, setReset)
    // console.log(paging)
    return (
        <Section>
            {isLoading && <LoaderSkeleton />}
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ mb: '16px' }} >
                    <Typography variant="h5" fontWeight={800} mb={3}>{title}</Typography>
                    {post.message &&
                        <Typography variant="body1" fontWeight={800} mb={3}>{post.message}</Typography>
                    }
                    <MakeSelect
                        setValue={setSort}
                        value={sort}
                        options={sorts}
                    />
                    <MakeSelect
                        setValue={setFilter}
                        value={filter}
                        options={filters}
                    />
                    {comments.length === 0 && isSuccess && <Paper sx={{ p: 6, textAlign: "center" }}><Comment sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} /><Typography color="text.secondary">No comments yet.</Typography></Paper>}
                    <CreateComment setReset={setReset} id={post.id} pageId={page.id} placeholder="اضافه تعليق" />
                </Box>

                {comments.map((comment) => {
                    const author = comment.from || {}
                    const commentByPage = author?.id === page.id
                    const img = comment.attachment?.media?.image?.src || ''

                    return (
                        <Card elevation={3} key={comment.id} sx={{ mb: 2, outline: 'none !important' }}>

                            <CardContent >
                                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                                    <Stack direction="row" gap={1.5} alignItems="flex-start" flex={1}>
                                        <Avatar sx={{ bgcolor: "#1877F2", width: 36, height: 36, fontSize: 14 }}>{author.name ? author.name[0] : 'U'}</Avatar>
                                        <Box flex={1}>
                                            <Stack direction="row" alignItems="center" gap={1}>
                                                <Typography variant="h6" fontWeight={700}>{author.name || 'Unknown'}</Typography>
                                                <Chip size="small" label={page.name} sx={{ fontSize: 11 }} />
                                            </Stack>
                                            <FlexRow gap={'6px'}>
                                                <Typography variant="caption" color="text.secondary">{getFullDate((comment.created_time))} </Typography>
                                                ·
                                                <Typography>{comment.like_count} تسجيلات الاعجاب </Typography>
                                                {/* <BtnModal btn={<Typography>{comment.like_count} تسجيلات الاعجاب </Typography>} component={'Likes'} /> */}
                                                {isNested && (
                                                    <>
                                                        ·
                                                        <BtnModal btn={<Typography>{comment.comment_count || 0} الردود </Typography>} component={<Comments index={index + 1} post={{ id: comment.id }} page={page} title={'الردود علي : ' + comment.message} />} />
                                                    </>
                                                )}
                                            </FlexRow>
                                            <Box sx={{ bgcolor: 'background.alt', p: '8px 12px', width: '100%', flex: 1, ml: 'auto' }}>
                                                <InfoText label={'الرساله'} description={comment.message} />
                                            </Box>
                                            <Typography variant="caption" color="text.secondary" display="block" mt={0.3}>
                                                {/* On: "{post.text.slice(0, 50)}{post.text.length > 50 ? "…" : ""}" */}
                                                <Box></Box>              </Typography>
                                            {img && (
                                                <CardMedia
                                                    component="img"
                                                    image={img}
                                                    alt="Paella dish"
                                                    sx={{ maxWidth: "180px" }}
                                                />
                                            )}
                                        </Box>

                                    </Stack>
                                    <Stack direction="row">
                                        {(statusUpdate.isLoading || statusDelete.isLoading) && <Loader />}
                                        {!commentByPage && (
                                            <BtnConfirm
                                                btn={<IconButton disabled={statusUpdate.isLoading || statusDelete.isLoading} size="small" onClick={() => { updateComment({ id: comment.id, pageId: page.id, is_hidden: !comment.is_hidden }); }}>{comment.is_hidden ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</IconButton>} />
                                        )}
                                        {commentByPage && (
                                            <BtnModal
                                                component={<UpdateComment comment={comment} pageId={page.id} setReset={setReset} />}
                                                btn={
                                                    <IconButton disabled={statusUpdate.isLoading || statusDelete.isLoading} size="small"><Edit fontSize="small" /></IconButton>
                                                }
                                            />
                                        )}
                                        <BtnConfirm
                                            btn={
                                                <IconButton onClick={() => deleteComment({ id: comment.id, pageId: page.id })} disabled={statusUpdate.isLoading || statusDelete.isLoading} size="small" color="error"><DeleteForever fontSize="small" /></IconButton>
                                            }
                                        />
                                    </Stack>
                                </Stack>
                                {isNested && (
                                    <CreateComment setReset={setReset} id={comment.id} pageId={page.id} placeholder="الرد علي التعليق" />
                                )}
                            </CardContent>

                        </Card>
                    );
                })}

                <FlexBetween>
                    {paging.after && (
                        <Button variant="contained" onClick={() => loadNext({ after: paging.after })}>التالي</Button>
                    )}
                    {paging.before && (
                        <Button variant="contained" color="error" onClick={() => loadNext({ before: paging.before })}>السابق</Button>
                    )}
                </FlexBetween>
            </Box>
        </Section >
    )
}

export default Comments