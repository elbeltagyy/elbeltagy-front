
function ShowIframe({ file }) {

    return (
        <iframe
            src={file.url}
            loading="lazy"
            style={{
                width: '100%',
                height: 'clamp(300px, 60vh, 800px)',
                border: 'none'
            }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
            allowFullScreen
        />
    )
}

export default ShowIframe