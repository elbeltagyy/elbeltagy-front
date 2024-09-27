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

function VideoPlayer({ v, thumbnail }) {

    const theme = useTheme()
    const vid = useRef(null)

    const source = {
        type: "video",
        title: 'Example title',
        sources: [
            {
                src: v?.url,
                type: 'video/mp4',
                // provider: 'youtube'
            },
        ],
        poster: thumbnail,
        // previewThumbnails: {
        //     src: '/assets/3rd.jpg',
        // },
    }

    const options = {
        enabled: true, //check is user valid
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['captions', 'quality', 'speed', 'loop'],
        autoplay: false,
        autopause: true,
        clickToPlay: true,
        tooltips: { controls: true, seek: true },
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] },
        quality: { default: 360, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
        youtube: { noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 },
        seekTime: 10,
        // previewThumbnails: { enabled: true, src: '/assets/3rd.jpg' },
        keyboard: { focused: true, global: true }
        // mediaMetadata: { title: '', artist: '', album: '', artwork: [] }
        // duration: 500
    }

    return <>
        <div style={{ boxShadow: theme.shadows[8], width: '100%', maxHeight: '500px !important', borderRadius: '16px', overflow: 'hidden', "--plyr-color-main": '#1ac266' }}  >
            <Plyr ref={vid} source={source} options={options} onPause={(e) => console.log(e)} />
        </div>
    </>
}

export default VideoPlayer

// /https://www.youtube.com/watch?v=r6HJyqxZ_qM