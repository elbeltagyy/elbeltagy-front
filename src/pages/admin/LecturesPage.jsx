import { Avatar, Box, IconButton, Typography } from "@mui/material"
import { lang } from "../../settings/constants/arlang"
import Section from "../../style/mui/styled/Section"
import { useLazyGetLecturesQuery, useUpdateLectureMutation } from "../../toolkit/apis/lecturesApi"
import FullComponent from "../../tools/datagrid/FullComponent"
import TabInfo from "../../components/ui/TabInfo"
import { convertObjToArray, makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"

import { getDateWithTime, getFullDate } from "../../settings/constants/dateConstants"
import sectionConstants from "../../settings/constants/sectionConstants"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import BtnModal from "../../components/ui/BtnModal"
import Users from "../../components/all/Users"
import { useState } from "react"
import { useAddToUserMutation } from "../../toolkit/apis/usersApi"
import usePostData from "../../hooks/usePostData"
import BtnConfirm from "../../components/ui/BtnConfirm"
import { IoIosAddCircleOutline } from "react-icons/io"
import useGrades from "../../hooks/useGrades"


const exportObj = (grades) => ({
    grade: (row) => {
        return grades.find(grade => grade.index === row.grade)?.name
    },
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    isSalable: (row) => {
        return row.isSalable ? 'قابل للبيع' : 'غير قابل'
    },
    isFree: (row) => {
        return row.isFree ? 'مجاني' : 'غير مجاني'
    },
    isCenter: (row) => {
        return row.isCenter ? 'مفعل' : 'غير مفعل'
    },
    price: (row) => {
        return row.price ? row.price + ' ' + 'جنيه' : 'غير مسعر'
    },
    course: (row) => {
        return row.course?.name
    },
    dateStart: (row) => {
        return getDateWithTime(row.dateStart)
    },
    dateEnd: (row) => {
        return getDateWithTime(row.dateEnd)
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },

})


function LecturesPage() {
    const [sections] = convertObjToArray(sectionConstants)
    const { grades } = useGrades()

    const [sendData, status] = useAddToUserMutation()
    const [reset, setReset] = useState(false)

    const [handelUser] = usePostData(sendData, null, setReset)

    const columns = [
        {
            field: 'index',
            headerName: 'الرقم',
            renderCell: (params) => {
                return <Avatar sx={{ bgcolor: "primary.main", color: '#fff' }}>{params.row.index} </Avatar>
            }
        }, {
            field: 'name',
            headerName: 'اسم المحاضره',
            width: 200,
            editable: true,
        }, {
            field: 'description',
            headerName: 'الوصف',
            width: 200,
            editable: true,

        }, {
            field: 'price',
            headerName: 'السعر',
            width: 200,
            type: 'number',
            editable: true,
        }, {
            field: 'course',
            headerName: 'الكورس',
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return <TabInfo count={(params.row.course.name)} i={0} />
            }
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
            renderCell: (params) => {
                const grade = grades.find(({ index }) => index === params.row.grade)
                return (
                    <Typography>
                        {grade.name}
                    </Typography>
                )
            }
        },
        {
            field: 'users',
            headerName: 'الاعضاء',
            width: 150,
            type: 'actions',
            disableExport: true,
            renderCell: (params) => {
                const lecture = params.row
                return <BtnModal
                    titleInSection={'المشتركون فى المحاضره' + lecture?.name}
                    btnName={'المشتركون'}
                    component={
                        <Users
                            reset={reset}
                            allStatuses={[status]}
                            massActions={[{
                                label: 'ازاله المستخدمين من المحاضره ' + lecture.name,
                                onClick: (chosenUsers) => handelUser({
                                    ids: chosenUsers, field: 'accessLectures', value: lecture._id, action: 'pull'
                                })
                            }]}
                            deleteFc={(userId) => handelUser({
                                id: userId, field: 'accessLectures', value: lecture._id, action: 'pull'
                            })}
                            filters={{
                                accessLectures: lecture._id //grade: lecture.grade, 
                            }}
                        />
                    }
                />
            }
        }, {
            field: 'notUsers',
            headerName: 'الطلاب الغير مشتركون',
            width: 150,
            type: 'actions',
            disableExport: true,
            renderCell: (params) => {
                const lecture = params.row
                return <BtnModal
                    color={'error'}
                    titleInSection={'الطلاب الغير مشتركون فى المحاضره' + lecture?.name}
                    btnName={'الغير مشتركون'}
                    component={
                        <Users
                            reset={reset}
                            allStatuses={[status]}
                            massActions={[{
                                label: 'ايضافه الطلاب الي المحاضره ' + lecture.name,
                                onClick: (chosenUsers) => handelUser({
                                    ids: chosenUsers, field: 'accessLectures', value: lecture._id, action: 'push'
                                })
                            }]}
                            addColumns={[{
                                field: 'add',
                                headerName: 'ايضافه',
                                type: 'actions',
                                getActions: (params) => {
                                    const user = params.row
                                    return [
                                        <BtnConfirm
                                            modalInfo={{
                                                desc: 'سيتم اضافه هذا الطالب الي المحاضره' + ' ' + lecture.name
                                            }}
                                            btn={<IconButton color='success' onClick={() => handelUser({
                                                id: user._id, field: 'accessLectures', value: lecture._id, action: 'push'
                                            })}>
                                                <IoIosAddCircleOutline></IoIosAddCircleOutline>
                                            </IconButton>} key={0} />
                                    ]
                                }
                            }]}
                            filters={{
                                accessLectures: '!=' + lecture._id
                            }}
                        />
                    }
                />
            }
        },
        {

            field: 'dateStart',
            headerName: "تاريخ البدء",
            width: 200,
            type: 'date',
            valueGetter: (dateStart) => new Date(dateStart),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.dateStart)} i={1} />
            }
        }, {
            field: 'dateEnd',
            headerName: 'تاريخ النهايه',
            width: 200,
            type: 'date',
            valueGetter: (dateEnd) => new Date(dateEnd),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.dateEnd)} i={1} />
            }
        }, {
            field: 'isSalable',
            headerName: 'قابل للبيع',
            type: "boolean",
            isSwitch: true
        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: 'sectionType',
            headerName: 'نوع المحاضره',
            type: "singleSelect",
            valueOptions: sections,
            renderCell: (params) => {
                return (
                    <TabInfo count={params.row.sectionType} i={0} />
                )
            }
        },
        //  {
        //     field: "isMust",
        //     headerName: 'isMust',
        //     type: 'boolean',
        //     isSwitch: true
        // },
        {
            field: "isCenter",
            headerName: 'تفعيله للطلاب السنتر',
            type: 'boolean',
            isSwitch: true,
            width: 150
        }, {
            field: "isFree",
            headerName: 'مجاني؟',
            type: 'boolean',
            isSwitch: true
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
        <Section>
            <TitleWithDividers title={'محاضرات المنصه'} />
            <FullComponent
                data={{
                    useFetch: useLazyGetLecturesQuery,
                    resKey: 'lectures',
                    useUpdate: useUpdateLectureMutation,
                    columns, isMultiPart: true,
                    fetchFilters: { populate: 'course', isModernSort: true },
                    exportObj, exportTitle: "المحاضرات"
                    //     fetchFc,
                    //     useDelete: useRemoveAnswerMutation,
                    //     columns, reset, loading,fetchFilters,
                    //      viewFc, deleteFc, updateFc
                }}
            />
        </Section>
    )
}

export default LecturesPage
