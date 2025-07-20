import MakeForm from '../../tools/makeform/MakeForm'
import gradeConstants from '../../settings/constants/gradeConstants'
import governments from '../../settings/constants/governments'

// icons
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { PiPhoneDisconnectFill } from "react-icons/pi";
import { IoSchool } from "react-icons/io5";
import { RiGovernmentFill } from "react-icons/ri";
import { CiBarcode } from "react-icons/ci";
import { TbPasswordUser } from "react-icons/tb";
import usePostData from '../../hooks/usePostData';

import { lang } from '../../settings/constants/arlang';
// constants

import * as Yup from "yup"
import { useDispatch } from 'react-redux';
import { setUser } from '../../toolkit/globalSlice';
import { useSignupMutation } from '../../toolkit/apis/usersApi';
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray';
// validation: Yup.string().required("مطلوب").min(6, "يجب ان يكون اكثر من 6")


function SignupForm() {

    const inputs = [
        {
            name: 'name',
            label: lang.NAME,
            width: { xs: '100%', md: '49%' },
            icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED).matches(/^\s*(\S+\s+){2}\S+\s*$/, "يجب ان يكون 3 كلمات")
        }, {
            name: 'email',
            label: lang.EMAIL,
            width: { xs: '100%', md: '49%' },
            type: 'email',
            icon: <MdMarkEmailRead color='green' />,
            validation: Yup.string().required(lang.REQUERIED).email('يجب ادخال ايميل صالح')
        }, {
            name: 'phone',
            label: lang.PHONE,
            width: { xs: '100%', md: '49%' },
            icon: <FaSquarePhoneFlip color='green' />,
            validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم").trim()

        }, {
            name: 'familyPhone',
            label: lang.FAMILY_PHONE,
            width: { xs: '100%', md: '49%' },
            icon: <PiPhoneDisconnectFill color='green' />,
            validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم").trim()
                .notOneOf([Yup.ref('phone'), null], 'مينفعش هاتف ولى الامر يبقا رقمك'),
        }, {
            name: 'grade',
            label: lang.GRADE,
            type: 'select',
            options: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
            icon: <IoSchool color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'government',
            label: lang.GOVERNMENT,
            type: 'select',
            value: 4,
            options: makeArrWithValueAndLabel(governments, { value: 'id', label: 'governorate_name_ar' }),
            icon: <RiGovernmentFill color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'code',
            label: lang.CODE_optional,
            icon: <CiBarcode color='green' />,
            validation: Yup.string().trim().matches(/^(act|wal|cen|grp|lec)\d{1}-\d{4}-\d{4}-\d{4}$/, {
                message: 'Code must start with "act", "wal", "cen", "grp", or "lec", followed by a number, and be in the format wal0-0000-0000-0000',
                excludeEmptyString: true,
            })
        }, {
            name: 'password',
            label: lang.PASSWORD,
            type: 'password',
            icon: <TbPasswordUser color='green' />,
            validation: Yup.string().required("مطلوب").min(6, "يجب ان يكون اكثر من 6")
        }, {
            name: 'confirmPassword',
            label: lang.CONFIRM_PASSWORD,
            type: 'password',
            icon: <TbPasswordUser color='green' />,
            validation: Yup.string().required("مطلوب")
                .min(6, "يجب ان يكون اكثر من 6").oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقه')
        }, 
    ]

    const [sendData, status] = useSignupMutation()
    const [signupFc] = usePostData(sendData)

    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        const user = await signupFc(values)

        if (user) {
            dispatch(setUser({ ...user }))
        }
    }
    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} modalInfo={{desc: 'هل انت متاكد من ان البيانات صحيحه ؟'}} btnWidth={'100%'} status={status} />
    )
}

export default SignupForm


// {
//     name: 'fileConfirm',
//     type: 'file',
//     label: 'صوره تاكيد للهويه',
//     icon: <TbPasswordUser color='green' />,
//     validation: Yup.mixed().test('fileRequired', 'صوره شهاده ميلادك او اى اثبات شخصيه او استعمل كود للتفعيل من خلال التواصل مع الدعم', function (file) {
//         const { code } = this.parent; // Access the `code` field from the parent object
//         if (!code || code.length === 0) {
//             // If `code` is empty, file is required
//             if (!file) {
//                 return this.createError({
//                     message: 'صوره شهاده ميلادك او اى اثبات شخصيه او استعمل كود للتفعيل من خلال التواصل مع الدعم',
//                 });
//             }
//             // File type validation
//             const isValidType = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file?.type);
//             if (!isValidType) {
//                 return this.createError({
//                     message: 'Please provide a supported image type (jpg, png, or webp)',
//                 });
//             }
//             // File size validation (must be less than 3MB)
//             const isValidSize = file?.size <= (import.meta.env.VITE_MAX_IMAGE_SIZE || 3) * 1024 * 1024; // 3MB
//             if (!isValidSize) {
//                 return this.createError({
//                     message: 'File must be less than ' + (import.meta.env.VITE_MAX_IMAGE_SIZE || 3) + 'MB',
//                 });
//             }
//         }

//         return true; // No validation error if `code` has a value or file is valid
//     })

// },