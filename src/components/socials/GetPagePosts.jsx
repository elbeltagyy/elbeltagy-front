import { Add, PostAdd as PostsIcon } from "@mui/icons-material"
import { Button, Paper, Stack, Typography } from "@mui/material"
import BtnModal from "../ui/BtnModal"
import CreatePost from "./CreatePost"
import { useLazyGetPostsQuery } from "../../toolkit/apis/socials/facebookApi"
import PostCard from "./PostCard"

import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton"
import { useCallback, useEffect, useState } from "react"
import { FlexBetween } from "../../style/mui/styled/Flexbox"
import MakeSelect from "../../style/mui/styled/MakeSelect"

const types = [
    { label: 'المنشورات المنشوره', value: 'posts' },
    { label: 'المنشورات المجدوله', value: 'scheduled' }
]

function GetPagePosts({ page }) {
    const [after, setAfter] = useState();
    const [before, setBefore] = useState();
    const [posts, setPosts] = useState([])

    const [reset, setReset] = useState(false)
    const [type, setType] = useState('posts')

    const [getPosts, { isSuccess, isLoading }] = useLazyGetPostsQuery()
    // const { data = {}, isSuccess, isLoading, refetch } = useGetPostsQuery({ pageId: page.id, after, before }, { skip: !page.id })

    const loadPosts = useCallback(async (params = {}) => {
        if (!page?.id) return;
        const { data } = await getPosts({ pageId: page.id, type, ...params }, false);
        const newPosts = data.values.data
        setPosts(newPosts)

        const next = data.values.paging?.next
        const previous = data.values.paging?.previous

        const newAfter = data.values.paging?.cursors.after
        const newBefore = data.values.paging?.cursors.before

        next ? setAfter(newAfter) : setAfter()
        previous ? setBefore(newBefore) : setBefore()

    }, [page.id, type])

    useEffect(() => {
        setAfter()
        setBefore()
        loadPosts()
    }, [reset, type]);

    return (
        <Stack direction={'column'} gap={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} flexWrap={'wrap'} gap={'12px'}>
                <Stack direction="column">
                    <Typography variant="h5" fontWeight={800}>Posts</Typography>
                    <Typography variant="caption" color="text.secondary">{page.name} · {posts.length} posts</Typography>
                    <MakeSelect options={types} setValue={setType} value={type} />
                </Stack>

                <BtnModal btn={<Button variant="contained" startIcon={<Add />}>انشاء منشور</Button>}
                    component={<CreatePost pageId={page.id} setPosts={setPosts} setReset={setReset} />}
                />
            </Stack>

            {(posts.length === 0 && page && isSuccess) && (
                <Paper sx={{ p: 6, textAlign: "center" }}>
                    <PostsIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                    <Typography color="text.secondary">No posts yet. Create your first post!</Typography>
                </Paper>
            )}
            {isLoading && <LoaderSkeleton />}
            {(posts.length && page) && posts.map((post) => (
                <PostCard key={post.id} post={post} page={page} setPosts={setPosts} setReset={setReset} />
            ))}
            <FlexBetween>
                {after && (
                    <Button variant="contained" onClick={() => {
                        loadPosts({ after })
                    }}>التالي</Button>
                )}
                {before && (
                    <Button variant="contained" color="error" onClick={() => {
                        loadPosts({ before })
                    }}>السابق</Button>
                )}
            </FlexBetween>
        </Stack>
    )
}

export default GetPagePosts