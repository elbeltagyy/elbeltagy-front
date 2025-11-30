import useLazyGetData from '../../hooks/useLazyGetData'
import { lang } from '../../settings/constants/arlang'
import {  getDateWithTime } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import UserAvatar from '../users/UserAvatar'
import { useState } from 'react'

// import UpdateQuestion from './UpdateQuestion'

import TabInfo from '../ui/TabInfo'
import { useLazyGetAnswersQuery, useRemoveAnswerMutation, useUpdateAnswerMutation } from '../../toolkit/apis/answersApi'
import usePostData from '../../hooks/usePostData'
import BtnModal from '../ui/BtnModal'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { FaUsers } from 'react-icons/fa'
import AnsweredQuestion from './AnsweredQuestion'
import TitleWithDividers from '../ui/TitleWithDividers'
import { MdQuestionAnswer } from 'react-icons/md'
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

function GetUserAnswers({ filters }) {
    const { grades } = useGrades()

    const [count, setCount] = useState('loading ...')

    const [getData, status] = useLazyGetAnswersQuery()
    const [getAnswers] = useLazyGetData(getData)

    // removing Answer
    const [sendDelete, { isLoading }] = useRemoveAnswerMutation()
    const [deleteANswer] = usePostData(sendDelete)

    const deleteFc = async (id) => {
        await deleteANswer({ _id: id })
    }

    const [sendUpdate] = useUpdateAnswerMutation()
    const [updateAnswer] = usePostData(sendUpdate)

    const updateFc = async (data) => {
        await updateAnswer({ id: data._id, ...data })
        return data
    }

    const fetchFc = async (params) => {
        const res = await getAnswers({ ...params, ...filters }, false)
        const modified = res.answers.map(answer => {
            return { ...answer.question, ...answer, answer }
        })
        setCount(res.count)
        const data = { values: modified, count: res.count }
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
            field: 'title',
            headerName: 'عنوان السؤال',
            width: 200,
            filterable: true,
            sortable: false,
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
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <BtnModal
                    btnName={'عرض الايجابه'}
                    fullScreen={false}
                    component={<FlexColumn>
                        <AnsweredQuestion currentQuestion={params.row} index={0} />
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
            field: 'createdAt',
            headerName: "تاريخ الانشاء",
            type: 'date',
            width: 200,
            valueGetter: (createdAt) => new Date(createdAt),
            renderCell: (params) => {
                return <TabInfo count={getDateWithTime(params.row.createdAt)} i={1} />
            }
        }
    ]

    return (
        <Section>
            <TitleWithDividers title={'تفاصيل الايجابات'} icon={<MdQuestionAnswer size={'22px'} color={'inherit'} />} />
            <TabInfo count={count} title={'عدد الايجابات'} i={1} />
            <MeDatagrid
                type={'crud'}
                exportObj={exportObj(grades)} exportTitle={'تفاصيل الايجابات'}
                columns={columns} //reset={[reset]}
                loading={status.isLoading}
                fetchFc={fetchFc}  //deleteFc={deleteFc} updateFc={updateFc}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />
        </Section>
    )
}

export default GetUserAnswers
