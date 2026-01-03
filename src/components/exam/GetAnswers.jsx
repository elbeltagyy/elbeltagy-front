import FullComponent from '../../tools/datagrid/FullComponent'
import { useLazyGetAnswersQuery, useRemoveAnswerMutation, useUpdateAnswerMutation } from '../../toolkit/apis/answersApi'
import { lang } from '../../settings/constants/arlang'
import UserAvatar from '../users/UserAvatar'
import BtnModal from '../ui/BtnModal'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import AnsweredQuestion from './AnsweredQuestion'
import { FaUsers } from 'react-icons/fa'
import TabInfo from '../ui/TabInfo'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'

import { useState } from 'react'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import useGrades from '../../hooks/useGrades'


const exportObj = (grades) => ({
    grade: (row) => {
        return grades.find(grade => grade.index === row.grade)?.name
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    updatedAt: (row) => {
        return getDateWithTime(row.updatedAt)
    },
    name: (row) => {
        return row.user.name
    },
    userName: (row) => {
        return row.user.userName
    },
    isCorrect: (row) => {
        return row.isCorrect ? 'صحيحه' : 'خاطئه'
    },
    isHighlighted: (row) => {
        return row.isHighlighted ? 'محفوظه' : 'غير محفوظه'
    }
})


function GetAnswers() {
    const { grades } = useGrades()

    const [reset, setReset] = useState(false)

    const fetchFc = (res) => {
        const modified = res.answers.map(answer => {
            return { ...answer.question, ...answer, answer, user: answer.user }
        })
        const data = { answers: modified, count: res.count }
        return data
    }

    const columns = [
        {
            field: "image",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar url={params.row?.image?.url} />
            }
        }, {
            field: 'name',
            headerName: 'اسم الطالب',
            width: 200,
            filterable: true,
            sortable: false,
            valueGetter: (v, row) => {
                return row?.user?.name
            }
        }, {
            field: 'userName',
            headerName: 'اسم المستخدم',
            width: 200,
            filterable: true,
            sortable: false,
            valueGetter: (v, row) => row?.user?.userName
        }, {
            field: 'title',
            headerName: 'عنوان السؤال',
            width: 200,
            filterable: true,
            sortable: false,
            renderCell: (params) => {
                return <span dangerouslySetInnerHTML={{ __html: params?.row?.title }} />
            }
        }, {
            field: 'hints',
            headerName: "ملاحظات",
            width: 150,
            filterable: false,
            sortable: false,
        }, {
            field: 'show',
            headerName: "عرض السؤال",
            width: 150,
            type: 'actions',
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <BtnModal
                    btnName={'عرض الايجابه'}
                    fullScreen={false}
                    component={<FlexColumn>
                        <AnsweredQuestion setQuestion={() => {
                            setReset(prev => !prev)
                        }} currentQuestion={params.row} index={0} />
                    </FlexColumn>}
                    icon={<FaUsers size={'1.2rem'} />} />
            }
        }, {
            field: 'mark',
            headerName: "درجتك",
            type: 'number',
            renderCell: (params) => {
                return <TabInfo count={params.row.mark + '/' + params.row.points} i={params.row.isCorrect ? 1 : 3} />
            }
        }, {
            field: 'isCorrect',
            headerName: "ايجابه صحيحه",
            type: "boolean",
            width: 150,
            renderCell: (params) => {
                return <TabInfo count={params.row.isCorrect ? 'صحيحه' : 'خاطئه'} i={params.row.isCorrect ? 1 : 3} />
            }
        }, {
            field: 'isHighlighted',
            headerName: "حفظ السؤال",
            type: "boolean",
            width: 150,
            editable: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            filterable: false,
            sortable: false,
            valueOptions: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
        }, {
            field: 'createdAt',
            headerName: "تاريخ الانشاء",
            type: 'date',
            width: 200,
            valueGetter: (createdAt) => new Date(createdAt),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        }
    ]

    const data = {
        useFetch: useLazyGetAnswersQuery, fetchFilters: { populate: 'question user' },
        resKey: 'answers',
        fetchFc,
        useUpdate: useUpdateAnswerMutation,
        useDelete: useRemoveAnswerMutation,
        columns, reset, exportObj: exportObj(grades), exportTitle: 'تقرير الاجابات'
    }

    return (
        <FullComponent data={data} />
    )
}

export default GetAnswers
