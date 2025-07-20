import MakeForm from '../../tools/makeform/MakeForm'
import gradeConstants from '../../settings/constants/gradeConstants'

// icons
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoSchool } from "react-icons/io5";


import { lang } from '../../settings/constants/arlang';
import Section from '../../style/mui/styled/Section';

import usePostData from '../../hooks/usePostData'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray';

import * as Yup from "yup"
import { useCreateTagMutation } from '../../toolkit/apis/tagsApi';
import TitleWithDividers from '../ui/TitleWithDividers';

function CreateTag({ setReset, defaultGrade }) {

    const [sendData, status] = useCreateTagMutation()
    const [createTagFc] = usePostData(sendData)


    const inputs = [
        {
            name: 'name',
            label: lang.NAME,
            icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'description',
            label: 'الوصف',
            icon: <MdOutlineDriveFileRenameOutline color='green' />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'grade',
            label: lang.GRADE,
            type: 'select',
            value: defaultGrade,
            options: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
            icon: <IoSchool color='green' />,
            validation: Yup.string().required(lang.REQUERIED)

        },
    ]

    const onSubmit = async (values, props) => {
        await createTagFc(values)
        if (setReset) {
            setReset(pre => !pre)
        }
        props.resetForm()
    }
    return (
        <Section sx={{ width: '100%' }}>
            <TitleWithDividers title={'انشاء رابط'} />
            <MakeForm inputs={inputs} btnWidth={'100%'} status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default CreateTag
