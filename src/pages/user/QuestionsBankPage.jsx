import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Section from '../../style/mui/styled/Section'
import UserQuestionsBank from '../../components/questions/UserQuestionsBank'
import { PiBankBold } from "react-icons/pi";
import GradesTabs from '../../components/grades/GradesTabs';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function QuestionsBankPage() {
    const user = useSelector(s => s.global.user)
    const [grade, setGrade] = useState(Number(user?.grade))

    return (
        <Section>
            <TitleWithDividers
                title={'بنك الاسئله'}
                icon={<PiBankBold size={'40px'} color={'inherit'} />}
                desc='اختار العناوين التى من خلالها ستظهر الاسئله الخاصه بها ثم حدد عدد الاسئله التى تريد الاختبار عليها' />
            <GradesTabs removeAll grade={grade} setGrade={setGrade} />
            <UserQuestionsBank grade={grade} />
        </Section>
    )
}

export default QuestionsBankPage
