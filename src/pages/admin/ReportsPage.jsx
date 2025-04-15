import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Whatsapp from '../../components/whatsapp/Whatsapp'
import CreateReport from '../../components/reports/CreateReport'
import GetReports from '../../components/reports/GetReports'
import Separator from '../../components/ui/Separator'
import { useSearchParams } from 'react-router-dom'

import CourseName from '../../components/content/CourseName'

function ReportsPage() {
    const [searchParams] = useSearchParams();
    const course = searchParams.get('course')

    return (
        <Section>
            <TitleWithDividers title={'اداره التقارير'}>
                {course && (
                    <CourseName course={course} title={'اسم الكورس : '} />
                )}

            </TitleWithDividers>
            <Whatsapp />
            <Separator />
            <CreateReport course={course}/>
            <br />
            <GetReports course={course} />
            <br />
        </Section>
    )
}

export default ReportsPage
