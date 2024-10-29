import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Chip, Link } from '@mui/material'
import { orange } from '@mui/material/colors'

import CardCourse from '../ui/CardCourse'
import RowInfo from '../ui/RowInfo'
import Separator from '../ui/Separator'
import TabInfo from '../ui/TabInfo'

import { FilledHoverBtn } from '../../style/buttonsStyles'
import Loader from '../../style/mui/loaders/Loader'
import ModalStyled from '../../style/mui/styled/ModalStyled'

import { getFullDate } from '../../settings/constants/dateConstants'
import { lang } from '../../settings/constants/arlang'

import usePostData from '../../hooks/usePostData'
import { setUser } from '../../toolkit/globalSlice'
import WrapperHandler from '../../tools/WrapperHandler'
import { useSubscribeMutation } from '../../toolkit/apis/coursesApi'

import { AiFillPoundCircle } from 'react-icons/ai'
import { IoIosRadio } from 'react-icons/io'
import CourseCoupon from './CourseCoupon'

function CourseSubscribeCard({ course, isSubscribed, setCourseDetails }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.global)

    //getUserCourse
    // const { data } = useGetOneUserCourseQuery({ course: course._id })

    const [open, setOpen] = useState(false)
    const [sendData, status] = useSubscribeMutation()
    const [subscribeFc] = usePostData(sendData)

    const [openCoupen, setOpenCoupen] = useState(false)
    const toggleCoupon = () => {
        setOpenCoupen(!openCoupen)
    }
    const subscribe = async () => {
        setOpen(false)
        if (!user) {
            return navigate('/login', { state: true })
        }
        const subObj = { course: course._id }
        if (course.coupon) {
            subObj.coupon = course.coupon
        }
        const res = await subscribeFc(subObj)
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

                    {user && (
                        <Link Link href="/" underline="hover" mr={'auto'} onClick={(e) => {
                            e.preventDefault()
                            toggleCoupon()
                        }}>
                            لديك كوبون ؟
                        </Link>
                    )}
                    
                    {openCoupen && (
                        <CourseCoupon course={course} setCourseDetails={setCourseDetails} />
                    )}

                    <Link href="/privacy" underline="always" mr={'auto'} onClick={(e) => {
                        e.preventDefault()
                        navigate("/privacy")
                    }}>
                        سياسه شراء الكورسات !
                    </Link>

                    <WrapperHandler status={status} showSuccess={true} />
                </>}
            <ModalStyled action={subscribe} open={open} setOpen={setOpen} title={user ? 'هل انت متاكد من الاشتراك بهذا الكورس ؟' : 'تسجيل الدخول اولا ؟'} desc={user ? `سيتم خصم ${course.price} من محفظتك` : 'الذهاب إلي صفحة تسجيل الدخول !'} />
        </CardCourse >
    )
}

export default CourseSubscribeCard
