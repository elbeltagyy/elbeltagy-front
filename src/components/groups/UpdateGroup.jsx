import { memo, useState } from "react"
import usePostData from "../../hooks/usePostData"
import Section from "../../style/mui/styled/Section"
import { useUpdateGroupMutation } from "../../toolkit/apis/groupsApi"
import TitleWithDividers from "../ui/TitleWithDividers"
import GroupForm from "./GroupForm"

function UpdateGroup({ group, setReset }) {
    const [updateData, status] = useUpdateGroupMutation()
    const [updateGroup] = usePostData(updateData)

    const onSubmit = async (values, props) => {
        await updateGroup({ ...values, _id: group._id, id: group._id })
        // props.resetForm({ values })
        // update group so preValue changes
        if (setReset) {
            setReset(pre => !pre)
        }
    }

    return (
        <Section>
            <TitleWithDividers title={'تعديل :' + ' ' + group.name} />
            <GroupForm
                onSubmit={onSubmit} status={{ ...status }} isResetNewVal={true}
                enableReinitialize={false} group={{ ...group }} />
        </Section>
    )
}
export default memo(UpdateGroup)
