import Section from "../../style/mui/styled/Section"

import { useCreateGroupMutation } from "../../toolkit/apis/groupsApi"
import usePostData from "../../hooks/usePostData"
import GroupForm from "./GroupForm"
import TitleWithDividers from "../ui/TitleWithDividers"

function CreateGroup({ setReset }) {

    const [sendData, status] = useCreateGroupMutation()
    const [createGroup] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        await createGroup(values)

        if (setReset) {
            setReset(pre => (!pre))
        }
        props.resetForm()
    }

    return (
        <Section>
            <TitleWithDividers title={'انشاء مجموعه'} />
            <GroupForm status={status} onSubmit={onSubmit} />
        </Section>
    )
}

export default CreateGroup
