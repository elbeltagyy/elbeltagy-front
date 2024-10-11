import { Autocomplete, Box, Button, CircularProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import AutoCompleteStyled from '../../style/mui/styled/AutoCompleteStyled';
import { useLazyGetCoursesQuery, useLinkCourseMutation } from '../../toolkit/apis/coursesApi';
import useLazyGetData from '../../hooks/useLazyGetData';
import usePostData from '../../hooks/usePostData';
import TitleWithDividers from '../ui/TitleWithDividers';
import Loader from '../../style/mui/loaders/Loader';

function AdminLinkCourse({ grade, course, setCourse }) { //fetching Fc, setChosenOptions
    const [chosenOptions, setChosenOptions] = useState()

    const [getData, status] = useLazyGetCoursesQuery()
    const [getCourses] = useLazyGetData(getData)

    const trigger = async (filter) => {
        const res = await getCourses({ grade, name: filter })
        const filtered = res.courses.filter(searchedCourse => searchedCourse._id !== course._id)
        return filtered
    }

    const [sendData, { isLoading }] = useLinkCourseMutation()
    const [addLinkers] = usePostData(sendData)

    const onSubmit = async () => {
        console.log('chosen options ==>', chosenOptions)
        const linkers = chosenOptions.map(opt => opt?._id || opt)
        const res = await addLinkers({ course: course._id, linkers })
        console.log('res =>', res)
        setCourse(pre => {
            return {
                ...pre, ...res
            }
        })
    }

    useEffect(() => {
        setChosenOptions(course.linkedTo)
    }, [course._id])

    return (
        <Box sx={{ my: '16px' }}>
            <TitleWithDividers title={'ربط الكورس بكورس اخر'} />
            <AutoCompleteStyled
                fetchFc={trigger}
                filterKey="name"
                setChosenOptions={setChosenOptions}
                isLoading={status.isLoading}
                chosenOptions={chosenOptions}
                reset={[course._id]}
            />
            <Button onClick={onSubmit} disabled={status.isLoading || isLoading} sx={{ m: '16px auto' }}>
                {status.isLoading || isLoading ? <Loader color={'neutral.0'} /> : ' ربط الكورسات'}
            </Button>
        </Box>
    )
}

export default AdminLinkCourse
