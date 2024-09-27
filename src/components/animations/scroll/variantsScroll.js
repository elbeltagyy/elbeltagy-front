
export const fadeIn = (dir, delay) => {
    return {
        hidden: {
            opacity: 0,
            x: dir === 'left' ? 60 : dir === 'right' ? -60 : 0,
            y: dir === 'up' ? 60 : dir === ' bottom' ? -60 : 0
        },
        visible: {
            y: 0, x: 0, opacity: 1,
            transition: {
                duration: 1.2,
                type: 'tween',
                ease: [.25, .25, .25, .75],
                delay: delay || .5
            }
        }
    }
}