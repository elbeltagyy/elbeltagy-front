import React, { useEffect, useRef, useState } from 'react'
import Plyr from "plyr-react";
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
                provider: 'youtube'
            }
        ]
    }

    const options = {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['captions', 'quality', 'speed', 'loop'],

    }

    const plyrOptions = {
        settings: ["quality"], // Adds a quality setting
        quality: {
            default: 720, // Default quality level
            options: [1080, 720, 480, 360], // Available quality levels
            forced: true, // Forces manual quality setting
            onChange: (quality) => console.log(`Quality changed to: ${quality}`),
        },
    };

    return <div style={{ position: 'relative', boxShadow: theme.shadows[8], width: '100%', maxHeight: '500px !important', borderRadius: '16px', overflow: 'hidden', "--plyr-color-main": '#1ac266' }}  >
        <Plyr ref={vid} source={source} />
    </div>
}

export default YoutubePlyr

// /https://www.youtube.com/watch?v=r6HJyqxZ_qM