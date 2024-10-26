import { Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import YoutubePlyr from './YoutubePlyr';

const VideoYoutube = ({ url }) => {
    // let videoId = "https://www.youtube.com/embed/MlgywoV_2h0?si=3jsWB73OfFo45fVL" all
    // let videoId = "https://youtu.be/MlgywoV_2h0?si=N09QSOF7v8qPf7Xx" //not iframe
    let videoId = "https://www.youtube.com/watch?v=4FGLf4w20YY" //not iframe


    const [status, setStatus] = useState(false)
    const opts = {
        // height: '50',
        // width: '50',
        borderRadius: '15px',
        playerVars: {
            noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3,
            // https://developers.google.com/youtube/player_parameters
        },
    };


    return (
        <div style={{ borderRadius: '15px', overflow: 'hidden', color: 'green', position: 'relative', width: '100%' }}>
            <div style={{ zIndex: 2, width: '100%', maxWidth: '800px', aspectRatio: '16/9' }}>
                <ReactPlayer
                    url={url}
                    controls={true}
                    width={'100%'}
                    height={'100%'}

                    playing={status}
                    onPlay={() => setStatus(true)}
                    onPause={() => setStatus(false)}
                    // opts={opts}
                    config={{
                        youtube: {
                            playerVars: {
                                playerVars: {
                                    rel: 0, // Prevent related videos at the end
                                    modestbranding: 1, // Minimize YouTube branding
                                    showinfo: 0,
                                    disablekb: 1, // Disable keyboard controls
                                    noCookie: false, iv_load_policy: 3,

                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default VideoYoutube;
