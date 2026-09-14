/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Badge, Box, Button, Chip, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";

import { useLazyGetMessengerConversationsQuery } from "../../toolkit/apis/socials/messengerApi";
import { useState } from "react";
import { getFullDate } from "../../settings/constants/dateConstants";
import MessengerMessages from "./MessengerMessages";
import TabInfo from "../ui/TabInfo";
import { More } from "@mui/icons-material";
import Loader from "../../style/mui/loaders/Loader";
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton";
import usePaginate from "../../hooks/usePaginate";


function MessengerConversations({ pageId }) {
    const theme = useTheme()
    const [conversation, setConversation] = useState()
    const [paging, setPaging] = useState({})

    const [getConversations, status] = useLazyGetMessengerConversationsQuery()

    const { data: conversations, loadMore } = usePaginate({
        getData: getConversations, key: 'conversations',
        pollingInterval: 60000, skip: !pageId,
        setPaging, pagingKey: 'paging',
        params: {
            pageId
        }
    })

    return (
        <Box>
            <Typography variant="h5" fontWeight={800} mb={3}>ماسنجر</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    {status.isLoading && <LoaderSkeleton />}
                    <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
                        <Box sx={{ p: 2, borderBottom: "1px solid #dddfe2", bgcolor: "background.default" }}>
                            <Typography fontWeight={700}>رسائل الصفحه : </Typography>
                        </Box>
                        {!!conversations?.length && conversations.map((conv) => {
                            const sender = conv.participants.data.find(p => p.id !== pageId);
                            const unread = !!conv.unread_count

                            return (
                                <Box onClick={() => setConversation(conv)} key={conv.id} sx={{ p: 2, borderBottom: "1px solid", borderColor: 'primary.dark', cursor: "pointer", bgcolor: conv.id === conversation?.id ? theme.palette.primary.dark + 40 : unread ? theme.palette.primary.main + 20 : 'background.default', ':hover': { bgcolor: theme.palette.primary.dark + 40 } }}>
                                    <Stack direction="row" gap={1.5} alignItems="center">
                                        <Badge color="primary" variant="dot" invisible={!unread}>
                                            <Avatar sx={{ bgcolor: "primary.light", width: 44, height: 44, color: 'grey.0' }}>{sender.name[0]}</Avatar>
                                        </Badge>
                                        <Box flex={1} minWidth={0}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography fontWeight={conv.unread ? 800 : 600} fontSize={14}>{sender.name}</Typography>
                                                <TabInfo count={getFullDate(conv.updated_time)} i={1} />
                                            </Stack>
                                            <Typography variant="body2" color="text.secondary" noWrap fontSize={13}>{conv.snippet}</Typography>
                                            <Chip label={"الرسائل: " + conv.message_count} size="small" sx={{ fontSize: 10, height: 16, mt: 0.3, mx: .2 }} />
                                            {unread && <TabInfo count={'رساله جديده'} i={2} isBold={false} />}
                                        </Box>
                                    </Stack>
                                </Box>
                            );
                        })}
                    </Paper>
                    {paging.after && (
                        <Button disabled={status.isFetching}
                            sx={{ mt: '16px' }}
                            variant="contained"
                            endIcon={status.isFetching ? <Loader /> : <More />}
                            onClick={() => loadMore({ after: paging.after })}>تحميل المزيد</Button>
                    )}
                </Grid>

                {conversation && (
                    <MessengerMessages key={conversation.id} conversation={conversation} pageId={pageId} />
                )}
            </Grid>
        </Box>
    )
}

export default MessengerConversations