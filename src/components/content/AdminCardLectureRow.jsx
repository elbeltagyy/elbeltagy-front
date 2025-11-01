import { Avatar, CardHeader, IconButton, Typography } from "@mui/material"
import { FlexBetween, FlexColumn } from "../../style/mui/styled/Flexbox"
import SectionIcon from "./SectionIcon"
import TabInfo from "../ui/TabInfo"
import { getFullDate } from "../../settings/constants/dateConstants"

import { useDeleteLectureMutation, useUpdateLectureMutation } from "../../toolkit/apis/lecturesApi"
import usePostData from "../../hooks/usePostData"
import AdminLectureBtns from "./AdminLectureBtns"
import AdminLectureDetails from "./AdminLectureDetails"
import { memo } from "react"

function AdminCardLectureRow({ lecture, i, setLectures, courseId, attributes, listeners, chapters, changeLectureChapter, changeChapterStatus }) {

    const isNativeLecture = (lecture?.course?._id === courseId || lecture?.course === courseId)

    const [sendData, { isLoading }] = useUpdateLectureMutation()
    const [updateLecture] = usePostData(sendData)

    const changeStatus = async (object) => {
        const res = await updateLecture({ id: lecture._id, ...object }, true)

        setLectures((pre) => {

            const modified = pre.map(storedLec => {
                if (storedLec._id === res._id) {
                    storedLec = { ...storedLec }

                    for (const key of Object.keys(object)) {
                        // Update the corresponding key in `storedLec` with the value from `res`
                        if (res[key] !== undefined) {
                            storedLec[key] = res[key];
                        }
                    }

                }
                return storedLec
            })
            return modified
        })
    }

    const [sendDelete, status] = useDeleteLectureMutation()
    const [deleteLecture] = usePostData(sendDelete)

    const triggerDelete = async () => {
        await deleteLecture({ id: lecture._id })
        setLectures(prev => prev.filter(lect => lect._id !== lecture._id))
    }

    if (!lecture) return <></>
    return (
        <FlexBetween sx={{ bgcolor: 'background.alt', minWidth: '100%', width: '100%', p: '12px' }}>
            <FlexColumn width={'100%'} sx={{ alignItems: 'flex-start' }}>
                <FlexBetween width={'100%'}>
                    <CardHeader
                        sx={{ flexWrap: 'wrap', m: 0, p: 0 }}
                        avatar={
                            <Avatar
                                {...listeners} {...attributes}
                                sx={{
                                    bgcolor: 'primary.main', color: 'grey.0', cursor: 'grab',        // Shows drag cursor
                                    '&:active': { cursor: 'grabbing' },
                                }} aria-label="recipe">
                                {lecture.index}

                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" color='orange' sx={{ mx: '16px' }}>
                                <SectionIcon lecture={lecture} />
                            </IconButton>
                        }
                        title={<Typography variant='subtitle1' >{lecture.name + ' (' + (i + 1) + ')'}</Typography>}
                        subheader={<TabInfo count={getFullDate(lecture.createdAt)} i={2} />}
                    />

                    <AdminLectureBtns
                        courseId={courseId}
                        isLoading={isLoading || status.isLoading}
                        isNativeLecture={isNativeLecture}
                        lecture={lecture} setLectures={setLectures}
                        triggerDelete={triggerDelete}
                        chapters={chapters} changeLectureChapter={changeLectureChapter} changeChapterStatus={changeChapterStatus}
                    />
                </FlexBetween>

                <AdminLectureDetails
                    changeStatus={changeStatus}
                    courseId={courseId}
                    isLoading={isLoading}
                    isNativeLecture={isNativeLecture}
                    lecture={lecture}
                />
            </FlexColumn>
        </FlexBetween>
    )
}

export default memo(AdminCardLectureRow)
