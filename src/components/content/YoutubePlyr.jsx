import { memo, useEffect, useRef, } from 'react'
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import YoutubeAdd from './YoutubeAdd';

const options = {
    controls: [
        'rewind',     // Adds a back 10 seconds button
        'play-large',
        'play',
        'fast-forward', // Adds a forward 10 seconds button
        'progress',
        'current-time',
        'mute',
        // 'volume',
        'settings',
        'fullscreen'
    ],
    // controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
    settings: ['captions', 'quality', 'speed', 'loop'],
    tooltips: { controls: true },
    youtube: { controls: 1, fs: 0, rel: 0, noCookie: false, showinfo: 0, iv_load_policy: 3, modestbranding: 1, hl: 'ar' }
}

const createElement = (user = null) => {
    // Select target element
    const target = document.querySelector('.plyr');


    // Create a floating "after" element

    const afterElement = document.createElement('div');

    // Set properties to mimic ::after
    afterElement.style.position = 'absolute';
    afterElement.style.top = '50px';
    // afterElement.style.left = '10px';
    afterElement.style.color = 'red';
    afterElement.style.pointerEvents = 'none';
    afterElement.style.backgroundColor = 'transparent';

    // Add custom animation or styling as needed
    afterElement.style.animation = 'floatUpDown 60s linear infinite';

    // Append the element inside the target container
    target.style.position = 'relative'; // Ensure parent has relative positioning

    if (user) {
        let value = ''
        value = '"' + user.userName + '"'
        document.documentElement.style.setProperty('--main-userName', `${value}`)
        afterElement.innerText = user.userName;

        target.appendChild(afterElement);
    }
}

function YoutubePlyr({ url, videoId, course, lecture, sendStatistics, setForbidden }) {

    const theme = useTheme()
    const vid = useRef(null)
    const plyrContainer = useRef()

    const source = {
        type: "video",
        title: 'Example title',
        sources: [
            {
                src: 'blob:' + url, //'blob:' +
                provider: 'youtube'
            }
        ]
    }

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
            // console.log(getDateWithTime(vid.current.plyr.lastSeekTime))
            totalTime++;
            currentTime = Math.round(vid.current.plyr.currentTime);

            if ((watchedTime) === 25) {
                sendStatistics({
                    totalTime, watchedTime, secondsInStock, currentTime, speed, newMainEvent,
                    video: videoId, course, statisticsId: statisticsId(), lecture
                })

                totalTime = 0
                watchedTime = 0
                secondsInStock = 0
                events = []
                newMainEvent = null
                //End Sending ==> 
            }

            if (vid.current.plyr.playing) {
                watchedTime++;
            }

            if (vid.current.plyr.speed !== speed) { // check not alot
                // in backend if speed !== currentSpeed = add new array 

                speed = vid.current.plyr.speed
                secondsInStock += watchedTime
                watchedTime = 0

                newMainEvent = {
                    date: new Date(),
                    name: 'Es',
                    speed: vid.current.plyr.speed,
                    startTime: currentTime || 0,
                }
            }
        }, 1000);

        return () => {
            clearInterval(timeIntervals);
        };
    }, [lecture])

    useEffect(() => {
        const disableRightClick = (e) => {
            e.preventDefault();
        };

        window.addEventListener('contextmenu', disableRightClick);
        window.addEventListener('keydown', disableRightClick);

        return () => {
            window.removeEventListener('contextmenu', disableRightClick);
            window.removeEventListener('keydown', disableRightClick);
        };
    }, []);

    return <div ref={plyrContainer} style={{ position: 'relative', boxShadow: theme.shadows[8], width: '100%', maxHeight: '500px !important', borderRadius: '16px', overflow: 'hidden', "--plyr-color-main": '#1ac266' }}  >
        <Plyr ref={vid} source={source} options={options} />
        {vid && (
            <YoutubeAdd setForbidden={setForbidden} />
        )}
        {/* {window.innerWidth > 1200 ? 'true' : 'false'}, {window.innerWidth} */}
    </div>
}

export default memo(YoutubePlyr)

// /https://www.youtube.com/watch?v=r6HJyqxZ_qM