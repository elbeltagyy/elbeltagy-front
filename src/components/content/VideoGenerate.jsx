import React, { useEffect } from 'react'
import VideoYoutube from './VideoYoutube'
import YoutubePlyr from './YoutubePlyr'
import { useTheme } from '@mui/material'
// import VideoPlyr from './VideoPlyr'
import filePlayers from '../../settings/constants/filePlayers'
// import YouTubePlayer from './YoutubeQuality'



function VideoGenerate({ video }) {

    //youtube => button , iframe || bunny => iframe || server => iframe
    const theme = useTheme()
    return (
        <>
            {video.player === filePlayers.YOUTUBE ? (
                // <VideoYoutube url={video?.url} />
                // <YouTubePlayer  />
                <YoutubePlyr url={video.url} />
            ) : video.player === filePlayers.BUNNY || video.player === filePlayers.BUNNY_UPLOAD ? (
                <div style={{ margin: 'auto', paddingBottom: '56.25%', position: 'relative' }}>
                    <iframe
                        src={'https://iframe.mediadelivery.net/embed/329071/' + video.url + '?autoplay=false&loop=false&muted=false&preload=true&responsive=true'}
                        loading="lazy"
                        frameBorder={0}
                        style={{
                            border: 0, width: '100%', height: '100%', position: 'absolute', top: 0, borderRadius: '16px', boxShadow: theme.shadows[1]
                        }}
                        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen={true}>
                    </iframe>
                </div >
            ) : (
                <YoutubePlyr url={video.url} />
            )}
        </>
    )
}

export default VideoGenerate
