import { useTheme } from '@mui/material'
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// <div style={{ position: 'absolute', top: 0, right: 0, width: '90px', height: '90px', backgroundColor: 'transparent' }} />

function GoogleDrive({ video, sendStatistics, course, lecture }) {
    const theme = useTheme()
    const videoId = video._id

    // [s1-10:20, s2-50-80]
    useEffect(() => {
        if (!sendStatistics) return

        let totalTime = 0;
        let watchedTime = 0;
        let currentTime = 0;

        let speed = 0
        let secondsInStock = 0

        let events = [] //forward, rewind || speed || jump
        let newMainEvent = {
            date: new Date(),
            name: 'Es',
            speed: speed,
            startTime: 0,
        }
        const statisticsId = () => {
            let sessionId = sessionStorage.getItem(videoId)
            if (sessionId) {
                return sessionId
            } else {
                sessionId = uuidv4()
                sessionStorage.setItem(videoId, sessionId)
                return sessionId
            }
        }
        //each event => name, date

        // let StartEventTime = 0
        const timeIntervals = setInterval(() => {
            totalTime++;
            if (totalTime === 100) {
                sendStatistics({
                    totalTime, watchedTime, secondsInStock, currentTime, speed: null, newMainEvent: null,
                    video: videoId, course, statisticsId: statisticsId(), lecture
                })
                totalTime = 0

            }
        }, 1000);

        return () => {
            clearInterval(timeIntervals);
        };
    }, [lecture])

    return (
        <div style={{ margin: 'auto', paddingBottom: '56.25%', position: 'relative' }}>
            <iframe
                src={video.url}
                loading="lazy"
                style={{
                    border: 0, width: '100%', height: '100%', position: 'absolute', top: 0, borderRadius: '16px', boxShadow: theme.shadows[1]
                }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen={true}>
            </iframe>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '90px', height: '90px', backgroundColor: 'transparent' }} />
        </div >
    )
}

export default GoogleDrive
