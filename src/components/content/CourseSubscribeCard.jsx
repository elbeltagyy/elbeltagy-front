import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Chip, Link, Typography } from '@mui/material'
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

import { setUser } from '../../toolkit/globalSlice'
import WrapperHandler from '../../tools/WrapperHandler'
import { useSubscribeMutation } from '../../toolkit/apis/coursesApi'

import { AiFillPoundCircle } from 'react-icons/ai'
import { IoIosRadio } from 'react-icons/io'
import PaymentMethods from '../payment/PaymentMethods'

import VerifyCoupon from '../coupons/VerifyCoupon'
import { FlexColumn } from '../../style/mui/styled/Flexbox'

function CourseSubscribeCard({ course, isSubscribed, setCourseDetails, setCurrentUserIndex, chapters }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.global)


    const [open, setOpen] = useState(false)
    const [sendData, status] = useSubscribeMutation()

    const goLogin = () => {
        setOpen(false)
        navigate('/login', { state: true })
    }

    const subscribe = (res) => {
        if (res.wallet) {
            dispatch(setUser({ ...user, wallet: res.wallet }))
        }
        if (res.course && res.lectures) {
            setCourseDetails((pre) => {
                return {
                    ...pre,
                    course: res.course, chapters: res.lectures
                }
            })
            setCurrentUserIndex(res.currentIndex)
        }
    }

    const setCoupon = (coupon) => {
        setCourseDetails((pre) => {
            return {
                ...pre,
                course: {
                    ...pre.course,
                    price: coupon.price,
                    coupon: coupon.coupon,
                    couponId: coupon._id
                }
            }
        })
    }

    return (
        <CardCourse img={course?.thumbnail?.url} title={course?.name} borderColor="transparent">
            {isSubscribed ? <TabInfo count={getFullDate(course?.subscribedAt)} i={1} title={'اشتركت فى'} /> :
                (course?.isSalable ?? true) ?
                    <>
                        {course.price === 0 && (
                            <Chip label="كورس مجانى" size='small' variant="contained" sx={{ bgcolor: orange[800], color: 'white' }} icon={<IoIosRadio size="1.3rem" color="#fff" />} />
                        )}
                        <RowInfo title={'سعر الكورس'} desc={`${course.price} جنيها`} icon={<AiFillPoundCircle size={'1.25rem'} />} />
                        {course.preDiscount > course.price && (
                            <>
                                <Separator sx={{ width: '100px', borderWidth: '2px', mr: 'auto' }} />
                                <TabInfo title={lang.PRE_DISCOUNT} count={ <>{course.preDiscount}  جنيه </>}  icon={<AiFillPoundCircle size={'1.25rem'} />} i={0} sx={{ mr: 'auto' }} />
                            </>
                        )}

                        <FilledHoverBtn sx={{ mt: '16px', width: '100%' }}
                            onClick={() => setOpen(true)} disabled={status.isLoading} > {status.isLoading ? <Loader color={'orange'} /> : "اشترك الان"} </FilledHoverBtn>

                        <VerifyCoupon params={{ course: course._id }} prevPrice={course.price} setCoupon={setCoupon} />

                        <Link href="/privacy" underline="always" mr={'auto'} onClick={(e) => {
                            e.preventDefault()
                            navigate("/privacy")
                        }}>
                            سياسه شراء الكورسات !
                        </Link>

                        <WrapperHandler status={status} showSuccess={true} />
                    </> : <FlexColumn>
                        <TabInfo count={'لايمكن شراء الكورس ولكن يمكن شراء المحاضرات (المستر ماشي محاضره بمحاضره)'} i={2} />
                        <ul>
                            {chapters?.map(ch => {
                                return <li key={ch._id}><Typography>{ch.name}</Typography></li>
                            })}
                        </ul>
                    </FlexColumn>}

            {!user ? (
                <ModalStyled
                    action={goLogin}
                    open={open} setOpen={setOpen} title={'تسجيل الدخول اولا ؟'} desc={'الذهاب إلي صفحة تسجيل الدخول !'}
                />
            ) : (
                <PaymentMethods
                    title={'هل انت متاكد من الاشتراك بهذا الكورس ؟'} subTitle={'الاشتراك فى كورس ' + course.name}
                    handelResponse={subscribe}
                    coupon={course?.coupon} setCoupon={setCoupon}
                    price={course.price}
                    course={course?._id}
                    invoiceNameId={'course'}
                    open={open} setOpen={setOpen}
                />
            )}
        </CardCourse >
    )
}
export default CourseSubscribeCard
