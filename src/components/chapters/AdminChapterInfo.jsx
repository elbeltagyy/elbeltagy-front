import { IconButton, Typography } from "@mui/material"
import { FlexRow } from "../../style/mui/styled/Flexbox"
import InfoText from "../ui/InfoText"

import TabInfo from "../ui/TabInfo"
import { orange, red } from "@mui/material/colors"
import { MdDeleteForever, MdEdit } from "react-icons/md"

import BtnModal from "../ui/BtnModal"
import UpdateChapter from "./UpdateChapter"
import BtnConfirm from "../ui/BtnConfirm"

import { useDeleteChapterMutation } from "../../toolkit/apis/chaptersApi"
import usePostData from "../../hooks/usePostData"
import Loader from "../../style/mui/loaders/Loader"

function AdminChapterInfo({ chapter, setChapter, lecturesCount = '', deleteChapter, isNativeChapter }) {

    // const [sendData, updateStatus] = useUpdateChapterMutation()
    // const [updateChapter] = usePostData(sendData)

    // const onSubmit = async (values) => {
    //     const res = await updateChapter({ ...values, _id: chapter._id, id: chapter._id })
    //     setChapter({ ...chapter, ...res })
    // }

    const [sendDelete, deleteStatus] = useDeleteChapterMutation()
    const [deleteChapterFc] = usePostData(sendDelete)

    const deleteSubmit = async () => {
        await deleteChapterFc({ _id: chapter._id })
        deleteChapter({ _id: chapter._id })
    }

    return (
        <FlexRow gap={'12px'} sx={{ width: '100%', my: "16px" }}>
            {!isNativeChapter && <Typography color={'error.light'} fontSize={'12px'}>هذا الفصل تم ربطه من كورس اخر</Typography>}
            <InfoText label={'الاسم'} description={chapter.name} />
            <InfoText label={'الوصف'} description={chapter.description} />
            <TabInfo count={lecturesCount} title={'عدد المحاضرات'} i={1} isBold={false} />
            {isNativeChapter && (
                <>
                    <FlexRow gap={'4px'}>
                        <BtnModal
                            btn={<IconButton
                                // disabled={updateStatus.isLoading}
                                sx={{
                                    bgcolor: orange[500],
                                    '&:hover': {
                                        bgcolor: orange[600]
                                    }
                                }}>
                                {/* {updateStatus.isLoading ? <Loader /> : <MdEdit color={'#fff'} />} */}
                                <MdEdit color={'#fff'} />
                            </IconButton>}
                            component={<UpdateChapter chapter={chapter} setChapter={setChapter} />}
                        />

                        <BtnConfirm
                            modalInfo={{ desc: 'سيتم ازاله الفصل ' + chapter.name + ' وجميع المحاضرات الموجوده فى هذا الفصل (' + chapter.lectures?.length + ' محاضره)' }}
                            btn={<IconButton
                                disabled={deleteStatus.isLoading}
                                onClick={deleteSubmit}
                                sx={{
                                    bgcolor: red[500],
                                    '&:hover': {
                                        bgcolor: red[600]
                                    }
                                }}>
                                {deleteStatus.isLoading ? <Loader /> : <MdDeleteForever color={'#fff'} />}
                            </IconButton>} />
                    </FlexRow>
                </>
            )}
        </FlexRow>
    )
}

export default AdminChapterInfo
