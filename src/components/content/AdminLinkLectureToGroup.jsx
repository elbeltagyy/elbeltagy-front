import { Box } from "@mui/material"

import { useLazyGetGroupsQuery } from "../../toolkit/apis/groupsApi"
import useLazyGetData from "../../hooks/useLazyGetData"
import AutoCompleteStyled from "../../style/mui/styled/AutoCompleteStyled"

function AdminLinkLectureToGroup({ lecture, setLectures, status }) {

    const [getData] = useLazyGetGroupsQuery()
    const [getGroups] = useLazyGetData(getData)

    const trigger = async () => {
        const res = await getGroups({}, true)
        return res.groups
    }

    const onSubmit = async (chosenValues) => {
        await setLectures({ id: lecture._id, groups: chosenValues })
    }

    return (
        <Box sx={{  width: '100%' }}>
            <AutoCompleteStyled
                label="المجموعات"
                fetchFc={trigger}
                sendFc={onSubmit}
                status={status}
                filterKey="name"
                isLoading={false}
                defaultValues={lecture?.groups || []}
            />
        </Box>
    )
}

export default AdminLinkLectureToGroup
