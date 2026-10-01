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
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import InfoText from '../ui/InfoText'

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
    const discount = course.preDiscount ? (((course.preDiscount - course.price) / course.preDiscount) * 100).toFixed(2) + "%" : null

    return (
        <CardCourse
            img={course?.thumbnail?.url} title={course?.name} borderColor="transparent">
            {isSubscribed ? <TabInfo count={getFullDate(course?.subscribedAt)} i={1} title={'اشتركت فى'} /> :
                (course?.isSalable ?? true) ?
                    <>
                        <FlexBetween sx={{ width: '100%' }}>
                            <FlexColumn gap={'6px'} sx={{ alignItems: 'flex-start' }}>
                                <InfoText label={'سعر الكورس'} description={<Typography variant="h6" sx={{ fontWeight: 800 }}>{course.price} جنيه</Typography>} />
                                {(course.preDiscount !== 0 && course.preDiscount > course.price) && (
                                    <InfoText label={'بدلا من'} description={<Typography variant="subtitle1" sx={{ color: "error.dark", textDecoration: "line-through" }}>{course.preDiscount} جنيه</Typography>} />
                                )}
                            </FlexColumn>
                            <FlexColumn gap={'6px'}  sx={{ alignItems: 'flex-start' }}>
                                {discount && (
                                    <TabInfo count={'خصم ' + discount} i={3} />
                                )}
                                {course.price === 0 && ( //course.price === 0
                                    <Chip label="كورس مجانى !" size='small' variant="contained" sx={{ background: 'linear-gradient(to right,#f43f5e, #a855f7)', color: 'white' }} icon={<IoIosRadio size="1.3rem" color="#fff" />} />

                                )}
                            </FlexColumn>
                        </FlexBetween>

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
                        <TabInfo sx={{ flexWrap: 'wrap' }} count={'شراء المحاضرات فقط'} i={2} />
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
