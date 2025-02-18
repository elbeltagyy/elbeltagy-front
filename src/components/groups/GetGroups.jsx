import { useDeleteGroupMutation, useLazyGetGroupsQuery, useUpdateGroupMutation } from '../../toolkit/apis/groupsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'
import { lang } from '../../settings/constants/arlang'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'
import { Box } from '@mui/material'
import TabInfo from '../ui/TabInfo'


import BtnModal from '../ui/BtnModal'
import TitleWithDividers from '../ui/TitleWithDividers'
import GetGroupUsers from './GetGroupUsers'
import GetGroupNotUsers from './GetGroupNotUsers'
import GetGroupLectures from './GetGroupLectures'
import GetGroupLecturesNot from './GetGroupLecturesNot'

import { FaSchoolCircleCheck } from "react-icons/fa6";
import { green, red } from '@mui/material/colors'
import { FaSchoolCircleXmark } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";


const exportObj = {
    grade: (row) => {
        return gradeConstants.find(grade => grade.index === row.grade)?.name
    },
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    updatedAt: (row) => {
        return getDateWithTime(row.updatedAt)
    },
    payment: (row) => {
        return row.payment + ' جنيه'
    },
    price: (row) => {
        return row.price + ' جنيه'
    },
}

function GetGroups({ reset }) {

    const [getData, status] = useLazyGetGroupsQuery()
    const [getGroups] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getGroups(params, false)
        const data = { values: res.groups, count: res.count }
        return data
    }

    const [sendUpdate, updateStatus] = useUpdateGroupMutation()
    const [updateGroup] = usePostData(sendUpdate)

    const updateFc = async (data) => {
        await updateGroup({ id: data._id, ...data })
        return data
    }

    //removing subscription
    const [sendData, { isLoading }] = useDeleteGroupMutation()
    const [deleteGroup] = usePostData(sendData)
    const removeFc = async (id) => {
        await deleteGroup({ id })
    }

    const columns = [
        {
            field: "name",
            headerName: 'اسم المجموعه',
            width: 200,
            editable: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            editable: true,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
        }, {
            field: 'showDayes',
            headerName: 'dayes',
            renderCell: (params) => {
                return (
                    <Box>
                        dayes
                    </Box>
                )
            }
        }, {
            field: 'users',
            headerName: 'الاعضاء',
            width: 150,
            renderCell: (params) => {
                return <BtnModal btnName={'عرض المستخدمين'} icon={<FaUsers size={'1.2rem'} />}>
                    <TitleWithDividers title={'الاعضاء فى جروب ' + params.row?.name} />
                    <GetGroupUsers group={params.row} />
                </BtnModal>
            }
        }, {
            field: 'notUsers',
            headerName: 'الطلاب',
            width: 150,
            renderCell: (params) => {
                return <BtnModal btnName={'الغير مشتركين'} color='error' icon={<FaUserSlash size={'1.2rem'} />}>
                    <TitleWithDividers title={'الاعضاء الغير مشتركين فى جروب ' + params.row?.name} />
                    <GetGroupNotUsers group={params.row} />
                </BtnModal>
            }
        }, {
            field: 'lectures',
            headerName: 'المحاضرات',
            width: 150,
            renderCell: (params) => {
                return <BtnModal btnName={'عرض المحاضرات'} icon={<FaSchoolCircleCheck size={'1.2rem'} color={green[500]} />}>
                    <TitleWithDividers title={'عرض المحاضرات ' + params.row?.name} />
                    <GetGroupLectures group={params.row} />
                </BtnModal>
            }
        }, {
            field: 'lectureNot',
            headerName: 'محاضرات غير مضافه',
            width: 150,
            renderCell: (params) => {
                return <BtnModal btnName={' الغير مضافه'} color={'error'} icon={<FaSchoolCircleXmark size={'1.2rem'} />}>
                    <TitleWithDividers title={' الغير مضافه ' + params.row?.name} />
                    <GetGroupLecturesNot group={params.row} />
                </BtnModal>
            }
        }, {
            field: 'updatedAt',
            headerName: 'تاريخ اخر تعديل ',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.updatedAt)} i={2} />
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]
    return (
        <MeDatagrid
            type={'crud'}
            reset={[reset]}
            exportObj={exportObj} exportTitle={'المجموعات'}
            columns={columns} fetchFc={fetchFc} updateFc={updateFc} loading={status.isLoading || updateStatus.isLoading || isLoading} deleteFc={removeFc}
            editing={
                {
                    bgcolor: 'background.alt',
                    showSlots: ["density", "filter", "columns", "export"],
                    autoHeight: true, isPdf: true
                }
            }
        />
    )
}

export default GetGroups
