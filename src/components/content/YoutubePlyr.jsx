import { useRef, } from 'react'
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useTheme } from '@mui/material';

function YoutubePlyr({ url }) {

    const theme = useTheme()
    const vid = useRef(null)
    const plyrContainer = useRef()

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
        controls: [
            'rewind',     // Adds a back 10 seconds button
            'play-large',
            'play',
            'fast-forward', // Adds a forward 10 seconds button
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen'
          ],
        // controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (vid.current?.plyr?.embed) {
    //             const ytPlayer = vid.current.plyr.embed;
    //             if (ytPlayer && ytPlayer.setPlaybackQuality) {
    //                 ytPlayer.setPlaybackQuality("large"); // "large" corresponds to 480p
    //                 clearInterval(interval); // Stop checking after setting quality
    //             }
    //         }
    //     }, 500);

    //     return () => clearInterval(interval); // Clear interval on component unmount
    // }, []);

    // const skipForward = () => {
    //     const player = vid.current.plyr;
    //     player.currentTime = Math.min(player.duration, player.currentTime + 10);
    // };

    // Function to skip backward 10 seconds
    // const skipBackward = () => {
    //     const player = vid.current.plyr;
    //     player.currentTime = Math.max(0, player.currentTime - 10);
    // };
    // const seek = (e) => {
    //     const rect = plyrContainer.current.getBoundingClientRect();
    //     const mouseOnDiv = e.clientX - rect.x;
    //     if (mouseOnDiv >= rect.width / 2) {
    //         vid.current.plyr.forward();
    //     } else {
    //         vid.current.plyr.rewind();
    //     }
    // };

    return <div ref={plyrContainer} style={{ position: 'relative', boxShadow: theme.shadows[8], width: '100%', maxHeight: '500px !important', borderRadius: '16px', overflow: 'hidden', "--plyr-color-main": '#1ac266' }}  >
        <Plyr ref={vid} source={source} options={options} />
    </div>
}

export default YoutubePlyr

// /https://www.youtube.com/watch?v=r6HJyqxZ_qM