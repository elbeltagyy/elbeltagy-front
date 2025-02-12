import { useState } from 'react'
import { FlexBetween } from '../../style/mui/styled/Flexbox'
import { StyledBtn } from '../../style/buttonsStyles'
import SelectCourse from '../../components/content/SelectCourse'
import { lang } from '../../settings/constants/arlang'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import CourseCreate from '../../components/content/CourseCreate'
import { Alert } from '@mui/material'

function ManageCourses({ grade, activeUnit, activeCourse, setActiveCourse, courses, setCourses }) {

    const [openCourseModal, setCourseModal] = useState(false)

    return (
        <>
            <FlexBetween gap={'10px'} m={'20px 0'} >
                <StyledBtn disabled={!activeUnit || !grade} onClick={() => setCourseModal(true)}> {lang.CREATE_COURSE}</StyledBtn>
                <SelectCourse unit={activeUnit} setActiveCourse={setActiveCourse} activeCourse={activeCourse}  courses={courses} setCourses={setCourses} />
                {/* reset={[activeUnit]} */}
            </FlexBetween>

            <ModalStyled open={openCourseModal} setOpen={setCourseModal} >
                {(activeUnit && grade) ?
                    <CourseCreate grade={grade} unit={activeUnit} setCourses={setCourses} />
                    : <Alert severity='warning'>من فضلك اختر صف دراسي !</Alert>
                }
            </ModalStyled>
        </>
    )
}

export default ManageCourses
