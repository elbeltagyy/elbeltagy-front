import React, { useEffect, useRef } from "react";
import "./Ballon.css";

const Ballons = () => {
    const BallonsContiner = useRef();

    function random(num) {
        return Math.floor(Math.random() * num);
    }

    function getRandomStyles() {
        var r = random(255);
        var g = random(255);
        var b = random(255);
        var mt = random(200);
        var ml = random(50);
        var dur = random(5) + 5;
        return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7); 
        box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite
        `;
    }
    function createBalloons(num) {
        for (var i = num; i > 0; i--) {
            var balloon = document.createElement("div");
            balloon.className = "balloon";
            balloon.style.cssText = getRandomStyles();
            BallonsContiner.current.append(balloon);
        }
    }

    function removeBalloons() {
        BallonsContiner.current.style.opacity = 0;
        setTimeout(() => {
            BallonsContiner.current.remove();
        }, 500);
    }
    useEffect(() => {
        // console.log(BallonsContiner);
        createBalloons(30);
    }, []);

    return <div id="balloon-container" onClick={removeBalloons} ref={BallonsContiner}></div>;
};

export default Ballons;
