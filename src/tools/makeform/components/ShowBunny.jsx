import React from 'react'

function ShowBunny({ file }) {
    const bunnyUrl = 'https://iframe.mediadelivery.net/embed/329071/' + file.url + "?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
   
    return (
        <iframe src={bunnyUrl} loading="lazy" style={{
            height: '500px', width: '100%'
        }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true">
        </iframe>
    )
}

export default ShowBunny
