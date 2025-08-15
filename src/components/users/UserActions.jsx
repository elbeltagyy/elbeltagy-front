import { Button, Typography } from "@mui/material"
import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import { useDeleteUserMutation, useUpdateUserMutation } from "../../toolkit/apis/usersApi"
import usePostData from "../../hooks/usePostData"
import ModalStyled from "../../style/mui/styled/ModalStyled"
import { useState } from "react"
import WrapperHandler from "../../tools/WrapperHandler"
import Loader from "../../style/mui/loaders/Loader"

import { CiEdit } from "react-icons/ci";

import TextBorderAround from "../ui/TextBorderAround"
import { GridDeleteIcon } from "@mui/x-data-grid"
import { FaUserMinus } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

function UserActions({ user, setUser, setReset = null }) {

    const [sendData, updateStatus] = useUpdateUserMutation()
    const [updateUser] = usePostData(sendData)
    const refresh = () => {
        if (setReset) {
            setReset(p => !p)
        }
    }

    const updateFc = async (valueObj) => {
        const res = await updateUser({ _id: user._id, ...valueObj })
        if (setUser) {
            setUser({ ...user, ...res })
        }
        refresh()
    }

    const [sendDelete, deleteStatus] = useDeleteUserMutation()
    const [deleteUser] = usePostData(sendDelete)

    const deleteFc = async () => {
        await deleteUser(user)
        setUser()
        refresh()
    }

    const [modalDesc, setModalDesc] = useState()
    const [action, setAction] = useState()
    const [open, setOpen] = useState(false)

    const onOpen = (valueAction, modalInfo) => {
        setAction(() => valueAction)
        if (modalInfo) {
            setModalDesc(modalInfo)
        } else {
            setModalDesc()
        }
        setOpen(true)
    }

    return (
        <FlexColumn gap={'16px'}>
            <TextBorderAround>تعديل البيانات</TextBorderAround>
            <FlexRow gap={'16px'}>

                <WrapperHandler status={updateStatus} showSuccess={true}>
                    <Button
                        color='warning'
                        variant='contained'
                        disabled={user?.isResetPassword || updateStatus.isLoading}

                        endIcon={<CiEdit />}

                        onClick={() => onOpen(() => updateFc({ password: 'reset' }))}>
                        {updateStatus.isLoading ? <Loader /> : 'اعاده ضبط كلمه السر'}
                    </Button>
                </WrapperHandler>

                <WrapperHandler status={updateStatus} showSuccess={true}>
                    <Button color={user.isActive ? 'error' : 'success'} variant='contained'
                        disabled={updateStatus.isLoading}
                        endIcon={user.isActive ? <FaUserMinus /> : <FaUserPlus />}
                        onClick={() => onOpen(() => updateFc({ isActive: !user.isActive }))} >
                        {updateStatus.isLoading ? <Loader color={'#fff'} /> : user?.isActive ? 'الغاء تفعيل' : 'تفعيل'}
                    </Button>
                </WrapperHandler>

                <WrapperHandler status={deleteStatus} showSuccess={true}  >
                    <Button color='error' variant='outlined'
                        disabled={deleteStatus?.isLoading}
                        endIcon={<GridDeleteIcon />}
                        onClick={() => onOpen(deleteFc, {
                            title: 'هل انت متاكد من حذف المستخدم؟ا',
                            desc: 'سيتم ازاله جميع بيانات المستخدم , لن تستطيع استرجاع البيانات نهائيا'
                        })}>
                        {deleteStatus.isLoading ? <Loader /> : 'ازاله المستخدم'}

                    </Button>
                </WrapperHandler>

            </FlexRow>

            <ModalStyled open={open} setOpen={setOpen} action={action} title={modalDesc?.title} desc={modalDesc?.desc} />
        </FlexColumn>
    )
}

export default UserActions
