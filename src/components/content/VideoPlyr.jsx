import { useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Plyr, { usePlyr } from "plyr-react";

function VideoPlyr({ url }) {
    const theme = useTheme()
    const vid = useRef(null)

    const options = {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['captions', 'quality', 'speed', 'loop'],

    }

    const source = {
        type: "video",
        title: 'Example title',
        sources: [
            {
                src: url,
                type: 'video/mp4',
            },
        ],
        // previewThumbnails: {
        //     src: '/assets/3rd.jpg',
        // },
    }

    return (
        <div style={{ boxShadow: theme.shadows[8], width: '100%', maxHeight: '500px !important', borderRadius: '16px', overflow: 'hidden', "--plyr-color-main": '#1ac266' }}  >
            <Plyr ref={vid} source={source} options={options} />
        </div>
    )
}

export default VideoPlyr
