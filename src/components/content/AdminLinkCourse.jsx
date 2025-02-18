import { Autocomplete, Box, Button, CircularProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import AutoCompleteStyled from '../../style/mui/styled/AutoCompleteStyled';
import { useLazyGetCoursesQuery, useLinkCourseMutation } from '../../toolkit/apis/coursesApi';
import useLazyGetData from '../../hooks/useLazyGetData';
import usePostData from '../../hooks/usePostData';
import TitleWithDividers from '../ui/TitleWithDividers';

function AdminLinkCourse({ grade, course, setCourse, setRefetchLectures }) { //fetching Fc, setChosenOptions

    const [getData, status] = useLazyGetCoursesQuery()
    const [getCourses] = useLazyGetData(getData)


    const trigger = async (filter) => {
        const res = await getCourses({ grade, name: filter, select: 'name _id' })
        const filtered = res.courses.filter(searchedCourse => searchedCourse._id !== course._id)
        return filtered
    }

    const [sendData, sendStatus] = useLinkCourseMutation()
    const [addLinkers] = usePostData(sendData)

    const onSubmit = async (linkers) => {
        const res = await addLinkers({ course: course._id, linkers })
        setCourse(pre => {
            return {
                ...pre, ...res
            }
        })

        if (setRefetchLectures) {
            setRefetchLectures(pre => !pre)
        }
    }

    return (
        <Box sx={{ my: '16px' }}>
            <TitleWithDividers title={'ربط الكورس بكورس اخر'} />
            <AutoCompleteStyled
                fetchFc={trigger}
                sendFc={onSubmit}
                status={sendStatus}
                filterKey="name"
                defaultValues={course.linkedTo}
                reset={[course._id]}
                btnTitle='ربط الكورس'
            />
        </Box>
    )
}

export default AdminLinkCourse
