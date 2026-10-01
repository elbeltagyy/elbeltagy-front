import { Box, Paper, Typography } from "@mui/material"
import usePaginate from "../../hooks/usePaginate"
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton"
import Section from "../../style/mui/styled/Section"
import { useLazyGetCommunityCommentsQuery } from "../../toolkit/apis/CommunityCommentsApi"
import TitleWithDividers from "../ui/TitleWithDividers"

import { Comment, } from "@mui/icons-material"

import ShowMultiMedia from '../ui/ShowMultiMedia';
import CreateCommunityComment from "./CreateCommunityComment"

import Grid from "../../style/vanilla/Grid"
import { useSelector } from "react-redux"

import CommentCard from "./CommnetCard"

function Comments({ q, onCommentCreate, isAdmin }) {
    const [getData, { isLoading, isSuccess }] = useLazyGetCommunityCommentsQuery()
    const { data: comments = [], setData: setComments } = usePaginate({
        getData,
        key: 'communityComments', params: { question: q._id, populate: 'user.name user.role', select: '+likes' }
    })

    const insertComment = (res) => {
        setComments(p => [res, ...p])
    }
    const user = useSelector(s => s.global.user)

    return (
        <Section>
            <TitleWithDividers title={'الردود'} />

            <Grid sx={{ position: 'relative' }}>
                <Box sx={{ mb: '16px' }} >
                    {q.content &&
                        <Typography variant="body1" fontWeight={800} mb={3} whiteSpace={'pre-wrap'}>{q.content}</Typography>
                    }
                    <ShowMultiMedia attachments={q.attachments} allowSmallImages />

                    {/* <MakeSelect
                        setValue={setSort}
                        value={sort}
                        options={sorts}
                    /> */}
                    <CreateCommunityComment q={q} body={{}} setComments={insertComment} onCreate={onCommentCreate} />
                </Box>

                {isLoading && <LoaderSkeleton />}
                {comments?.length === 0 && isSuccess && <Paper variant="outlined" sx={{ p: 6, textAlign: "center" }}><Comment sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} /><Typography color="text.secondary">No comments yet.</Typography></Paper>}

                <Box sx={{ width: '100%' }}>
                    {comments.map((comment) => {
                        return (
                            <CommentCard key={comment._id} comment={comment} user={user} setComments={setComments} isAdmin={isAdmin} />
                        );
                    })}
                </Box>
            </Grid>
        </Section>
    )
}

export default Comments