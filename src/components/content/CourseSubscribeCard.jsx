import React, { useEffect, useState } from 'react'
import CardCourse from '../ui/CardCourse'
import RowInfo from '../ui/RowInfo'
import { AiFillPoundCircle } from 'react-icons/ai'
import Separator from '../ui/Separator'
import TabInfo from '../ui/TabInfo'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import WrapperHandler from '../../tools/WrapperHandler'
import { Chip, Link } from '@mui/material'
import Loader from '../../style/mui/loaders/Loader'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { useDispatch, useSelector } from 'react-redux'
import usePostData from '../../hooks/usePostData'
import { setUser } from '../../toolkit/globalSlice'
import { getFullDate } from '../../settings/constants/dateConstants'
import { useNavigate } from 'react-router-dom'
import { lang } from '../../settings/constants/arlang'
import { useSubscribeMutation } from '../../toolkit/apis/coursesApi'
import { orange } from '@mui/material/colors'
import { IoIosRadio } from 'react-icons/io'

function CourseSubscribeCard({ course, isSubscribed, setCourseDetails }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.global)

    //getUserCourse
    // const { data } = useGetOneUserCourseQuery({ course: course._id })

    const [open, setOpen] = useState(false)
    const [sendData, status] = useSubscribeMutation()
    const [subscribeFc] = usePostData(sendData)

    const subscribe = async () => {
        setOpen(false)
        if (!user) {
            return navigate('/login', { state: true })
        }
        const res = await subscribeFc({ course: course._id })
        dispatch(setUser({ ...user, wallet: res.wallet }))
        setCourseDetails((pre) => {
            return {
                ...pre,
                course: res.course, lectures: res.lectures
            }
        })
    }

    return (
        <CardCourse img={course?.thumbnail?.url} title={course?.name} borderColor="transparent">
            {isSubscribed ? <TabInfo count={getFullDate(course?.subscribedAt)} i={1} title={'اشتركت فى'} /> :
                <>
                    {course.price === 0 && (
                        <Chip label="كورس مجانى" size='small' variant="contained" sx={{ bgcolor: orange[800], color: 'white' }} icon={<IoIosRadio size="1.3rem" color="#fff" />} />
                    )}
                    <RowInfo title={'سعر الكورس'} desc={`${course.price} جنيها`} icon={<AiFillPoundCircle size={'1.25rem'} />} />
                    {course.preDiscount > course.price && (
                        <>
                            <Separator sx={{ width: '100px', borderWidth: '2px', mr: 'auto' }} />
                            <TabInfo title={lang.PRE_DISCOUNT} count={course.preDiscount + ' $'} icon={<AiFillPoundCircle size={'1.5rem'} />} i={0} sx={{ mr: 'auto' }} />
                        </>
                    )}

                    <FilledHoverBtn sx={{ mt: '16px', width: '100%' }} onClick={() => setOpen(true)} disabled={status.isLoading} > {status.isLoading ? <Loader color={'orange'} /> : "اشترك الان"} </FilledHoverBtn>

                    <Link href="/privacy" underline="hover" mr={'auto'} onClick={(e) => {
                        e.preventDefault()
                        navigate("/privacy")
                    }}>
                        سياسه شراء الكورسات
                    </Link>

                    <WrapperHandler status={status} showSuccess={true} />
                </>}
            <ModalStyled action={subscribe} open={open} setOpen={setOpen} title={user ? 'هل انت متاكد من الاشتراك بهذا الكورس ؟' : 'تسجيل الدخول اولا ؟'} desc={user ? `سيتم خصم ${course.price} من محفظتك` : 'الذهاب إلي صفحة تسجيل الدخول !'} />
        </CardCourse>
    )
}

export default CourseSubscribeCard
