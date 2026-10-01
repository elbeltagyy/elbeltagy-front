
import { useEffect, useState } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    IconButton,
    Typography,
} from '@mui/material';
import {
    Close,
    ChevronLeft,
    ChevronRight,
    PlayArrow,
    InsertDriveFileOutlined,
} from '@mui/icons-material';

import { getFileType } from '../../tools/fcs/getFileType';
import ShowMedia from './ShowMedia';
import Grid from '../../style/vanilla/Grid';

function ShowMultiMedia({ attachments = [], allowSmallImages = false }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const navigate = (step) => {
        setActiveIndex(index =>
            (index + step + gallery.length) % gallery.length
        );
    };

    const files = attachments.filter(file => file?.url);
    const recordings = files.filter(
        file => getFileType(file.url) === 'audio'
    );

    const gallery = files.filter(
        file => getFileType(file.url) !== 'audio'
    );
    const visibleGallery = gallery.slice(0, 5);
    const extraCount = gallery.length - visibleGallery.length;

    const activeFile = gallery[activeIndex];
    const activeType = activeFile
        ? getFileType(activeFile.url)
        : null;
    useEffect(() => {
        if (activeIndex === null || gallery.length < 2) return;

        const handleKeyDown = (e) => {
            if (
                e.target instanceof HTMLElement &&
                (e.target.isContentEditable ||
                    ['INPUT', 'TEXTAREA'].includes(e.target.tagName))
            ) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigate(1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, gallery.length]);
    if (!files.length) return null;

    return (
        <>
            <Box sx={{ width: '100%', minWidth: 0 }}>
                {/* Recordings: directly playable */}
                {recordings.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            mb: gallery.length ? 1.5 : 0,
                        }}
                    >
                        {recordings.map((file, i) => (
                            <Box
                                key={file._id || file.url || i}
                                sx={{
                                    width: '100%',
                                    minWidth: 0,
                                    p: 1,
                                    borderRadius: 2,
                                    bgcolor: 'action.hover',
                                }}
                            >
                                {file.name && (
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        noWrap
                                        sx={{ display: 'block', mb: 0.5 }}
                                    >
                                        {file.name}
                                    </Typography>
                                )}
                                <ShowMedia file={file} />
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Other attachments */}
                {gallery.length > 0 && (
                    <Grid
                        sx={allowSmallImages && {
                            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        }}
                    >
                        {visibleGallery.map((file, index) => {
                            const type = getFileType(file.url);
                            const isImage = type === 'image';
                            const isVideo = type === 'video';
                            const isLastWithMore = index === 4 && extraCount > 0;

                            return (
                                <Box
                                    key={file._id || file.url || index}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setActiveIndex(index)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setActiveIndex(index);
                                        }
                                    }}
                                    sx={{
                                        position: 'relative',
                                        minWidth: 0,
                                        // aspectRatio: gallery.length === 1 ? '4 / 3' : '1 / 1',
                                        overflow: 'hidden',
                                        bgcolor: 'action.hover',
                                        cursor: 'pointer',
                                        '&:hover .attachment-overlay': { opacity: 1 },
                                    }}
                                >
                                    {isImage || isVideo ? (
                                        <ShowMedia file={file} />
                                    ) : (
                                        <Box
                                            sx={{
                                                height: '100%',
                                                display: 'grid',
                                                placeItems: 'center',
                                            }}
                                        >
                                            <InsertDriveFileOutlined
                                                sx={{ fontSize: 38, color: 'text.secondary' }}
                                            />
                                        </Box>
                                    )}

                                    {isVideo && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'grid',
                                                placeItems: 'center',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: '50%',
                                                    bgcolor: 'rgba(0,0,0,.6)',
                                                    color: 'white',
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                }}
                                            >
                                                <PlayArrow />
                                            </Box>
                                        </Box>
                                    )}

                                    {isLastWithMore ? (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'grid',
                                                placeItems: 'center',
                                                bgcolor: 'rgba(0,0,0,.55)',
                                                color: 'white',
                                                fontSize: 28,
                                                fontWeight: 600,
                                            }}
                                        >
                                            +{extraCount}
                                        </Box>
                                    ) : (
                                        <Box
                                            className="attachment-overlay"
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'end',
                                                p: 1,
                                                background:
                                                    'linear-gradient(transparent, rgba(0,0,0,.65))',
                                                opacity: { xs: 1, md: 0 },
                                                transition: 'opacity .2s',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            <Typography variant="caption" color="white" noWrap>
                                                {file.name || (isImage ? 'Image' : isVideo ? 'Video' : 'File')}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                    </Grid>
                )}
            </Box>

            {/* Popup preview */}
            {/* Preview */}
            <Dialog
                open={activeIndex !== null}
                onClose={() => setActiveIndex(null)}
                maxWidth="lg"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            overflow: 'hidden',
                        },
                    },
                }}
            >
                {activeFile && (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                px: 2,
                                py: 1,
                            }}
                        >
                            <Typography noWrap variant="body2">
                                {activeFile.name ||
                                    `${activeType} ${activeIndex + 1}`}
                            </Typography>

                            <IconButton
                                size="small"
                                onClick={() => setActiveIndex(null)}
                            >
                                <Close />
                            </IconButton>
                        </Box>

                        <DialogContent
                            sx={{
                                p: 1,
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {/* Full image/video without cropping */}
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '& img': {
                                        width: 'auto',
                                        height: 'auto',
                                        maxWidth: '100%',
                                        maxHeight: '75vh',
                                        objectFit: 'contain',
                                    },
                                    '& video': {
                                        width: 'auto',
                                        height: 'auto',
                                        maxWidth: '100%',
                                        maxHeight: '75vh',
                                        objectFit: 'contain',
                                    },
                                }}
                            >
                                <ShowMedia
                                    file={activeFile}
                                    preview
                                />
                            </Box>
                        </DialogContent>

                        {gallery.length > 1 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    py: 0.5,
                                }}
                            >
                                <IconButton
                                    onClick={() => navigate(-1)}
                                >
                                    <ChevronLeft />
                                </IconButton>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {activeIndex + 1} / {gallery.length}
                                </Typography>

                                <IconButton
                                    onClick={() => navigate(1)}
                                >
                                    <ChevronRight />
                                </IconButton>
                            </Box>
                        )}
                    </>
                )}
            </Dialog>
        </>
    );
}

export default ShowMultiMedia;