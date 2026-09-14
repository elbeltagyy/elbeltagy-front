import {
    Box, Chip, IconButton, Stack, TextField
} from "@mui/material";
import {
    AttachFile as AttachFileIcon,
    Image as ImageIcon,
    Send as SendIcon,
    EmojiEmotions as EmojiIcon,
    Close as CloseIcon,
    Mic as MicIcon,
    Stop as StopIcon,
} from "@mui/icons-material";
import { useCallback, useRef, useState } from "react";
import Loader from "../../style/mui/loaders/Loader";

// Isolated input so it never triggers parent re-render
const MessageInput = ({ onSubmit, isLoading, resetAttachments, attachments }) => {
    const [text, setText] = useState("");
    const textRef = useRef("");

    const handleChange = useCallback((e) => {
        textRef.current = e.target.value;
        setText(e.target.value);
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!textRef.current.trim() && attachments.length === 0) return;
        await onSubmit({ text: textRef.current, attachments, attachment: attachments[0] });
        setText("");
        resetAttachments([])
        textRef.current = "";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSubmit, attachments]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }, [handleSubmit]);

    return (
        <Stack direction="row" gap={1} alignItems="center" sx={{ flex: 1 }}>
            <TextField
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                size="small"
                fullWidth
                placeholder="Aa"
                multiline
                maxRows={4}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
            />
            <IconButton
                disabled={isLoading || (!text.trim() && attachments.length === 0)}
                onClick={handleSubmit}
                color="primary"
            >
                {isLoading ? <Loader /> : <SendIcon />}
            </IconButton>
        </Stack>
    );
};

// Attachment preview strip
const AttachmentPreview = ({ attachments, onRemove }) => {
    if (!attachments.length) return null;
    return (
        <Box sx={{ px: 1.5, pt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {attachments.map((file, i) => {
                const isImage = file.type.startsWith("image/");
                const isAudio = file.type.startsWith("audio/");
                const url = URL.createObjectURL(file);
                return (
                    <Box key={i} sx={{ position: "relative" }}>
                        {isImage && (
                            <Box component="img" src={url} sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1 }} />
                        )}
                        {isAudio && (
                            <Chip icon={<MicIcon />} label={file.name} size="small" />
                        )}
                        {!isImage && !isAudio && (
                            <Chip label={file.name} size="small" />
                        )}
                        <IconButton size="small" onClick={() => onRemove(i)}
                            sx={{ position: "absolute", top: -8, right: -8, bgcolor: "background.paper", p: 0.2 }}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                );
            })}
        </Box>
    );
};

function TypingBar({ status, handleSubmit, multipleAttachments = true }) {
    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);

    // Attachments state
    const [attachments, setAttachments] = useState([]);

    const removeAttachment = useCallback((index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleFiles = useCallback((files) => {
        setAttachments(prev => [...prev, ...Array.from(files)]);
    }, []);

    const resetAttachments = useCallback(() => {
        setAttachments([]);
    }, []);

    // Audio recording
    const [isRecording, setIsRecording] = useState(false);
    const recorderRef = useRef(null);
    const chunksRef = useRef([]);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            chunksRef.current = [];
            recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const file = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
                setAttachments(prev => [...prev, file]);
                stream.getTracks().forEach(t => t.stop());
            };
            recorder.start();
            recorderRef.current = recorder;
            setIsRecording(true);
        } catch {
            console.error("Microphone access denied");
        }
    }, []);

    const stopRecording = useCallback(() => {
        recorderRef.current?.stop();
        setIsRecording(false);
    }, []);
    const disabled = (!multipleAttachments && attachments.length > 0)
    return (
        <>
            <AttachmentPreview attachments={attachments} onRemove={removeAttachment} />
            {/* Toolbar */}
            <Box sx={{ p: 1.5, borderTop: "1px solid #dddfe2" }}>
                <Stack direction="row" gap={1} alignItems="center">
                    {/* Image picker */}
                    <input ref={imageInputRef} type="file" accept="image/*" multiple={multipleAttachments} hidden
                        onChange={e => handleFiles(e.target.files)} />
                    <IconButton disabled={disabled} size="small" color="primary" onClick={() => imageInputRef.current.click()}>
                        <ImageIcon />
                    </IconButton>

                    {/* File picker */}
                    <input ref={fileInputRef} type="file" multiple={multipleAttachments} hidden
                        onChange={e => handleFiles(e.target.files)} />
                    <IconButton disabled={disabled} size="small" color="primary" onClick={() => fileInputRef.current.click()}>
                        <AttachFileIcon />
                    </IconButton>

                    {/* Emoji placeholder */}
                    {/* <IconButton size="small" color="primary"><EmojiIcon /></IconButton> */}

                    {/* Voice record */}
                    <IconButton disabled={disabled} size="small" color={isRecording ? "error" : "primary"}
                        onClick={isRecording ? stopRecording : startRecording}>
                        {isRecording ? <StopIcon /> : <MicIcon />}
                    </IconButton>

                    {/* Text input + send */}
                    <MessageInput
                        onSubmit={handleSubmit}
                        isLoading={status.isLoading}
                        resetAttachments={resetAttachments}
                        attachments={attachments}
                    />
                </Stack>
            </Box>
        </>
    )
}

export default TypingBar