import Section from '../../style/mui/styled/Section'
import GetSubscriptions from '../../components/subscriptions/GetSubscriptions'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Users from '../../components/all/Users'
import TabsAutoStyled from '../../style/mui/styled/TabsAutoStyled'
import { user_roles } from '../../settings/constants/roles'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'
import BtnModal from '../../components/ui/BtnModal'

function GetSubscriptionsAll() {
    const addColumns = {
        field: 'subs',
        type: 'actions',
        headerName: 'اشتراكات الطالب',
        width: 200,
        colIndex: 2,
        getActions: (params) => {
            return [
                <BtnModal
                    component={<GetSubscriptions isShowTitle user={params.row._id} userName={params.row.name + ' (' + params.row.userName + ')'} />}
                    btn={<OutLinedHoverBtn size='small' color='success'>
                        عرض الاشتراكات {params.row.courses?.length}
                    </OutLinedHoverBtn>} key={0} />
            ]
        }
    }

    const tabs = [
        {
            label: 'الاشتراكات',
            component: <GetSubscriptions />
        }, {
            label: 'الطلاب المشتركون',
            component: <Users key={1}
                addColumns={addColumns}
                filters={{ courses: '!=_split_[]', role: ['!=' + user_roles.ADMIN, '!=' + user_roles.SUBADMIN] }} />
        }, {
            label: 'الطلاب الغير مشتركين',
            component: <Users filters={{ courses: 'size_split_0', role: ['!=' + user_roles.ADMIN, '!=' + user_roles.SUBADMIN] }} />
        },]

    return (
        <Section>
            <TitleWithDividers title={'اشتراكات المنصه'} />
            <TabsAutoStyled originalTabs={tabs} />
        </Section>
    )
}

export default GetSubscriptionsAll
