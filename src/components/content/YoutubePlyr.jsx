import React, { useEffect, useRef, useState } from 'react'
import Plyr, { usePlyr } from "plyr-react";
import "plyr-react/plyr.css";
import { useTheme } from '@mui/material';

const videoSrc = {
    type: "video",
    title: 'Example title',
    sources: [
        {
            src: 'https://www.youtube.com/watch?v=r6HJyqxZ_qM',
            provider: 'youtube'
        },
    ],
};


const plyrProps = {
    sources: [
        {
            src: 'https://www.youtube.com/watch?v=r6HJyqxZ_qM',
            provider: 'youtube'
        },
    ], // https://github.com/sampotts/plyr#the-source-setter
    options: undefined, // https://github.com/sampotts/plyr#options
    // Direct props for inner video tag (mdn.io/video)
}

function YoutubePlyr({ url }) {

    const theme = useTheme()
    const vid = useRef(null)

    const source = {
        type: "video",
        title: 'Example title',
        sources: [
            {
                src: url,
                // type: 'video/mp4',
                provider: 'youtube'
            },
        ],
        // previewThumbnails: {
        //     src: '/assets/3rd.jpg',
        // },
    }

    const options = {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['captions', 'quality', 'speed', 'loop'],

    }
   
    return <div style={{ position: 'relative', boxShadow: theme.shadows[8], width: '100%', maxHeight: '500px !important', borderRadius: '16px', overflow: 'hidden', "--plyr-color-main": '#1ac266' }}  >
        <Plyr ref={vid} source={source} options={options} onPause={(e) => console.log(e)} />
    </div>
}

export default YoutubePlyr

// /https://www.youtube.com/watch?v=r6HJyqxZ_qM