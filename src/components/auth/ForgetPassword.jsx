import { Box, Typography } from '@mui/material';
import ListMethods from '../../style/mui/styled/ListMethods';
import { useState } from 'react';
import senderConstants from '../../settings/constants/senderConstants';

import { FaWhatsapp } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FcContacts } from "react-icons/fc";
import { FlexColumn } from '../../style/mui/styled/Flexbox';
import TitleWithDividers from '../ui/TitleWithDividers';
import { useForget_passwordMutation, useVerify_passwordMutation } from '../../toolkit/apis/usersApi';
import usePostData from '../../hooks/usePostData';
import MakeForm from '../../tools/makeform/MakeForm';
import { lang } from '../../settings/constants/arlang';
import { FilledHoverBtn } from '../../style/buttonsStyles';
import * as Yup from "yup"
import { FaSquarePhoneFlip } from 'react-icons/fa6';
import { TbPasswordUser } from 'react-icons/tb';
import Section from '../../style/mui/styled/Section';
import { useGetWhatsappStatusQuery } from '../../toolkit/apis/whatsappApi';
import TabInfo from '../ui/TabInfo';

export default function ForgetPassword() {
    const [chosenMethod, setChosenMethod] = useState(senderConstants.EMAIL);
    const [changerUserName, setUserName] = useState()

    const [sendForget, status] = useForget_passwordMutation()
    const [sendVerify, verifyStatus] = useVerify_passwordMutation()

    const [ForgetPassword] = usePostData(sendForget)
    const [verifyResetPassword] = usePostData(sendVerify)

    const { data, isLoading, isSuccess } = useGetWhatsappStatusQuery()

    const methods = [
        { value: senderConstants.EMAIL, label: senderConstants.EMAIL, icon: <MdMarkEmailUnread />, isValid: true },
        {
            value: senderConstants.WHATSAPP,
            label: senderConstants.WHATSAPP,
            icon: <FaWhatsapp />,
            isValid: true,
            description: isLoading ? <TabInfo count={'loading...'} i={0} /> :
                (isSuccess && data?.values?.isValid) ? <TabInfo count={'active'} i={1} /> :
                    <TabInfo count={'Not active'} i={3} sx={{ fontSize: '8px' }} />
        },
        { value: senderConstants.CONTACT, label: senderConstants.CONTACT, icon: <FcContacts />, isValid: true },
    ]

    const triggerForgetPassword = async (values) => {
        await ForgetPassword({
            userName: values.userName, method: chosenMethod
        })
        setUserName(values.userName)
    }

    const forgetInputs = [
        {
            name: 'userName',
            label: lang.USERNAME,
            icon: <FaSquarePhoneFlip />,
            placeholder: lang.USERNAME + '/' + lang.CODE + '/' + lang.PHONE,
            validation: Yup.string()
                .trim() // Removes leading and trailing spaces
                .matches(/^[a-z0-9@.]+$/, "Only lowercase letters, numbers, '@', and '.' are allowed")
                .min(6, 'يجب ان يكون على الاقل 6 حروف')
                .max(100, 'يجب ان يكون اقل من 100 حرف'),
        }
    ]

    const verifyInputs = [
        {
            name: 'userName',
            label: lang.USERNAME,
            disabled: true,
            value: changerUserName,
            hidden: true
        },
        {
            name: 'resetCode',
            label: 'كود التحقق على ' + chosenMethod
        },
        {
            name: 'password',
            label: 'كلمه السر الجديده',
            direction: 'rtl',
            icon: <TbPasswordUser />,
            type: 'password',
            validation: Yup.string().required("مطلوب")
                .min(6, "يجب ان يكون على الاقل 6 حروف")
                .max(100, 'يجب ان يكون اقل من 100 حرف'),
        }, {
            name: 'confirmPassword',
            label: lang.CONFIRM_PASSWORD,
            type: 'password',
            icon: <TbPasswordUser />,
            validation: Yup.string().required("مطلوب")
                .min(6, "يجب ان يكون اكثر من 6").oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقه')
        },
    ]

    const triggerChangePassword = async (values, props) => {
        await verifyResetPassword({
            userName: changerUserName, ...values
        })
        props.resetFields()
    }
    return (

        <FlexColumn width={'100%'}>
            <Section>
                <Box>
                    <TitleWithDividers title={'هل نسيت كلمه السر ؟'} />

                    {(!status.isSuccess && (
                        <>
                            <Box sx={{ width: '100%' }}>
                                <ListMethods
                                    setMethod={setChosenMethod}
                                    methods={methods} activeMethod={chosenMethod}
                                    disabled={[senderConstants.WHATSAPP]} />
                            </Box>
                            {chosenMethod !== senderConstants.CONTACT && (
                                <>
                                    <Typography variant='body1'> * من فضلك ادخل اسم المستخدم الخاص بحسابك !</Typography>
                                    <Typography variant='body2'>سيتم ارسال رمز التحقق بواسطه {chosenMethod}</Typography>
                                    <MakeForm inputs={forgetInputs} status={status} onSubmit={triggerForgetPassword} />
                                </>
                            )}
                        </>
                    ))}

                    {/* {(chosenMethod === senderConstants.WHATSAPP && !status.isSuccess) && <> whatsApp </>} */}
                    {(chosenMethod !== senderConstants.CONTACT && status.isSuccess) && <Box sx={{ maxWidth: '500px' }}>
                        <MakeForm inputs={verifyInputs} status={verifyStatus} onSubmit={triggerChangePassword} />
                    </Box>}

                    {(chosenMethod === senderConstants.CONTACT && !status.isSuccess) && <FlexColumn>
                        <Typography sx={{ maxWidth: '250px' }}> إذا كنت قد نسيت كلمه السر, او تواجه مشكله فى تسجيل الدخول تواصل مع الدعم من الرقم المسجل به لاعاده ضبط الحساب
                        </Typography>
                        <FilledHoverBtn endIcon={<FcContacts />} onClick={() => {
                            window.location.href = "https://api.whatsapp.com/send?phone=" + '2001553251467' + "&text=" + 'لقد نسيت كلمه السر';
                        }}>
                            التوصل مع الدعم
                        </FilledHoverBtn>
                    </FlexColumn>}

                </Box>
            </Section>
        </FlexColumn>
    );
}
