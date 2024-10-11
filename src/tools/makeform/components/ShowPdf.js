import React from 'react'

function ShowPdf({ file }) {
    console.log(file)
    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <iframe
                src={file?.url}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="iframe Viewer"
            />
        </div>
    );
}

export default ShowPdf
