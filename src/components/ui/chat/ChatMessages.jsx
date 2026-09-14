import { Avatar, Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material"
import { memo, useMemo } from "react";
import { getFullDate } from "../../../settings/constants/dateConstants";
import { FlexColumn } from "../../../style/mui/styled/Flexbox";
import Loader from "../../../style/mui/loaders/Loader";
import TypingBar from "../TypingBar";
import { getFileType } from "../../../tools/fcs/getFileType";
import InfoText from "../InfoText";

const DateSeparator = ({ date }) => (
    <Stack direction="row" alignItems="center" justifyContent="center"
        sx={{ position: 'sticky', top: 0, zIndex: 1 }}> {/* add zIndex */}
        <Box sx={{
            bgcolor: "neutral.600",
            color: "text.secondary",
            fontSize: 11,
            fontWeight: 500,
            px: 1.5, py: 0.4,
            borderRadius: "10px",
        }}>
            {date}
        </Box>
    </Stack>
);

// Format a date label: "Today", "Yesterday", or "DD/MM/YYYY"
const getDayLabel = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const sameDay = (a, b) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    if (sameDay(d, today)) return "اليوم";
    if (sameDay(d, yesterday)) return "أمس";

    return d.toLocaleDateString("ar-EG", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const getDayKey = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

// Single message bubble — memoized
const MessageBubbleComponent = ({ msg, isMine }) => {

    const media = () => {
        if (msg.media) {
            const url = msg.media.url
            const type = getFileType(url)
            if (type === 'image')
                return <Box component="img" src={url} sx={{ maxWidth: "100%", borderRadius: 2, mt: 0.5 }} />;
            if (type === 'audio')
                return <Box component="audio" controls src={url} sx={{ mt: 0.5 }} />;
            if (type === "video")
                return <Box component="video" controls src={url} sx={{ maxWidth: "100%", borderRadius: 2, mt: 0.5 }} />;
            return (
                <Chip label={"File"} component="a" href={url}
                    target="_blank" clickable size="small" sx={{ mt: 0.5 }} />
            );
        }
    }

    const deleted = msg.deleted
    const edited = msg.edited
    const isSeen = msg.isSeen

    return (
        <Stack direction="row" justifyContent={isMine ? "flex-end" : "flex-start"} mb={'0'}>
            <Box sx={{
                maxWidth: "50%",
                bgcolor: isMine ? "primary.main" : "grey.0",
                color: isMine ? "grey.0" : "grey.900",
                px: 2, py: 1,
                borderRadius: isMine ? "18px 18px 0 18px" : "18px 18px 18px 0",
                boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                height: 'fit-content'
            }}>
                {deleted
                    ? <Typography fontSize={14}>تم حذف هذه الرساله !</Typography>
                    : edited
                        ? <Typography fontSize={14}>تم تعديل الرساله ولا يمكن عرضها على المنصه !</Typography>
                        : (<>
                            {msg.message && <Typography fontSize={14}>{msg.message}</Typography>}
                            {media()}
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
                        </>)
                }

                {/* Timestamp + seen ticks row */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0.5, mt: 0.3 }}>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {getFullDate(msg.createdAt)}
                    </Typography>
                    {(isMine && isSeen) && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1 5.5L4.5 9L10.5 2"
                                    stroke={isSeen ? "white" : "rgba(255,255,255,0.6)"}
                                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                                />
                                <path
                                    d="M5.5 5.5L9 9L15 2"
                                    stroke={isSeen ? "white" : "rgba(255,255,255,0.6)"}
                                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                                />
                            </svg>
                        </Box>
                    )}
                </Box>
            </Box>
        </Stack>
    );
};
const MessageBubble = memo(MessageBubbleComponent);


// Group messages by day and inject DateSeparator between groups
const groupMessagesByDay = (messages) => {
    const groups = []; // [{ dayKey, date, messages[] }]
    let currentGroup = null;

    messages.forEach((msg) => {
        const dayKey = getDayKey(msg.createdAt);
        if (!currentGroup || currentGroup.dayKey !== dayKey) {
            currentGroup = { dayKey, date: getDayLabel(msg.createdAt), messages: [] };
            groups.push(currentGroup);
        }
        currentGroup.messages.push(msg);
    });

    return groups;
};


function ChatMessages({ messages = [], status, conversation, sendMessage, multipleAttachments }) {
    const name = conversation.name

    const renderedItems = useMemo(() => {
        if (!messages.length) return <Box />;

        const groups = groupMessagesByDay(messages);

        return groups.map((group) => (
            <Stack direction={'column'} gap={'8px'} key={group.dayKey}>
                {/* Sticky header scoped to this group's block */}
                <DateSeparator date={group.date} />
                {group.messages.reverse().map((msg) => (
                    <MessageBubble
                        key={msg.id ?? msg.createdAt}
                        msg={msg}
                        isMine={msg.direction === 'outbound'}
                    />
                ))}
            </Stack>
        ));
    }, [messages]);

    return (
        <Grid item xs={12} md={7}>
            <Paper sx={{ borderRadius: 2, display: "flex", flexDirection: "column", height: 500 }}>
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: "1px solid #dddfe2", bgcolor: "background.default" }}>
                    <Stack direction="row" alignItems="center" gap={1.5}>
                        <Avatar sx={{ bgcolor: "primary.light", width: 38, height: 38, color: 'grey.0' }}>
                            {name?.[0] ?? "?"}
                        </Avatar>
                        <Box>
                            <Typography fontWeight={700} fontSize={14}>{name}</Typography>
                            <InfoText label={'الرقم'} description={<Typography component={'span'} fontWeight={600} fontSize={14}>{conversation.phone}</Typography>} />
                        </Box>
                    </Stack>
                </Box>

                {/* Messages */}
                <Box flex={1} gap={'16px'} sx={{ p: 2, overflowY: "auto", bgcolor: "background.alt", display: "flex", flexDirection: "column-reverse", position: 'relative' }}>
                    <>
                        {renderedItems}
                        {status.isFetching && <FlexColumn sx={{ flex: 1 }}><Loader /></FlexColumn>}
                    </>
                </Box>

                <Box bgcolor={'background.default'}>
                    <TypingBar status={status} handleSubmit={sendMessage} multipleAttachments={multipleAttachments} />
                </Box>
            </Paper>
        </Grid>
    )
}

export default ChatMessages