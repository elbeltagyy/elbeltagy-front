import {
    Avatar, Box, Button, Chip, Grid, Paper, Stack, Typography
} from "@mui/material";

import { useCallback, useMemo, useState } from "react";

import Loader from "../../style/mui/loaders/Loader";
import { FlexColumn } from "../../style/mui/styled/Flexbox";
import { useLazyGetMessengerConversationMessagesQuery, useReplayToMessageMutation } from "../../toolkit/apis/socials/messengerApi";
import { getFullDate } from "../../settings/constants/dateConstants";
import usePostData from "../../hooks/usePostData";
import { memo } from "react";
import TypingBar from "../ui/TypingBar";
import usePaginate from "../../hooks/usePaginate";

// Single message bubble — memoized
const MessageBubbleComponent = ({ msg, pageId }) => {
    const isMine = msg.from.id === pageId;
    return (
        <Stack direction="row" justifyContent={isMine ? "flex-end" : "flex-start"} mb={1.5}>
            <Box sx={{
                maxWidth: "72%",
                bgcolor: isMine ? "primary.main" : "grey.0",
                color: isMine ? "grey.0" : "grey.900",
                px: 2, py: 1,
                borderRadius: isMine ? "18px 18px 0 18px" : "18px 18px 18px 0",
                boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                height: 'fit-content'
            }}>
                {/* Text */}
                {msg.message && <Typography fontSize={14}>{msg.message}</Typography>}

                {/* Attachments from API */}
                {msg.attachments?.data?.map((att, i) => {
                    const url = att?.image_data?.url || att.file_url
                    const mime = att.mime_type || "";
                    if (mime.startsWith("image/"))
                        return <Box key={i} component="img" src={url} sx={{ maxWidth: "100%", borderRadius: 2, mt: 0.5 }} />;
                    if (mime.startsWith("audio/"))
                        return <Box key={i} component="audio" controls src={url} sx={{ mt: 0.5 }} />;
                    return (
                        <Chip key={i} label={att.name || "File"} component="a" href={url}
                            target="_blank" clickable size="small" sx={{ mt: 0.5 }} />
                    );
                })}

                <Typography variant="caption" sx={{ opacity: 0.7, display: "block", textAlign: "right" }}>
                    {getFullDate(msg.created_time)}
                </Typography>
            </Box>
        </Stack>
    );
};
const MessageBubble = memo(MessageBubbleComponent);

function MessengerMessages({ pageId, conversation }) {
    const recipientId = useMemo(
        () => conversation?.participants?.data[0]?.id,
        [conversation]
    );
    const participantName = useMemo(
        () => conversation?.participants?.data[0]?.name,
        [conversation]
    );

    const [paging, setPaging] = useState({})

    const [getMessages, status] = useLazyGetMessengerConversationMessagesQuery()
    const { data: messages, loadMore, setReset } = usePaginate({
        getData: getMessages, key: 'messages',
        pollingInterval: 10000,
        setPaging, pagingKey: 'paging',
        params: {
            pageId, conversationId: conversation?.id
        }
    })

    const renderedMessages = useMemo(() => (
        messages.length ? messages.map((msg, i) => (
            <MessageBubble key={msg.id ?? i} msg={msg} pageId={pageId} />
        )) : <Box></Box>
    ), [messages, pageId]);

    const [sendData, sendStatus] = useReplayToMessageMutation();
    const [replay] = usePostData(sendData);

    const handleSubmit = useCallback(async (values) => {
        if (!values) return;
        await replay({ recipientId, pageId, text: values.text, files: values.attachments, conversationId: conversation.id }, true);

        setReset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipientId, pageId, conversation.id]);


    return (
        <Grid item xs={12} md={7}>
            <Paper sx={{ borderRadius: 2, display: "flex", flexDirection: "column", height: 500 }}>
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: "1px solid #dddfe2", bgcolor: "background.default", }}>
                    <Stack direction="row" alignItems="center" gap={1.5}>
                        <Avatar sx={{ bgcolor: "primary.light", width: 38, height: 38, color: 'grey.0' }}>
                            {participantName?.[0] ?? "?"}
                        </Avatar>
                        <Box>
                            <Typography fontWeight={700} fontSize={14}>{participantName}</Typography>
                            {/* <Typography variant="caption" color="success.main">● Active now</Typography> */}
                        </Box>
                    </Stack>
                </Box>

                {/* Messages */}
                {renderedMessages && <Box flex={1} gap={'16px'} sx={{ p: 2, overflowY: "auto", bgcolor: "background.alt", display: "flex", flexDirection: "column-reverse" }}>
                    <>
                        {renderedMessages}
                        {status.isFetching && <FlexColumn sx={{ flex: 1 }}><Loader /></FlexColumn>}
                        {paging.after && (
                            <Button variant="contained" onClick={(() => loadMore({ after: paging.after }))}>تحميل المزيد</Button>
                        )}
                    </>
                </Box>}
                <Box bgcolor={'background.default'}>

                    <TypingBar handleSubmit={handleSubmit} status={sendStatus} />
                </Box>
            </Paper>
        </Grid>
    );
}

export default MessengerMessages;