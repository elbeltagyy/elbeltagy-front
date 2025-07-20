import { useState } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import { FilledHoverBtn } from '../../style/buttonsStyles';
import PasswordIcon from '@mui/icons-material/Password';
import * as Yup from "yup"
import { lang } from '../../settings/constants/arlang';
import { green } from '@mui/material/colors';
import usePostData from '../../hooks/usePostData';
import { useUpdateUserProfileMutation } from '../../toolkit/apis/usersApi';

function UserChangePassword({ user }) {
    const [changePass, setChangePass] = useState(false)

    const [sendData, status] = useUpdateUserProfileMutation()
    const [updateProfile] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        await updateProfile(values, true)
        props.resetForm()
    }

    const changePasswordInputs = [
        {
            name: "id",
            value: user._id,
            disabled: true,
            hidden: true
        },
        {
            name: "password",
            label: "كلمه السر الجديده",
            type: "password",
            placeholder: "كلمه السر الجديده",
            icon: <PasswordIcon sx={{ color: green[500] }} />,
            validation: Yup.string().min(6, "يجب ان يكون اكثر من 6")
        }, {
            name: 'confirmPassword',
            label: lang.CONFIRM_PASSWORD,
            type: "password",
            placeholder: "تاكيد كلمه السر الجديده",
            icon: <PasswordIcon sx={{ color: green[500] }} />,
            validation: Yup.string().required("مطلوب")
            .min(6, "يجب ان يكون اكثر من 6").oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقه')
        }
    ]


    return (
        <>
            <FilledHoverBtn onClick={() => setChangePass(!changePass)}>هل تريد تغيير كلمه السر ؟</FilledHoverBtn>

            {changePass && (
                <MakeForm inputs={changePasswordInputs} status={status} onSubmit={onSubmit} />
            )}
        </>
    )
}

export default UserChangePassword
