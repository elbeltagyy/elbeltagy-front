import React, { useEffect } from 'react'
import "./dna.css"

function DnaAnimation({ circleColor, borderColor }) {

    useEffect(() => {
        const root = document.querySelector(":root")
        root.style.setProperty("--circleColor", circleColor || "red")
        root.style.setProperty("--borderColor", borderColor || 'orange')
        // console.log(root)
    }, [circleColor, borderColor])
    return (
        <div id="dna" style={{ color: 'orange' }}>
            <div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}

export default DnaAnimation
