import { Box, Typography, useTheme } from "@mui/material"
import Section from "../../style/mui/styled/Section"
import { FlexBetween } from "../../style/mui/styled/Flexbox"
import CardInfo from "../../style/mui/components/CardInfo"
import Grid from "../../style/vanilla/Grid"
import AnimatedCell from "./AnimatedCell"
import Nucleus from "../animations/nucleus/Nucleus"


const services = [
    {
        icon: '/assets/maps.png',
        desc: 'المستر يجمع لك الأفكار والمعلومات المهمة بشكل رسومات وخرائط ذهنية تساعدك على تثبيت المعلومات في دماغك أسرع وأكثر فاعلية من أي طريقة أخرى.',
        caption: 'خرائط ذهنية',
        next: '/assets/brian.svg'
    },
    {
        icon: '/assets/diploma.png',
        desc: 'المستر مخرج أوائل، هيعرفك أسرار التركيز ويقدم لك ملخصات شاملة تحتوي كل الأفكار الضرورية لتضمن أعلى درجاتك في الامتحان بإذن الله.',
        caption: 'سر الخلطة',
        next: '/assets/research.svg'
    },
    {
        icon: '/assets/baltg-icon1.webp',
        desc: 'أكثر من 1000 سؤال على المناهج يمكنك الرجوع إليها في أي وقت، مع حفظ إجاباتك لتتمكن من مراجعتها وتحليل أدائك بسهولة.',
        caption: 'بنك أسئلة',
        next: '/assets/skeleton.svg'
    },
    {
        icon: '/assets/baltg-icon2.webp',
        desc: 'المستر معاك على مدار الساعة، بيقدملك دعم كامل من الدعم الفني إلى الدعم العلمي والنفسي ,يعن المستر معاك في كل اللي تحتاجه بسهولة وسرعة.',
        caption: 'دعم فني وعلمي',
        next: '/assets/corona.svg'
    }
]
function Services2() {
    const theme = useTheme()
    return (
        <Section sx={{ minHeight: '100vh', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: '60%', left: '80%', width: '500px', height: '500px', zIndex: -1 }}>
                <AnimatedCell />
            </Box>

            <Typography variant="banner" component={'h1'} textAlign={'center'}>ليه تختار عمو <span style={{ color: theme.palette.primary.light }}>البلتاجي ؟</span> </Typography>
            <FlexBetween sx={{ justifyContent: 'space-evenly', flexWrap: 'wrap-reverse', gap: 4 }}>
                <Box sx={{
                    position: 'relative', '--scale': 1, maxHeight: '80vh', width: '100%', maxWidth: '300px',
                    '&:hover img': {
                        filter: 'saturate(140%) !important', '--scale': ' 1.08 !important', '--scale-sm': '.9 !important'
                    }
                }}>

                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, bgcolor: 'red',
                        width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', borderRadius: '22px',
                        // border: '1px solid', borderColor: 'primary.dark'
                    }}>
                        <img
                            src={"/assets/bg-services.webp"}
                            style={{
                                verticalAlign: 'bottom',
                                position: 'absolute', bottom: '0', height: '100%',
                                transition: '.3s ease all', transform: 'scaleX(var(--scale)) scaleY(var(--scale))', zIndex: 7,
                            }} />
                    </Box>
                    <img
                        src={'/assets/baltg-tall.webp'}
                        style={{
                            transition: '.3s ease all', objectFit: 'cover',
                            transformOrigin: 'bottom', width: '80%',
                            transform: 'translateX(-12.5%) scaleX(var(--scale)) scaleY(var(--scale))',
                            verticalAlign: 'bottom',
                            // filter: 'drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.3))'
                        }} />
                </Box>

                <Box flex={1} sx={{ maxWidth: '800px', position: 'relative', }}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)', opacity: .1 }}>
                        <Nucleus />
                    </Box>

                    <Grid gap={2}>
                        {services.map((service, i) => (
                            <CardInfo
                                sx={{
                                    width: '100%', maxWidth: '300px', overflow: 'hidden',
                                    border: '1px solid ,0 ,0 ,0', borderColor: 'primary.light',
                                    bgcolor: 'white',
                                    // border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    position: 'relative',
                                    padding: '16px 22px',
                                    // boxShadow: theme.shadows[3],
                                    mt: '10px',
                                    color: 'grey.1000',

                                    // Icon: visible by default, slides left + fades on hover
                                    '& .icon-wrapper': {
                                        transition: 'transform 0.35s ease, opacity 0.35s ease',
                                        transform: 'translateX(0)',
                                        opacity: 1,
                                        zIndex: 1,
                                        position: 'relative',
                                    },
                                    '&:hover .icon-wrapper': {
                                        transform: 'translateX(-40px)',
                                        opacity: 0,
                                    },

                                    // nextComponent: hidden by default, fades in on hover
                                    '&:hover .next-wrapper': {
                                        opacity: 1,
                                        top: '10%', right: '50%', transform: 'translateX(50%)',
                                    },
                                }}
                                nextComponent={<Box className='next-wrapper' sx={{ position: 'absolute', top: '0', right: '60%', opacity: .2, zIndex: 0, transition: 'all 0.35s ease 0.1s', }}>
                                    <img src={service.next} />
                                </Box>} key={i}
                                icon={<img className="icon-wrapper" src={service.icon} style={{ width: '160px', zIndex: 1, position: 'relative' }} />}
                                desc={service.desc}
                                caption={<Typography variant="subtitle1" fontFamily={'second'}>{service.caption}</Typography>} />
                        ))}
                    </Grid>
                </Box>
            </FlexBetween>
        </Section>
    )
}

export default Services2