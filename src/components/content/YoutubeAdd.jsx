import { useEffect } from 'react'

function YoutubeAdd() {

    useEffect(() => {
        const target = document.querySelector('.plyr');

        const customDiv = document.createElement('div');
        customDiv.className = 'fly-me';
        // customDiv.textContent = 'This is a custom child inside .plyr';

        // Append the custom div to the .plyr element
        target.appendChild(customDiv);
    }, [])
}

export default YoutubeAdd
