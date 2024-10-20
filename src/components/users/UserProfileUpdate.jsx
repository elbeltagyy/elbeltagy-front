import React from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HouseIcon from '@mui/icons-material/House';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { lang } from '../../settings/constants/arlang';

import * as Yup from "yup"
import { useTheme } from '@mui/material';
import MakeForm from '../../tools/makeform/MakeForm';
import { useUpdateUserProfileMutation } from '../../toolkit/apis/usersApi';
import usePostData from '../../hooks/usePostData';
import { useDispatch } from 'react-redux';
import { setUser } from '../../toolkit/globalSlice';
import { FaSquarePhoneFlip } from 'react-icons/fa6';
import TitleWithDividers from '../ui/TitleWithDividers';

function UserProfileUpdate({ user, isAdmin = false, setUserAdmin }) {

    const theme = useTheme()
    const dispatch = useDispatch()

    const [sendData, status] = useUpdateUserProfileMutation()
    const [updateProfile] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await updateProfile(values, true)
        if (isAdmin) {
            setUserAdmin({ ...user, ...res })
        } else {
            dispatch(setUser({ ...user, ...res }))
        }
    }

    const inputs = [
        {
            name: "id",
            value: user._id,
            disabled: true,
            hidden: true
        }, {
            name: "userName",
            label: lang.USERNAME,
            value: user.userName,
            disabled: true,
            icon: <VerifiedUserIcon sx={{ color: 'green' }} />
        }, {
            name: "name",
            label: lang.NAME,
            value: user.name,
            icon: <AccountCircle sx={{ color: 'green' }} />,
            width: { xs: '100%', md: '49%' },
            validation: Yup.string().required(lang.REQUERIED).matches(/^\s*(\S+\s+){2}\S+\s*$/, "يجب ان يكون 3 كلمات")
        }, {
            name: "email",
            label: lang.EMAIL,
            value: user.email,
            icon: <AttachEmailIcon sx={{ color: 'green' }} />,
            width: { xs: '100%', md: '49%' },
            validation: Yup.string().required(lang.REQUERIED).email('يجب ادخال ايميل صالح'),
        }, {
            name: "phone",
            label: lang.PHONE,
            value: user.phone,
            width: { xs: '100%', md: '49%' },
            icon: <FaSquarePhoneFlip color='green' />,
            validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم"),
            disabled: true
        }, {
            name: "familyPhone",
            label: lang.FAMILY_PHONE,
            value: user.familyPhone,
            icon: <HouseIcon sx={{ color: 'green' }} />,
            width: { xs: '100%', md: '49%' },
            validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم")
                .notOneOf([Yup.ref('phone'), null], 'مينفعش هاتف ولى الامر يبقا رقمك'),

        }, {
            name: "password",
            label: lang.PASSWORD,
            type: "password",
            placeholder: "new password",
            icon: <PasswordIcon sx={{ color: 'green' }} />,
            validation: Yup.string().min(6, "يجب ان يكون اكثر من 6")

        }, {
            name: 'confirmPassword',
            label: lang.CONFIRM_PASSWORD,
            type: "password",
            placeholder: "new password",
            validation: Yup.string().min(6, "should be at least 6 characters"),
            icon: <PasswordIcon sx={{ color: 'green' }} />
        }, {
            name: "avatar",
            label: "image",
            type: "file",
            value: user.avatar || '',
            validation: Yup.mixed()
                .test({
                    message: 'Please provide a supported image typed(jpg or png or webp)',
                    test: (file, context) => {
                        if (file && !file.url) {
                            if (file?.url) {
                                file.type = file.resource_type + "/" + file.format
                            }
                            const isValid = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file?.type);
                            if (!isValid) context?.createError();
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
                .test({
                    message: `يجب ان يكون حجم الملف اقل من 3 ميغا`,
                    test: (file) => {
                        if (file && file.size) {
                            const isValid = file?.size < 3 * 1024 * 1024;
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
        },]

    return (
        <div>
            <TitleWithDividers title={'تحديث البيانات'} />
            <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} />
        </div>
    )
}

export default UserProfileUpdate
