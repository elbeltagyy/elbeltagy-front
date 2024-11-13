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
import { TbPasswordUser } from "react-icons/tb";

import { lang } from '../../settings/constants/arlang';
import Section from '../../style/mui/styled/Section';
import { useCreateUserMutation } from '../../toolkit/apis/usersApi';

import usePostData from '../../hooks/usePostData'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray';
import { user_roles } from '../../settings/constants/roles';

import * as Yup from "yup"

function CreateUserForm({ setReset }) {

  const [sendData, status] = useCreateUserMutation()
  const [createUser] = usePostData(sendData)


  const inputs = [
    {
      name: 'name',
      label: lang.NAME,
      width: { xs: '100%', md: '49%' },
      icon: <MdOutlineDriveFileRenameOutline color='green' />,
      validation: Yup.string().required(lang.REQUERIED)
        .matches(/^\s*(\S+\s+){2}\S+\s*$/, "يجب ان يكون 3 كلمات"),
    }, {
      name: 'userName',
      label: lang.USERNAME,
      width: { xs: '100%', md: '49%' },
      icon: <MdOutlineDriveFileRenameOutline color='green' />,
      validation: Yup.string()
      .required(lang.REQUERIED)
      .matches(/^[a-z0-9@.]+$/, "Only lowercase letters, numbers, '@', and '.' are allowed")
      .min(6, 'يجب ان يكون على الاقل 6 حروف')
      .max(100, 'يجب ان يكون اقل من 100 حرف'),
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
      validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم")

    }, {
      name: 'familyPhone',
      label: lang.FAMILY_PHONE,
      width: { xs: '100%', md: '49%' },
      icon: <PiPhoneDisconnectFill color='green' />,
      validation: Yup.string().required(lang.REQUERIED).matches(/^[0-9]{11}$/, "يجب ان يكون 11 رقم")
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
      options: makeArrWithValueAndLabel(governments, { value: 'id', label: 'governorate_name_ar' }),
      icon: <RiGovernmentFill color='green' />,
      value: 4,
      validation: Yup.string().required(lang.REQUERIED)

    }, {
      name: 'role',
      label: lang.ROLE,
      type: 'select',
      options: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.STUDENT, user_roles.ONLINE, user_roles.INREVIEW],
      value: user_roles.STUDENT
    }, {
      name: 'password',
      label: lang.PASSWORD,
      icon: <TbPasswordUser color='green' />,
      validation: Yup.string().required("مطلوب").min(6, "يجب ان يكون اكثر من 6")

    }, {
      name: 'confirmPassword',
      label: lang.CONFIRM_PASSWORD,
      icon: <TbPasswordUser color='green' />,
      validation: Yup.string().required("مطلوب")
        .min(6, "يجب ان يكون اكثر من 6").oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقه')
    },
  ]

  const onSubmit = async (values, props) => {
    await createUser(values)
    if (setReset) {
      setReset(pre => !pre)
    }
    props.resetForm()
  }
  return (
    <Section>
      <MakeForm inputs={inputs} btnWidth={'100%'} status={status} onSubmit={onSubmit} />
    </Section>
  )
}

export default CreateUserForm
