import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css'; // Import Plyr CSS

const YouTubePlayer = () => {
  const [player, setPlayer] = useState(null); // YouTube player instance
  const [quality, setQuality] = useState('hd1080'); // Default quality
  const [currentQuality, setCurrentQuality] = useState(''); // Current quality status
  const plyrRef = useRef(null); // Plyr instance

  const videoId = 'UUQsWiaibBc'; // Replace with your YouTube video ID

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player('youtube-iframe', {
        videoId: videoId,
        events: {
          onReady: (event) => {
            console.log('state event ==>', window.YT)
            setPlayer(event.target);
            updateCurrentQuality(event.target); // Get initial quality
          },
          onStateChange: (event) => {
            // Update quality when the video starts playing
            if (event.data === window.YT.PlayerState.PLAYING) {
              updateCurrentQuality(event.target);
            }
          },
          onPlaybackQualityChange: (event) => {
            // Update quality when the playback quality changes
            console.log('quality change  hheegeheheh==>', event.target)
            updateCurrentQuality(event.target);
          },
        },
      });
    };
  }, [videoId]);

  // Function to update the current quality status
  const updateCurrentQuality = (player) => {
    if (player && player.getPlaybackQuality) {
      const quality = player.getPlaybackQuality();
      setCurrentQuality(quality);
      console.log('Current quality:', quality);
    }
  };

  // Function to change quality
  const changeQuality = (newQuality) => {
    console.log('Changing quality to:', newQuality);
    if (player && player.setPlaybackQuality) {

      // Set the new quality
      player.setPlaybackQuality(newQuality);

      // Update the quality state
      setQuality(newQuality);

      // Update the current quality status
      updateCurrentQuality(player);

      console.log('Quality changed to:', newQuality);
    } else {
      console.error('Player is not initialized or setPlaybackQuality is not available');
    }
  };

  // Add custom quality control to Plyr
  useEffect(() => {
    if (plyrRef.current && player) {
      const plyr = plyrRef.current.plyr;

      // Wait for Plyr to be fully ready
      plyr.on('ready', () => {
        // Create a custom quality button
        const qualityButton = document.createElement('button');
        qualityButton.className = 'plyr__controls__item plyr__control';
        qualityButton.innerHTML = `Quality: ${currentQuality || quality}`;
        qualityButton.style.marginLeft = '10px'; // Add some styling
        qualityButton.addEventListener('click', () => {
          // Toggle quality options (example: 1080p, 720p, 480p, 360p, auto)
          const newQuality =
            quality === 'hd1080'
              ? 'hd720'
              : quality === 'hd720'
                ? 'large'
                : quality === 'large'
                  ? 'medium'
                  : 'hd1080';
          changeQuality(newQuality);
        });

        // Add the button to Plyr's controls
        const controls = plyr.elements.controls;
        if (controls) {
          controls.appendChild(qualityButton);
        } else {
          console.error('Plyr controls container not found!');
        }
      });
    }
  }, [player, quality, currentQuality]);

  return (
    <div>
      {/* Plyr player */}
      <Plyr
        ref={plyrRef}
        source={{
          type: 'video',
          sources: [
            {
              src: videoId,
              provider: 'youtube',
            },
          ],
        }}
        options={{
          youtube: {
            controls: 1, // Show YouTube's native controls
            modestbranding: 1, // Hide YouTube logo
            iv_load_policy: 3, // Hide annotations
          },
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen',
          ],
        }}
      />

      {/* Quality change buttons */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => changeQuality('medium')}>360p</button>
        <button onClick={() => changeQuality('large')}>480p</button>
        <button onClick={() => changeQuality('hd720')}>720p</button>
        <button onClick={() => changeQuality('hd1080')}>1080p</button>
        <button onClick={() => changeQuality('auto')}>Auto</button>
        <button onClick={() => changeQuality('tiny')}>144p</button>
        <button onClick={() => changeQuality('small')}>240p</button>
      </div>

      {/* Display current quality */}
      <div style={{ marginTop: '10px' }}>
        <strong>Current Quality:</strong> {currentQuality || 'Unknown'}
      </div>

      {/* YouTube IFrame (hidden) */}
      <div id="youtube-iframe" style={{ display: 'none' }}></div>
    </div>
  );
};

export default YouTubePlayer;