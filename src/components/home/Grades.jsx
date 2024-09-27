import React from 'react'
import Section from '../../style/mui/styled/Section'
import { TextBorderWithIcons } from '../ui/TextBorderAround'
import { Box, useTheme } from '@mui/material'
import { FaSchool } from "react-icons/fa";
import Grid from "../../style/vanilla/Grid"
import CardHover from '../ui/CardHover';

function Grades() {
    const theme = useTheme()

    return (
        <Section>
            <TextBorderWithIcons
                title='السنوات الدراسيه'
                color={theme.palette.neutral[0]}
                colorOne={theme.palette.primary.main}
                endIcon={<FaSchool size={'1.5rem'} />}
            />
            <Box>
                <Grid>
                    <CardHover img={'/assets/science.jpg'} title={'العلوم المتكامله'} desc={'كورسات و شروحات على كل درس'} />
                    <CardHover img={'/assets/geo.jpg'} title={'الجيولوحيا للصف الثالث الثانوى'} desc={'كورسات و شروحات على كل درس'} />
                </Grid>
            </Box>
        </Section>
    )
}

export default Grades
