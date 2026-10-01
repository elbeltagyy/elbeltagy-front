import {
    Box, Chip, IconButton, Dialog, DialogContent,
    DialogActions, Button
} from "@mui/material";

import {
    Mic as MicIcon,
    Close as CloseIcon,
    ZoomIn as ZoomInIcon,
} from "@mui/icons-material";

import { useEffect, useState } from "react";

const AttachmentItem = ({ file, index, onRemove, onImageClick }) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file);
        setUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const isImage = file.type.startsWith("image/");
    const isAudio = file.type.startsWith("audio/");

    return (
        <Box sx={{ position: "relative" }}>
            {isImage && url && (
                <Box
                    onClick={() => onImageClick(url)}
                    sx={{
                        position: "relative",
                        width: 60,
                        height: 60,
                        cursor: "pointer",
                        borderRadius: 1,
                        overflow: "hidden",
                        "&:hover .preview-overlay": {
                            opacity: 1,
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={url}
                        alt={file.name}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />

                    <Box
                        className="preview-overlay"
                        sx={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "rgba(0,0,0,0.4)",
                            color: "white",
                            opacity: 0,
                            transition: "opacity 0.2s",
                        }}
                    >
                        <ZoomInIcon fontSize="small" />
                    </Box>
                </Box>
            )}

            {isAudio && url && (
                <Box sx={{ maxWidth: 240 }}>
                    <Chip
                        icon={<MicIcon />}
                        label={file.name}
                        size="small"
                        sx={{ mb: 0.5, maxWidth: "100%" }}
                    />
                    <Box
                        component="audio"
                        src={url}
                        controls
                        preload="metadata"
                        sx={{
                            display: "block",
                            width: 220,
                            height: 36,
                        }}
                    />
                </Box>
            )}

            {!isImage && !isAudio && (
                <Chip
                    label={file.name}
                    size="small"
                    sx={{ maxWidth: 180 }}
                />
            )}

            <IconButton
                size="small"
                onClick={() => onRemove(index)}
                sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    zIndex: 1,
                    bgcolor: "background.paper",
                    p: 0.2,
                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
        </Box>
    );
};

const AttachmentPreview = ({ attachments, onRemove }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!attachments.length) return null;

    return (
        <>
            <Box
                sx={{
                    px: 1.5,
                    pt: 1,
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                {attachments.map((file, i) => (
                    <AttachmentItem
                        key={`${file.name}-${file.lastModified}-${i}`}
                        file={file}
                        index={i}
                        onRemove={onRemove}
                        onImageClick={setSelectedImage}
                    />
                ))}
            </Box>

            <Dialog
                open={Boolean(selectedImage)}
                onClose={() => setSelectedImage(null)}
                maxWidth="md"
                fullWidth
            >
                <DialogContent
                    sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "black",
                    }}
                >
                    {selectedImage && (
                        <Box
                            component="img"
                            src={selectedImage}
                            alt="Image preview"
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "80vh",
                                objectFit: "contain",
                            }}
                        />
                    )}
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setSelectedImage(null)}
                        startIcon={<CloseIcon />}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AttachmentPreview;