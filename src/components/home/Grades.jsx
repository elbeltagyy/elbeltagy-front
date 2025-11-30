import Section from '../../style/mui/styled/Section'
import { TextBorderWithIcons } from '../ui/TextBorderAround'
import { Box, useTheme } from '@mui/material'
import { FaSchool } from "react-icons/fa";
import Grid from "../../style/vanilla/Grid"
import CardHover from '../ui/CardHover';
import useGrades from '../../hooks/useGrades';


function Grades() {
    const theme = useTheme()
    const { grades } = useGrades()

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
                    {grades?.map((grade, i) => (
                        <CardHover key={i} img={grade.image?.url} title={grade.name} desc={grade.description} to={'/grades/' + grade.index} />
                    ))}
                </Grid>
            </Box>
        </Section>
    )
}

export default Grades
