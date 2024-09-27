import React from 'react'
import './Battery.css'
function Battery({ children, delay = '' }) {

    return (
        <div className={'battery ' + delay}>
            {children}
        </div>
    )
}

export default Battery
