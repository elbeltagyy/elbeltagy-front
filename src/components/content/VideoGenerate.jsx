setInterval(() => { debugger; }, 50);
import { useCallback, useState } from 'react'
import YoutubePlyr from './YoutubePlyr'
import { useTheme } from '@mui/material'
// import VideoPlyr from './VideoPlyr'
import filePlayers from '../../settings/constants/filePlayers'
import { useVideoOnMutation } from '../../toolkit/apis/videosStatisticsApi'
import usePostData from '../../hooks/usePostData'
import GoogleDrive from './GoogleDrive'

function VideoGenerate({ video, lecture, course }) {
    //youtube => button , iframe || bunny => iframe || server => iframe
    const theme = useTheme()
    // timer if playing, send request when 30s
    // play/pause - speed 
    const [sendData, status] = useVideoOnMutation()
    const [sendStatistics] = usePostData(sendData)

    const [isForbidden, setForbidden] = useState(false)

    const trigger = useCallback(async (values) => {
        const cloned = { ...values }
        // console.log('cloned ==>', cloned)
        await sendStatistics(cloned)
    }, []);

    // useEffect(() => {
    //     const disableRightClick = (e) => {
    //         e.preventDefault();
    //     };

    //     window.addEventListener('contextmenu', disableRightClick);
    //     window.addEventListener('keydown', disableRightClick);

    //     return () => {
    //         window.removeEventListener('contextmenu', disableRightClick);
    //         window.removeEventListener('keydown', disableRightClick);
    //     };
    // }, []);

    if (isForbidden) return <></>
    return (
        <>
            {video.player === filePlayers.YOUTUBE ? (
                // <YouTubePlayer url={video.url} />
                <YoutubePlyr setForbidden={setForbidden} url={video.url} videoId={video._id} course={course} lecture={lecture._id} sendStatistics={trigger} />
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
            ) : <GoogleDrive video={video} course={course} lecture={lecture._id} sendStatistics={trigger} />}
        </>
    )
}

export default VideoGenerate
