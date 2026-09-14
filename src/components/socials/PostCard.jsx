import { AttachFile, CheckCircle, Delete, Edit, LinkOffRounded, MoreVert, Share, ThumbUp } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, IconButton, ImageList, ImageListItem, Link as LinkMui, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { getDateWithTime, getFullDate } from "../../settings/constants/dateConstants";
const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : n;
import { TiWorld } from "react-icons/ti";
import { useState } from "react";
import { Link } from "react-router-dom";
import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCopy } from "react-icons/fa";
import BtnModal from "../ui/BtnModal";
import Comments from "./Comments";
import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox";
import UpdatePost from "./UpdatePost";
import { useDeletePostMutation } from "../../toolkit/apis/socials/facebookApi";
import usePostData from "../../hooks/usePostData";
import BtnConfirm from "../ui/BtnConfirm";
import Loader from "../../style/mui/loaders/Loader";
import TabInfo from "../ui/TabInfo";

function PostCard({ page, post, setPosts, setReset }) {

    const [shareAnchor, setShareAnchor] = useState()
    const [menuAnchor, setMenuAnchor] = useState(false)

    const liked = post.likes.summary.total_count
    const comments = post.comments.summary.total_count
    const img = post.full_picture
    const images = post.attachments?.data?.[0]?.subattachments?.data?.map(
        item => item.media?.image?.src
    ) || [];

    const [sendDelete, statusDelete] = useDeletePostMutation()
    const [deletePost] = usePostData(sendDelete)

    const handelDelete = async () => {
        if (statusDelete.isLoading) return
        await deletePost({ postId: post.id, pageId: page.id })
        setPosts(p => {
            return p.filter(old => old.id !== post.id)
        })
    }

    return (
        <Card sx={{ mb: 2, bgcolor: 'background.default' }}>
            <CardHeader
                avatar={<Avatar src={post.full_picture} sx={{ bgcolor: page.color, fontWeight: 800 }}>Po</Avatar>}
                title={<Stack direction="row" alignItems="center" gap={0.5}><Typography fontWeight={700}>{page.name}</Typography>{page.verified && <CheckCircle sx={{ fontSize: 14, color: "primary.main" }} />}</Stack>}
                subheader={<Stack direction="row" alignItems="center" gap={0.5}>
                    <FlexRow><Typography variant="caption">{getFullDate(post.created_time)}</Typography><TiWorld size={'1rem'} /></FlexRow>
                    {post.scheduled_publish_time && <TabInfo count={getDateWithTime(new Date(post.scheduled_publish_time * 1000).toISOString())} title={'سيتم النشر في'} isBold={false} i={2} />}
                </Stack>}
                action={
                    <>
                        <IconButton size="small" onClick={(e) => setMenuAnchor(e.currentTarget)}><MoreVert /></IconButton>
                        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                            <MenuItem disabled={statusDelete.isLoading}>
                                <BtnModal
                                    component={<UpdatePost post={post} setPosts={setPosts} setReset={setReset} pageId={page.id} />}
                                    btn={<FlexColumn sx={{ flexDirection: 'row' }}><Edit fontSize="small" sx={{ mr: 1 }} />تعديل المنشور</FlexColumn>} />

                            </MenuItem>
                            <MenuItem disabled={statusDelete.isLoading} sx={{ color: "error.main" }}>
                                <BtnConfirm
                                    btn={<FlexColumn sx={{ flexDirection: 'row' }} onClick={handelDelete}>
                                        {statusDelete.isLoading ? <Loader /> : <Delete fontSize="small" sx={{ mr: 1 }} />}حذف المنشور</FlexColumn>} />
                            </MenuItem>
                        </Menu>
                    </>
                }
            />

            <CardContent sx={{ pt: 0 }}>
                <Typography >{post.message}</Typography>
                {post.file && (
                    <Paper variant="outlined" sx={{ p: 1, display: "flex", alignItems: "center", gap: 1, borderRadius: 2 }}>
                        <AttachFile color="primary" fontSize="small" />
                        <Typography variant="body2" color="primary.main" fontWeight={600}>{post.file}</Typography>
                    </Paper>
                )}
            </CardContent>
            {(img && !images.length) && (
                <CardMedia
                    component="img"
                    image={img}
                    alt="Paella dish"
                    sx={{ maxWidth: "180px" }}
                />
            )}
            {(images.length !== 0) && (
                <ImageList sx={{ width: 500, maxHeight: 450 }} cols={3} rowHeight={164}>
                    {images.map((item) => (
                        <ImageListItem key={item}>
                            <img
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item}`}
                                // alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
            <Divider />
            <CardActions sx={{ px: 1, py: 0.5 }}>
                <Button size="small" startIcon={<ThumbUp />}
                    sx={{ color: liked ? "primary.main" : "text.secondary", fontWeight: liked ? 700 : 400 }}>
                    {fmt(liked)} الاعجاب
                </Button>
                <BtnModal
                    component={<Comments post={post} page={page} />}
                    btn={<Button size="small"
                        sx={{ color: "text.secondary" }}>
                        {comments} التعليقات
                    </Button>}
                />
                <Box>
                    <Button size="small" startIcon={<Share />} sx={{ color: "text.secondary" }} onClick={(e) => setShareAnchor(e.currentTarget)}>
                        {(post.shares)} المشاركه
                        {/* fmt */}
                    </Button>
                    <Menu anchorEl={shareAnchor} open={Boolean(shareAnchor)} onClose={() => setShareAnchor(null)}>
                        <MenuItem>
                            <FaCopy size={'.9rem'} style={{ marginLeft: '10px' }} />
                            <CopyToClipboard text={post.permalink_url} onCopy={() => alert("تم النسخ بنجاح")}>
                                <Typography>نسخ الرابط</Typography>
                            </CopyToClipboard>
                        </MenuItem>

                        <MenuItem sx={{ color: "primary.main" }}>
                            <LinkOffRounded fontSize="small" sx={{ mr: 1 }} />
                            <LinkMui component={Link} to={post.permalink_url}>فتح المنشور علي فيسبوك</LinkMui>
                        </MenuItem>
                    </Menu>
                </Box>
            </CardActions>
            <Divider />

            {/* <Collapse in={expanded}>
                <Box sx={{ p: 2, bgcolor: "#f7f8fa" }}>
                    {post.comments.map((c) => (
                        <CommentItem key={c.id} comment={c} postId={post.id} onEdit={onEditComment} onDelete={onDeleteComment} />
                    ))}
                    <Stack direction="row" gap={1} mt={1}>
                        <TextField size="small" fullWidth placeholder="Write a comment…" value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleComment()}
                            sx={{ bgcolor: "white", borderRadius: 5, "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
                        />
                        <IconButton color="primary" onClick={handleComment} size="small"><SendIcon /></IconButton>
                    </Stack>
                </Box>
            </Collapse> */}
        </Card>
    )
}

export default PostCard