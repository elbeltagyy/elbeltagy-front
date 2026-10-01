import { useMemo } from "react";
import { FilledHoverBtn } from "../../style/buttonsStyles";
import SectionIcon from "./SectionIcon";
import ModalStyled from "../../style/mui/styled/ModalStyled";
import PaymentMethods from "../payment/PaymentMethods";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import statusConstants from "../../settings/constants/status";
import { red } from "@mui/material/colors";


//open Asset for none users => allowed
//Lecture Summary
//revision

function getLectureButtonState({
    isLoggedIn, isSubscribed, isFree,
    lecture, currentLectureIndex, currentUserIndex,
    paidStatus,

}) {
    const canBuy = lecture.price && (lecture.isSalable ?? false) && !isSubscribed
    const buyLabel = "شراء المحاضره " + lecture.price + ' جنيه'

    if (paidStatus === statusConstants.PENDING) {
        return {
            label: 'تم ارسال طلب دفع',
            disabled: true,
            color: red[500]
        }
    }
    if (paidStatus === statusConstants.PAID) {
        return {
            label: 'تم الدفع',
            disabled: false,
            navigate: '/lectures/' + lecture._id,
        }
    }


    if (!isLoggedIn) {
        return {
            label: isFree ? "محاضره مجانيه" : canBuy ? buyLabel : 'اشترك الان',
            disabled: !isFree && !canBuy,
            action: "register",
        };
    }

    if (isSubscribed) {
        return {
            label: lecture.locked ? 'عليك اكمال المحاضرات السابقه' : lecture.index === currentLectureIndex ? 'المحاضره قيد التشغيل' :
                lecture.index === currentUserIndex ? "المحاضره التاليه" :
                    lecture.index < currentUserIndex ? 'تم الانتهاء' : "ابدا الان",
            disabled: lecture.locked || !isSubscribed || lecture?.isLocked || lecture?.index === currentLectureIndex || false,
            action: "open",
            navigate: 'lectures/' + lecture._id,
            sx: {
                
            }
        };
    }

    if (isFree && !lecture.locked) {
        return {
            label: "محاضره مجانيه",
            disabled: false,
            navigate: '/lectures/' + lecture._id,
        };
    }

    if (canBuy) {
        return {
            label: buyLabel,
            disabled: false,
            action: "buy",
        };
    }

    // not free, not salable, not subscribed -> locked But Registered
    return {
        label: 'اشترك في الكورس الان',
        disabled: true,
    };
}

function LectureUserCardBtn({
    user, isSubscribed, subscribe, paidStatus,
    lecture, currentLectureIndex, currentUserIndex,
}) {

    const isLoggedIn = user?._id
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const { label, disabled, action, navigate: btnNavigate, color, sx = {} } = useMemo(
        () => getLectureButtonState({
            isLoggedIn, isSubscribed, paidStatus,
            isFree: lecture.isFree, isSalable: lecture.isSalable,
            currentLectureIndex, currentUserIndex, lecture,
        }),
        [currentLectureIndex, currentUserIndex, isLoggedIn, isSubscribed, lecture, paidStatus]
    );

    const handleClick = () => {
        switch (action) {
            case "open":
                setOpen(true);
                break;
            case "buy":
                setOpen(true);
                break;
            case "register":
                setOpen(true);
                break;
            default:
                break;
        }
    };

    const goLogin = () => {
        if (!user) {
            navigate("/login", { state: true })
        } else {
            navigate('/lectures/' + lecture._id)
        }
    }

    return (
        <>
            <FilledHoverBtn
                component={btnNavigate && Link} to={btnNavigate}
                sx={{ width: '100%', bgcolor: color ? color : (lecture.index === currentUserIndex) ? 'orange' : 'primary.main', ...sx }}
                endIcon={<SectionIcon lecture={lecture} color='inherit' />}
                disabled={disabled}
                onClick={() => handleClick()}>
                {label}
            </FilledHoverBtn>

            {!user ? (
                <ModalStyled
                    action={goLogin}
                    open={open} setOpen={setOpen} title={'تسجيل الدخول اولا ؟'} desc={'الذهاب إلي صفحة تسجيل الدخول !'}
                />
            ) : (lecture.price && (lecture.isSalable ?? false) && !lecture.isPaid && !isSubscribed) ? (
                <PaymentMethods
                    title={'هل انت متاكد من شراء هذه المحاضره ؟'}
                    subTitle={'الاشتراك فى المحاضره ' + lecture.name}
                    handelResponse={subscribe}
                    // coupon={course?.coupon} setCoupon={setCoupon}
                    price={lecture.price}
                    lecture={lecture?._id}
                    invoiceNameId={'lecture'}
                    open={open} setOpen={setOpen}
                    note={'اذا تم شراء هذه المحاضره لن تكون قادرا على استرجاع المبلغ المدفوع حتى لو اشتركت بالكورس نفسه'}
                />
            ) : ''}
        </>
    );
}

export default LectureUserCardBtn;