import { getFileType } from '../../tools/fcs/getFileType';
import { Box, Chip } from '@mui/material';

function ShowMedia({ msg, file }) {
    const url = file?.url || msg?.media?.url

    const type = getFileType(url)
    if (!url) return
    if (type === 'image')
        return <Box component="img" src={url} sx={{ maxWidth: "100%", borderRadius: 2, mt: 0.5}} />;
    if (type === 'audio')
        return <Box component="audio" controls src={url} sx={{ mt: 0, maxWidth: '100%' }} />;
    if (type === "video")
        return <Box component="video" controls src={url} sx={{ maxWidth: "100%", borderRadius: 2, mt: 0.5 }} />;
    return (
        <Chip label={"File"} component="a" href={url}
            target="_blank" clickable size="small" sx={{ mt: 0.5 }} />
    );
}

export default ShowMedia