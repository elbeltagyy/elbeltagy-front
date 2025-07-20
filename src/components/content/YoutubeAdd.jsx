import { useEffect } from 'react'

function YoutubeAdd({ setForbidden }) {

    useEffect(() => {
        const target = document.querySelector('.plyr');

        const customDiv = document.createElement('div');
        customDiv.className = 'fly-me';
        // customDiv.textContent = 'This is a custom child inside .plyr';

        // Append the custom div to the .plyr element
        target.appendChild(customDiv);

        const qualDiv = document.createElement('div')
        qualDiv.className = 'onqual';
        target.appendChild(qualDiv);

        //mutation
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const newStyle = mutation.target.style.cssText;
                    if (setForbidden) {
                        setForbidden(true)
                    }
                }
            });
        });

        // Observe changes to the style attribute of the target element
        if (customDiv) {
            observer.observe(customDiv, {
                attributes: true, // Watch for attribute changes

            });
        }

        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, [])
    return <></>
}

export default YoutubeAdd
