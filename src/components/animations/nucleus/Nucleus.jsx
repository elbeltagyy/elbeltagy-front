import React from 'react'
import './nucleus.css'

function Nucleus() {
    return (
        <div id="atom">
            <div id="nucleus">
                <div style={{ display: 'flex' }}>
                    <div className="particle p" ></div>
                    <div className="particle n" ></div>
                </div>
                <div style={{ display: 'flex', marginTop: '-0.6em' }}>
                    <div className="particle n" ></div>
                    <div className="particle p"></div>
                </div>
            </div>
            <div className="right orbit"></div>
            <div className="left orbit"></div>
        </div>
    )
}

export default Nucleus
