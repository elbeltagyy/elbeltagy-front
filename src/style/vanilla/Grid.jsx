import React from 'react'

function Grid({ children, gap = '30px', min = '300px' }) {


    return (
        <div style={{
            display: 'grid', gridTemplateColumns: `repeat(${'auto-fit'}, minmax(${min}, 1fr))`, gap: gap, justifyItems: 'center', alignContent: 'center'
        }}>
            {children}
        </div>
    )
}

export default Grid
