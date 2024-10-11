import React, { useEffect } from 'react'
import VideoYoutube from './VideoYoutube'
import YoutubePlyr from './YoutubePlyr'
import ReactPlayer from 'react-player'
import { useTheme } from '@mui/material'
import videoPlayers from '../../settings/constants/videoPlayers'
import VideoPlyr from './VideoPlyr'

function VideoGenerate({ video }) {

    //youtube => button , iframe || bunny => iframe || server => iframe
    const theme = useTheme()
    return (
        <>
            {video.player === videoPlayers.YOUTUBE ? (
                // <VideoYoutube url={video?.url} />
                <YoutubePlyr url={video.url} />
            ) : video.player === videoPlayers.BUNNY || video.player === videoPlayers.BUNNY_UPLOAD ? (
                <div style={{ margin: 'auto', paddingBottom: '56.25%', position: 'relative' }}>
                    <iframe
                        src={video.url + '?autoplay=false&loop=false&muted=false&preload=true&responsive=true'}
                        loading="lazy"
                        frameBorder={0}
                        style={{
                            border: 0, width: '100%', height: '100%', position: 'absolute', top: 0, borderRadius: '16px', boxShadow: theme.shadows[1]
                        }}
                        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen={true}>
                    </iframe>
                </div >
            ) : (
                <VideoPlyr url={video.url} />
            )}
        </>
    )
}

export default VideoGenerate
