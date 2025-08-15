import { useState } from "react"
import CreateFeedBack from "../../components/feedBacks/CreateFeedBack"
import TabInfo from "../../components/ui/TabInfo"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import { getDateWithTime, getFullDate } from "../../settings/constants/dateConstants"
import RatingStyled from "../../style/mui/styled/RatingStyled"
import Section from "../../style/mui/styled/Section"
import { useUpdateFeedBackMutation } from "../../toolkit/apis/feedBackApi"
import { useDeleteFeedBackMutation } from "../../toolkit/apis/feedBackApi"
import { useLazyGetFeedBacksQuery } from "../../toolkit/apis/feedBackApi"
import FullComponent from "../../tools/datagrid/FullComponent"


const exportObj = {
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    updatedAt: (row) => {
        return getDateWithTime(row.updatedAt)
    },
}
function FeedBacks({ isAdmin }) {
    const [reset, setReset] = useState(false)
    const columns = [
        {
            field: "subject",
            headerName: 'العنوان',
            width: 200,
        }, {
            field: "description",
            headerName: 'الوصف',
        }, {
            field: "type",
            headerName: 'النوع',
            type: 'singleSelect',
            valueOptions: ['شكوى', 'اقتراح']
        }, {
            field: "rating",
            headerName: 'التقييم',
            type: 'number',
            width: 150,
            renderCell: (params) => {
                return <RatingStyled value={params.row.rating} readOnly={true} />
            }
        },
        {
            field: 'updatedAt',
            headerName: 'تاريخ اخر تعديل ',
            width: 200,
            type: 'date',
            valueGetter: (updatedAt) => new Date(updatedAt),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.updatedAt)} i={2} />
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            type: 'date',
            valueGetter: (createdAt) => new Date(createdAt),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    if (isAdmin) {
        columns.splice(0, 0, {
            field: "name",
            headerName: 'اسم الطالب',
            width: 200,
            valueGetter: (user, row) => row.user?.name,

        }, {
            field: "userName",
            headerName: 'اسم المستخدم',
            width: 200,
            valueGetter: (user, row) => row.user?.userName,

        });
    }
    return (
        <Section>
            <TitleWithDividers title={'شكاوى و الاقتراحات'} />
            <CreateFeedBack setReset={setReset} />
            <FullComponent
                data={{
                    useFetch: useLazyGetFeedBacksQuery,
                    // useUpdate: useUpdateFeedBackMutation,
                    useDelete: useDeleteFeedBackMutation,
                    resKey: 'feedBacks', columns, reset, exportObj, exportTitle: 'الاقتراحات ',
                    fetchFilters: isAdmin && { populate: 'user' }
                }}
            />
        </Section>
    )
}

export default FeedBacks
