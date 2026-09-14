import { Avatar, Badge, Box, Button, Chip, Grid, IconButton, Paper, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import InfoText from "../InfoText";
import TabInfo from "../TabInfo";
import { getFullDate } from "../../../settings/constants/dateConstants";
import Loader from "../../../style/mui/loaders/Loader";
import { Archive, Delete, More, Unarchive } from "@mui/icons-material";
import ChatMessages from "./ChatMessages";
import { FlexColumn } from "../../../style/mui/styled/Flexbox";
import BtnConfirm from "../BtnConfirm";

function ChatConversations({ conversations = [], hasMore,
    status, loadMore, conversation, messages, setConversation,
    onConversationClick, deleteConversation, ignoreOrUnIgnoreConversation, updateStatus
}) {
    const theme = useTheme()

    return (
        <Grid container spacing={3} mt={1} bgcolor={'background.alt'}>
            <Grid item xs={12} md={5}>
                {/* {status.isLoading && <LoaderSkeleton />} */}
                <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <Box sx={{ p: 2, borderBottom: "1px solid #dddfe2", bgcolor: "background.default" }}>
                        <Typography fontWeight={700}>رسائل الواتساب : </Typography>
                    </Box>
                    {!!conversations?.length && conversations.map((conv, i) => {
                        const sender = conv;
                        const unReadCount = conv.unreadCount
                        const isUnread = !!conv.unreadCount
                        const snippet = conv.lastMessage?.message || conv.snippet
                        const role = conv.role === 'family' ? 'ولي امر' : conv.role === 'user' ? 'مسجل عالمنصه' : null
                        const ignored = conv.ignored ?? false

                        return (
                            <Box
                                onClick={() => {
                                    setConversation(conv)
                                    if (onConversationClick) {
                                        onConversationClick(conv)
                                    }
                                }}
                                key={i}
                                sx={{
                                    position: 'relative',
                                    p: 2, borderBottom: "1px solid", borderColor: 'primary.dark',
                                    cursor: "pointer",
                                    bgcolor: conv._id === conversation?._id ? theme.palette.primary.dark + 40 : isUnread ? theme.palette.primary.main + 20 : 'background.default',
                                    ':hover': { bgcolor: theme.palette.primary.dark + 40, '& .delete-btn': { opacity: 1 } }
                                }}>
                                <Stack direction="row" gap={1.5} alignItems="center">
                                    {ignored && <FlexColumn sx={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%' }}>
                                        <Typography color={'error'} sx={{ bgcolor: 'grey.900', p: '16px 8px', opacity: .6 }}>يتم تجاهل (لا يتم تسجيل الرسائل) ولكن يمكنك ارسال رسائل!</Typography>
                                    </FlexColumn>}
                                    <Badge color="primary" variant="dot" invisible={!isUnread}>
                                        <Avatar sx={{ bgcolor: "primary.light", width: 44, height: 44, color: 'grey.0' }}>{sender.name[0]}</Avatar>
                                    </Badge>

                                    <Box flex={1} minWidth={0}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Stack direction={'column'}>
                                                <Typography fontWeight={800} fontSize={14}>{sender.name}</Typography>
                                                <InfoText label={'الرقم'} description={<Typography component={'span'} fontWeight={conv.unread ? 800 : 600} fontSize={14}>{sender.phone}</Typography>} />
                                            </Stack>
                                            <FlexColumn sx={{ alignItems: 'flex-end' }}>
                                                {isUnread && <Chip color="primary" label={unReadCount} size="medium" sx={{ fontSize: 10, height: 16, mt: 0.3, mx: .2 }} />}
                                                <TabInfo count={getFullDate(conv.createdAt)} i={1} isBold={false} />

                                                <Stack direction={'row'} sx={{ position: 'absolute', top: '50%', right: '16px' }}>
                                                    <BtnConfirm
                                                        btn={<Tooltip title={ignored ? 'حفظ الرسائل' : "تجاهل الرسائل"}
                                                            onClick={(e) => {
                                                                e.stopPropagation()  // prevent conversation click
                                                                e.preventDefault()
                                                                ignoreOrUnIgnoreConversation(conv, !ignored)
                                                            }}>
                                                            <IconButton
                                                                disabled={updateStatus.isLoading}
                                                                size="small"
                                                                className="delete-btn"
                                                                sx={{
                                                                    opacity: 0,
                                                                    transition: 'opacity 0.2s',
                                                                }}
                                                            >
                                                                {updateStatus.isLoading ? <Loader /> : ignored ?
                                                                    <Unarchive fontSize="small" color="primary" />
                                                                    :
                                                                    <Archive fontSize="small" color="error" />
                                                                }
                                                            </IconButton>
                                                        </Tooltip>} />

                                                    <BtnConfirm
                                                        modalInfo={{ desc: 'سيتم ازاله الدردشه وجميع الرسائل على المنصه فقط ولكن لا يمكن ازاله الرسائل من علي واتساب !' }}
                                                        btn={<Tooltip title="Delete"
                                                            onClick={(e) => {
                                                                e.stopPropagation()  // prevent conversation click
                                                                e.preventDefault()
                                                                deleteConversation(conv)
                                                            }}>
                                                            <IconButton
                                                                size="small"
                                                                className="delete-btn"
                                                                sx={{
                                                                    opacity: 0,
                                                                    transition: 'opacity 0.2s',
                                                                }}
                                                            >
                                                                <Delete fontSize="small" color="error" />
                                                            </IconButton>
                                                        </Tooltip>} />
                                                </Stack>
                                            </FlexColumn>
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary" noWrap fontSize={13}>{snippet}</Typography>
                                        {role && <Chip label={role} size="small" sx={{ fontSize: 10, height: 16 }} />}
                                    </Box>

                                </Stack>
                            </Box>
                        );
                    })}
                </Paper>
                {hasMore && (
                    <Button disabled={status.isFetching}
                        sx={{ mt: '16px' }}
                        variant="contained"
                        endIcon={status.isFetching ? <Loader /> : <More />}
                        onClick={loadMore}>تحميل المزيد</Button>
                )}
            </Grid>

            {
                conversation && <ChatMessages key={conversation._id}
                    conversation={conversation} messages={messages.messages}
                    status={messages.status} sendMessage={messages.sendMessage}
                    multipleAttachments={messages.multipleAttachments} sendStatus={messages.sendStatus}
                />
            }
        </Grid >
    )
}

export default ChatConversations