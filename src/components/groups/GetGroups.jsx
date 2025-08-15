import { useAddUserToGroupMutation, useDeleteGroupMutation, useLazyGetGroupsQuery, useRemoveUserFromGroupMutation, useUpdateGroupMutation } from '../../toolkit/apis/groupsApi'
import { formatTime, getDateWithTime, getDay, getFullDate } from '../../settings/constants/dateConstants'
import { lang } from '../../settings/constants/arlang'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'
import { Box, IconButton } from '@mui/material'
import TabInfo from '../ui/TabInfo'


import BtnModal from '../ui/BtnModal'

import { FaSchoolCircleCheck } from "react-icons/fa6";
import { FaSchoolCircleXmark } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa";
import Users from '../all/Users'
import FullComponent from '../../tools/datagrid/FullComponent'
import usePostData from '../../hooks/usePostData'
import Lectures from '../all/Lectures'
import { useAddToLecturesMutation, useRemoveFromLecturesMutation } from '../../toolkit/apis/lecturesApi'

import { IoIosAddCircleOutline } from "react-icons/io";
import BtnConfirm from '../ui/BtnConfirm'
import Section from '../../style/mui/styled/Section'
import UpdateGroup from './UpdateGroup'

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

const ViewRow = ({ row }) => <UpdateGroup group={row} />;

