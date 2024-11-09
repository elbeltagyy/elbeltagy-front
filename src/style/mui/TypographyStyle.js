export const typographies = {

    fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Rubik", sans-serif',
    body1: { fontSize: '.85rem', fontWeight: 500, lineHeight: 1.5 },
    body2: { fontSize: '0.8', fontWeight: 400, lineHeight: 1.57 },
    button: { fontWeight: 500 },
    caption: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.66 },
    subtitle1: {
        fontSize: '1rem', fontWeight: 700, lineHeight: 1.66, '@media (max-width:600px)': {
            fontSize: '0.9rem',
        },
    },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.57, },
    overline: {
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.5px',
        // lineHeight: 2.5,
        // textTransform: 'uppercase',
    },
    banner: {

        fontSize: '3.5rem',
        fontWeight: 700,
        '@media (max-width:600px)': {
            fontSize: '2.8rem',
        },
        textShadow: '0 20px 30px hsla(0, 0%, 0%, 0.1)',
        fontFamily: '"Changa", sans-serif'
    }, subBanner: {
        fontSize: '1.8rem',
        fontWeight: 600,

        letterSpacing: 1.8,
        '@media (max-width:600px)': {
            fontSize: '1.5rem',
        },
        textShadow: '0 20px 30px hsla(0, 0%, 0%, 0.1)'
    },
    h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
    },
    h2: { fontSize: '3rem', fontWeight: 700, },
    h3: { fontSize: '2.25rem', fontWeight: 500, },
    h4: { fontSize: '2rem', fontWeight: 500, },
    h5: { fontSize: '1.5rem', fontWeight: 500, },
    h6: { fontSize: '1.125rem', fontWeight: 600, },
} 