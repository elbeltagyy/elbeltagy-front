import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Section from '../../style/mui/styled/Section'
import UserHeader from '../../components/ui/UserHeader'
import TitleSection from '../../components/ui/TitleSection'
import Separator from '../../components/ui/Separator'
import MakeForm from '../../tools/makeform/MakeForm'
import { lang } from '../../settings/constants/arlang'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { useUpdateUserProfileMutation } from '../../toolkit/apis/usersApi'

import usePostData from "../../hooks/usePostData"
import { setUser } from '../../toolkit/globalSlice'
import * as Yup from "yup"

function UserProfilePage() {

    const { user } = useSelector(s => s.global)
    const dispatch = useDispatch()

    const [sendData, status] = useUpdateUserProfileMutation()
    const [updateProfile] = usePostData(sendData)

    const onSubmit = async (values) => {
        const res = await updateProfile(values, true)
        dispatch(setUser({ ...user, ...res }))
    }
    const inputs = [

        {
            name: 'avatar',
            label: 'اضافه' + " " + lang.THUMBNAIL,
            type: 'file',
            validation: Yup.mixed()
                .test({
                    message: 'Please provide a supported image typed(jpg or png)',
                    test: (file, context) => {
                        if (file) {
                            const isValid = ['image/png', 'image/jpg', 'image/jpeg'].includes(file?.type);
                            if (!isValid) context?.createError();
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
                .test({
                    message: 'files must be < 10 mg',
                    test: (file) => {
                        if (file) {
                            const isValid = file?.size < 15 * 1000000;
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
        },
        {
            name: 'id',
            disabled: true,
            hidden: true,
            value: user._id,
        }
    ]

    return (
        <Section>
            <TitleSection title={'الصفحه الشخصيه'} />
            <UserHeader isAll={true} user={user} />
            <Separator />
            <TitleWithDividers title={'تحديث البيانات'} />
            <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
        </Section>
    )
}

export default UserProfilePage