function GetGroups({ reset, setReset }) {

    const [deleteData, removeStatus] = useRemoveUserFromGroupMutation()
    const [removeUserFromGroup] = usePostData(deleteData)

    const deleteFc = async (userId, groupId) => {
        await removeUserFromGroup({ users: [userId], groupId })
        setReset(!reset)
    }

    const deleteMany = async (chosenUsers, groupId) => {
        await removeUserFromGroup({ users: chosenUsers, groupId })
        setReset(!reset)
    }
    //################# Add To group
    const [sendData, addStatus] = useAddUserToGroupMutation()
    const [addUserToGroup] = usePostData(sendData)

    const addUser = async (userId, groupId) => {
        await addUserToGroup({ users: [userId], groupId })
        setReset(!reset)
    }

    const addManyUsers = async (chosenUsers, groupId) => {
        await addUserToGroup({ users: chosenUsers, groupId })
        setReset(!reset)
    }

    //###########
    const [sendRemove, deleteStatus] = useRemoveFromLecturesMutation()
    const [removeLectureFromGroup] = usePostData(sendRemove)

    const removeLecture = async (id, group) => {
        await removeLectureFromGroup({ lectures: [id], group })
        setReset(!reset)
    }

    const removeManyLectures = async (chosenLectures, group) => {
        await removeLectureFromGroup({ lectures: chosenLectures, group })
        setReset(!reset)
    }
    //##################

    const [sendAdd, addLectureStatus] = useAddToLecturesMutation()
    const [addLecturesTo] = usePostData(sendAdd)

    const addLecture = async (lectureId, group) => {
        await addLecturesTo({ lectures: [lectureId], group })
        setReset(!reset)
    }

    const addManyLectures = async (chosenLectures, group) => {
        await addLecturesTo({ lectures: chosenLectures, group })
        setReset(!reset)
    }

    const allStatuses = [
        removeStatus,
        addStatus,
        deleteStatus,
        addLectureStatus
    ];

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
            headerName: 'المواعيد',
            width: 200,
            renderCell: (params) => {
                return (
                    <BtnModal
                        variant='outlined'
                        btnName={'عرض المواعيد'}
                        titleInSection="المواعيد"
                        component={<Section>
                            {params.row.days && params.row.days.map((day, i) => {
                                return <TabInfo sx={{
                                    margin: '8px 16px',
                                }} key={i} count={formatTime(day?.time)} title={getDay(day?.dayIndex)} i={0} />
                            })}
                        </Section>}
                    />
                )
            }
        }, {
            field: 'users',
            headerName: 'الاعضاء',
            width: 150,
            renderCell: (params) => {
                const group = params.row
                return <BtnModal
                    titleInSection={'الاعضاء فى جروب ' + params.row?.name}
                    btnName={'الاعضاء'}
                    component={
                        <Users
                            reset={reset}
                            allStatuses={allStatuses}
                            massActions={[{
                                label: 'ازاله المستخدمين من جروب ' + params.row?.name,
                                onClick: (chosenUsers) => deleteMany(chosenUsers, group._id)
                            }]}
                            deleteFc={(userId) => deleteFc(userId, group._id)}
                            filters={{
                                grade: group.grade, groups: group._id
                            }}
                        />
                    }
                />
            }
        }, {
            field: 'notUsers',
            headerName: 'الطلاب',
            width: 150,
            renderCell: (params) => {
                const group = params.row
                return <BtnModal
                    titleInSection={'الاعضاءالغير مشتركين فى جروب ' + params.row?.name}
                    btnName={'الغير مشتركين'}
                    icon={<FaUserSlash size={'1.2rem'} />}
                    color={'error'}
                    component={
                        <Users
                            reset={reset}
                            allStatuses={allStatuses}
                            massActions={[{
                                label: 'ايضافه المستخدمين الي جروب ' + params.row?.name,
                                onClick: (chosenUsers) => addManyUsers(chosenUsers, group._id)
                            }]}
                            deleteFc={addUser}
                            filters={{
                                grade: group.grade, groups: '!=_split_' + group._id
                            }}
                        />}
                />
            }
        }, {
            field: 'lectures',
            headerName: 'المحاضرات',
            width: 200,
            renderCell: (params) => {
                const group = params.row
                return <BtnModal
                    btnName={'عرض المحاضرات'} icon={<FaSchoolCircleCheck />}

                    titleInSection={'عرض المحاضرات ' + group?.name}
                    component={<Lectures
                        reset={reset}
                        massActions={[{
                            label: 'ازاله المحاضرات من ' + group?.name,
                            onClick: (ids) => removeManyLectures(ids, group._id)
                        }]}
                        deleteFc={(id) => removeLecture(id, group._id)}
                        allStatuses={allStatuses}
                        filters={{
                            groups: group._id
                        }}
                    />}
                />
            }
        }, {
            field: 'lectureNot',
            headerName: 'محاضرات غير مضافه',
            width: 200,
            renderCell: (params) => {
                const group = params.row
                return <BtnModal
                    btnName={'المحاضرات الغير مضافه'} icon={<FaSchoolCircleXmark />} color={'error'}
                    titleInSection={'المحاضرات الغير مضافه' + " " + group?.name}
                    component={<Lectures
                        reset={reset}
                        massActions={[{
                            label: 'ايضافه المحاضرات الي ' + group?.name,
                            onClick: (ids) => addManyLectures(ids, group._id)
                        }]}
                        addColumns={[{
                            field: 'add',
                            headerName: 'ايضافه',
                            type: 'actions',
                            getActions: (params) => {
                                return [
                                    <BtnConfirm
                                        modalInfo={{
                                            desc: 'سيتم اضافه هذه المحاضره الي المجموعه'
                                        }}
                                        btn={<IconButton color='success' onClick={() => addLecture(params?.row?._id, group._id)}>
                                            <IoIosAddCircleOutline></IoIosAddCircleOutline>
                                        </IconButton>} key={0} />
                                ]
                            }
                        }]}
                        allStatuses={allStatuses}
                        filters={{
                            groups: '!=_split_' + group._id, grade: group.grade
                        }}
                    />}
                />
            }
        }, {
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

    return (
        <FullComponent
            data={{
                useFetch: useLazyGetGroupsQuery,
                useUpdate: useUpdateGroupMutation,
                useDelete: useDeleteGroupMutation,
                resKey: 'groups',
                columns, exportObj, reset,
                allStatuses,
                ViewRow //Error when submit it reMount component so fixed by making it instance
            }}
        />
    )
}

export default GetGroups
