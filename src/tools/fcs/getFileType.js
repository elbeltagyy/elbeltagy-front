export const getFileType = (url, mime) => {
    // Try mime first
    if (mime) {
        if (mime.startsWith("image/")) return "image";
        if (mime.startsWith("audio/")) return "audio";
        if (mime.startsWith("video/")) return "video";
    }

    // Fallback: detect from URL extension
    const ext = url?.split("?")[0].split(".").pop()?.toLowerCase();

    const IMAGE_EXTS = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif"];
    const AUDIO_EXTS = ["mp3", "ogg", "wav", "m4a", "aac", "opus", "flac", 'oga'];
    const VIDEO_EXTS = ["mp4", "webm", "mov", "avi", "mkv", "m4v"];

    if (IMAGE_EXTS.includes(ext)) return "image";
    if (AUDIO_EXTS.includes(ext)) return "audio";
    if (VIDEO_EXTS.includes(ext)) return "video";

    return "file";
};
