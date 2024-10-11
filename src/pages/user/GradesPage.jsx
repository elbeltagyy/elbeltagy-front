import TitleSection from '../../components/ui/TitleSection'
import { lang } from '../../settings/constants/arlang'
import Section from '../../style/mui/styled/Section'
import GradesList from '../../components/content/GradesList'

function GradesPage() {
  return (
    <Section>
      <TitleSection title={lang.GRADES} />
      <GradesList />
    </Section>
  )
}

export default GradesPage
