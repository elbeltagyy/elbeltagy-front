import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Whatsapp from '../../components/whatsapp/Whatsapp'
import CreateReport from '../../components/reports/CreateReport'
import GetReports from '../../components/reports/GetReports'
import Separator from '../../components/ui/Separator'

function ReportsPage() {
    return (
        <Section>
            <TitleWithDividers title={'اداره التقارير'} />
            <Whatsapp />
            <Separator />
            <CreateReport />
            <br />
            <GetReports />
            <br />
        </Section>
    )
}

export default ReportsPage
