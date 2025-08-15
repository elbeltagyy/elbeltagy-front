
import AccountCircle from '@mui/icons-material/AccountCircle';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import HouseIcon from '@mui/icons-material/House';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { lang } from '../../settings/constants/arlang';

import * as Yup from "yup"
import MakeForm from '../../tools/makeform/MakeForm';
import { useUpdateUserProfileMutation } from '../../toolkit/apis/usersApi';
import usePostData from '../../hooks/usePostData';
import { useDispatch } from 'react-redux';
import { setUser } from '../../toolkit/globalSlice';
import { FaSquarePhoneFlip } from 'react-icons/fa6';
import TitleWithDividers from '../ui/TitleWithDividers';
import { green } from '@mui/material/colors';
import UserChangePassword from './UserChangePassword';
import { user_roles } from '../../settings/constants/roles';


function UserProfileUpdate({ user, isAdmin = false, setUserAdmin, setReset }) {

    const dispatch = useDispatch()
    const refresh = () => {
        if (setReset) {
            setReset(p => !p)
        }
    }

    const [sendData, status] = useUpdateUserProfileMutation()
    const [updateProfile] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await updateProfile(values, true)
        if (isAdmin) {
            setUserAdmin({ ...user, ...res })
            refresh
        } else {
            dispatch(setUser({ ...user, ...res }))
        }
    }

    let inputs = [
        {
            name: "id",
            value: user._id,
            disabled: true,
            hidden: true
        }, {
            name: "userName",
            label: lang.USERNAME,
            value: user.userName,
            disabled: !isAdmin && true,
            icon: <VerifiedUserIcon sx={{ color: green[500] }} />
        }, {
            name: "name",
            label: lang.NAME,
            value: user.name,
            icon: <AccountCircle sx={{ color: green[500] }} />,
            width: { xs: '100%', md: '49%' },
            validation: Yup.string().required(lang.REQUERIED).matches(/^\s*(\S+\s+){2}\S+\s*$/, "يجب ان يكون 3 كلمات")
        }, {
            name: "email",
            label: lang.EMAIL,
            value: user.email,
            icon: <AttachEmailIcon sx={{ color: green[500] }} />,
            width: { xs: '100%', md: '49%' },
            validation: Yup.string().required(lang.REQUERIED).email('يجب ادخال ايميل صالح'),
        }, {
            name: "phone",
            label: lang.PHONE,
            value: user.phone,
            width: { xs: '100%', md: '49%' },
            icon: <FaSquarePhoneFlip color={green[500]} />,
            validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم"),
            disabled: !isAdmin && true
        }, {
            name: "familyPhone",
            label: lang.FAMILY_PHONE,
            value: user.familyPhone,
            icon: <HouseIcon sx={{ color: green[500] }} />,
            width: { xs: '100%', md: '49%' },
            validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم")
                .notOneOf([Yup.ref('phone'), null], 'مينفعش هاتف ولى الامر يبقا رقمك'),
            disabled: !isAdmin && true
        }, {
            name: "avatar",
            label: "ارفاق صوره شخصيه",
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
                    message: `يجب ان يكون حجم الملف اقل من ${(import.meta.env.VITE_MAX_IMAGE_SIZE || 3)} ميغا`,
                    test: (file) => {
                        if (file && file.size) {
                            const isValid = file?.size <= (import.meta.env.VITE_MAX_IMAGE_SIZE || 3) * 1024 * 1024; // 3MB
                            // const isValid = file?.size < 3 * 1024 * 1024;
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
        }]

    if (isAdmin) {
        inputs.push({
            name: "role",
            label: lang.ROLE,
            value: user.role,
            disabled: !isAdmin && true,
            type: 'select',
            options: [user_roles.ONLINE, user_roles.STUDENT, user_roles.INREVIEW]
        });

    }
    return (
        <div>
            <TitleWithDividers title={'تحديث البيانات'} />
            <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} />
            <UserChangePassword user={user} />
        </div>
    )
}

export default UserProfileUpdate
