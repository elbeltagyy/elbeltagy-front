import { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

const YouTubePlayer = ({ videoId = "yJ9uZTlnYwg" }) => {
  const playerRef = useRef(null);
  const [quality, setQuality] = useState('hd720'); // Default quality

  useEffect(() => {
    const onReady = (event) => {
      const player = event.target;

      // Set initial quality
      player.setPlaybackQuality(quality);
    };

    // Plyr options
    const options = {
      autoplay: false, // Change to true if you want to autoplay
      controls: ['play', 'progress', 'current-time', 'mute', 'fullscreen'],
      onReady,
    };

    // Initialize Plyr
    playerRef.current = new Plyr(`#player`, options);

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [quality]); // Reinitialize when quality changes

  const changeQuality = (newQuality) => {
    if (playerRef.current) {
      playerRef.current.player.setPlaybackQuality(newQuality);
      setQuality(newQuality);
    }
  };

  return (
    <div>
      <div id="player" ref={playerRef} data-plyr-provider="youtube" data-plyr-embed-id={videoId}></div>
      <div>
        <label htmlFor="quality">Select Quality:</label>
        <select id="quality" value={quality} onChange={(e) => changeQuality(e.target.value)}>
          <option value="small">240p</option>
          <option value="medium">360p</option>
          <option value="large">480p</option>
          <option value="hd720">720p</option>
          <option value="hd1080">1080p</option>
          <option value="highres">1080p+ (if available)</option>
        </select>
      </div>
    </div>
  );
};

export default YouTubePlayer;
