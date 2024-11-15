import { useMemo } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import usePostData from '../../hooks/usePostData'

import { FaSquarePhoneFlip } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import { setUser } from '../../toolkit/globalSlice';
import { useDispatch } from 'react-redux';

import { lang } from '../../settings/constants/arlang';
import * as Yup from "yup"
import { useLoginMutation } from '../../toolkit/apis/usersApi';

function LoginForm() {
    const inputs = [
        {
            label: lang.PHONE,
            name: 'userName',
            icon: <FaSquarePhoneFlip />,
            placeholder: lang.USERNAME + '/' + lang.CODE + '/' + lang.PHONE,
            validation: Yup.string()
                .trim() // Removes leading and trailing spaces
                .matches(/^[a-z0-9@.]+$/, "Only lowercase letters, numbers, '@', and '.' are allowed")
                .min(6, 'يجب ان يكون على الاقل 6 حروف')
                .max(100, 'يجب ان يكون اقل من 100 حرف'),
        }, {
            label: lang.PASSWORD,
            name: 'password',
            direction: 'rtl',
            icon: <TbPasswordUser />,
            type: 'password',
            validation: Yup.string().required("مطلوب")
                .min(6, "يجب ان يكون على الاقل 6 حروف")
                .max(100, 'يجب ان يكون اقل من 100 حرف'),

        }
    ]

    const dispatch = useDispatch()
    const [sendData, status] = useLoginMutation()
    const [loginFc] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await loginFc(values)
        dispatch(setUser(res))
    }

    const modalInfo = useMemo(() => {
        return {
            title: 'هل انت متاكد من تسجيل الدخول ؟',
            desc: 'اقصى عدد للاجهزه المسموح بها هو 3, عشان كدا لو ده اول مره تسجل علي الجهاز ده هتتحسب 1'
        }
    }, [])
    return (
        <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} modalInfo={modalInfo} />
    )
}

export default LoginForm
