function ShowPdf({ file }) {
    
    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <iframe
                src={file?.url}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="PDF Viewer"
            />
        </div>
    );
}

export default ShowPdf
