import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import AdminGetQuestions from '../../components/questions/AdminGetQuestions'
import TabsAutoStyled from '../../style/mui/styled/TabsAutoStyled'
import GetTags from '../../components/tags/GetTags'
import { useGetAnswersCountQuery, useGetQuestionsCountQuery, useGetTagsCountQuery } from '../../toolkit/apis/statisticsApi'
import GetAnswers from '../../components/exam/GetAnswers'


function GetQuestionsPage() {

    const { data } = useGetQuestionsCountQuery()
    const { data: tagsCount } = useGetTagsCountQuery()
    const { data: answersCount } = useGetAnswersCountQuery()

    const tabs = [
        {
            label: 'بنك الاسئله', component: <AdminGetQuestions />, count: data?.values?.count ?? 'laoding'
        },
        {
            label: 'الروابط', component: <GetTags />, count: tagsCount?.values?.count ?? 'loading'
        }, {
            label: 'عرض الايجابات', component: <GetAnswers />, count: answersCount?.values?.count ?? 'loading' //<GetUserAnswers />
        },
    ]

    return (
        <Section>
            <TitleWithDividers title={'بنك الاسئله'} />
            <TabsAutoStyled originalTabs={tabs} />
        </Section>
    )
}

export default GetQuestionsPage
