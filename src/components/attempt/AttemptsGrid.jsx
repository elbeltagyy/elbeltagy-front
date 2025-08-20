import { lang } from "../../settings/constants/arlang"
import { convertToMs, getDateWithTime, getFullDate } from "../../settings/constants/dateConstants"
import { useLazyGetAttemptsQuery } from "../../toolkit/apis/attemptsApi"
import FullComponent from "../../tools/datagrid/FullComponent"
import { getPercentage, totalDegree } from "../../tools/fcs/GetExamTotal"
import TabInfo from "../ui/TabInfo"
import UserAvatar from "../users/UserAvatar"
import ms from "ms"
import BtnModal from "../ui/BtnModal"
import AttemptPage from "../../pages/user/AttemptPage"
import { useMemo } from "react"
import { user_roles } from "../../settings/constants/roles"
import { useRemoveAnswerMutation } from "../../toolkit/apis/answersApi"

const exportObj = {
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    },
    percentage: (row) => {
        let { percentage, rating } = getPercentage(row.mark, row.total)
        return percentage + '%' + '-' + rating
    },
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    mark: (row) => {
        return row.mark + ' / ' + row.total
    }
}
function AttemptsGrid({ exam, courseId, attemptRole }) {
    const total = useMemo(() => {
        if (exam) {
            return totalDegree(exam)
        } else {
            return null
        }
    }, [exam])

    // const filterBy = {
    //     exam: lecture?.values?.exam?._id,
    //     course: courseType !== user_roles.STUDENT ? courseType : 'all',
    //     attemptRole: courseId === user_roles.STUDENT ? user_roles.STUDENT : 'all'
    // }

    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar user={params.row} />
            }
        },
        {
            field: 'name',
            headerName: lang.NAME,
            width: 200,
            sortable: false,

        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150,
            sortable: false,
        }, {
            field: 'examName',
            headerName: 'الاختبار',
            width: 150,
            sortable: false,
        }, {
            field: 'courseName',
            headerName: 'الكورس',
            width: 150,
            sortable: false,
        }, {
            field: 'mark',
            headerName: 'الدرجه',
            width: 150,
            type: 'number',
            renderCell: (params) => {
                return <TabInfo count={(params.row.mark) + (total && '/' + total)} i={0} />
            }
        }, {
            field: 'percentage',
            headerName: 'النسبه',
            width: 200,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                let { percentage, rating, ratingColor } = getPercentage(params.row.mark, params.row.total)
                return <TabInfo count={(percentage + '%' + '-' + rating)} i={ratingColor} />
            }
        }, {
            field: 'tokenTime',
            headerName: 'الوقت الماخوذ',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return <TabInfo count={(params.row.tokenTime)} i={2} />
            }
        }, {
            field: 'role',
            headerName: lang.ROLE,
            width: 200,
            type: 'singleSelect',
            valueOptions: [user_roles.INREVIEW, user_roles.ONLINE, user_roles.STUDENT],
            sortable: false,
            filterable: false
        }, {
            field: 'phone',
            headerName: lang.PHONE,
            width: 200,
            sortable: false,
            filterable: false,
        }, {
            field: 'familyPhone',
            headerName: lang.FAMILY_PHONE,
            width: 200,
            sortable: false,
            filterable: false,

        }, {
            field: 'createdAt',
            headerName: 'تاريخ اداء الاختبار',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        }, {
            field: 'seeAttempt',
            headerName: 'عرض حل الطالب',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <BtnModal
                    variant='contained'
                    fullScreen
                    component={<AttemptPage attempt={params.row._id} isShowBack={false} />}
                    btnName={'عرض الحل'} />
            }
        }
    ]

    const modifiedCols = useMemo(() => {
        if (!exam) {
            return columns.filter((col) => col.field !== 'percentage')
        }
        return columns
    }, [exam])


    const fetchFc = (res) => {
        const modifiedRes = res.attempts.map((attempt) => {
            const foundExam = exam || attempt.exam
            return {
                ...attempt.user,
                _id: attempt._id,
                createdAt: attempt.createdAt,
                examName: foundExam?.name,
                courseName: attempt.course?.name,
                mark: attempt.mark, tokenTime: foundExam?.time && ms((convertToMs(foundExam?.time) - (attempt.tokenTime) || 0)), total
            }
        })
        const modified = { attempts: modifiedRes, count: res.count }
        return modified
    }

    const fetchFilters = useMemo(() => {
        const params = {
            populate: 'exam course user',
            course: courseId, exam: exam?._id
        }
        if (attemptRole) {
            params.role = attemptRole
        }
        if (exam) {
            params.populate = 'course user'
        }

        return params
    }, [attemptRole, courseId, exam])

    const data = {
        useFetch: useLazyGetAttemptsQuery, fetchFilters,
        resKey: 'attempts',
        fetchFc,
        showCount: 'عدد المحاولات',
        // useUpdate: useUpdateAnswerMutation,
        // useDelete: useRemoveAnswerMutation,
        columns: modifiedCols, exportObj, reset: [exam, courseId, attemptRole]
    }

    return (
        <div>
            <FullComponent data={data} />
        </div>
    )
}

export default AttemptsGrid
