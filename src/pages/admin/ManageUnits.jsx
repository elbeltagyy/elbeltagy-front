import { useState } from 'react'
import { FlexBetween, FlexRow } from '../../style/mui/styled/Flexbox'
import { StyledBtn } from '../../style/buttonsStyles'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import UnitCreate from '../../components/content/UnitCreate'
import { lang } from '../../settings/constants/arlang'
import SelectUnit from '../../components/content/SelectUnit'
import { IconButton } from '@mui/material'
import { orange, red } from '@mui/material/colors'
import { MdDeleteForever, MdEdit } from 'react-icons/md'

import UnitUpdate from '../../components/content/UnitUpdate'
import { useDeleteUnitMutation } from '../../toolkit/apis/unitsApi'
import usePostData from '../../hooks/usePostData'
import Loader from '../../style/mui/loaders/Loader'

function ManageUnits({ grade, activeUnit, setActiveUnit }) {

    const [openUnitModal, setUnitModal] = useState(false)
    const [units, setUnits] = useState([])

    const [open, setOpen] = useState(false)

    const [openDelete, setOpenDelete] = useState(false)
    const [sendDelete, deleteStatus] = useDeleteUnitMutation()
    const [deleteUnit] = usePostData(sendDelete)

    const deleteFc = async () => {
        await deleteUnit({ id: activeUnit })
        setActiveUnit('')
        setUnits(prev => {
            let prevUnits = [...prev]
            let filtered = prevUnits.filter(prevUnit => prevUnit._id === activeUnit)
            return filtered
        })
    }

    return (
        <>
            <FlexBetween gap={'10px'} m={'20px 0'}>
                <FlexRow gap={'4px'}>
                    <IconButton

                        sx={{
                            bgcolor: red[500],
                            '&:hover': {
                                bgcolor: red[600]
                            }
                        }}
                        disabled={!activeUnit || deleteStatus.isLoading}
                        onClick={() => setOpenDelete(true)}>
                        {deleteStatus.isLoading ? <Loader /> :
                            <MdDeleteForever color={'#fff'} opacity={!activeUnit ? .5 : 1} />
                        }
                    </IconButton>

                    <IconButton
                        sx={{
                            bgcolor: orange[500],
                            '&:hover': {
                                bgcolor: orange[600]
                            }
                        }}
                        disabled={!activeUnit}
                        onClick={() => setOpen(true)}>
                        <MdEdit color={'#fff'} opacity={!activeUnit ? .5 : 1} />
                    </IconButton>
                </FlexRow>

                <StyledBtn onClick={() => setUnitModal(true)} disabled={!grade}> {lang.CREATE_UNIT} </StyledBtn>
                <SelectUnit grade={grade} activeUnit={activeUnit} setActiveUnit={setActiveUnit} units={units} setUnits={setUnits} />
                {/* reset={[grade]} */}
            </FlexBetween>

            <ModalStyled open={openUnitModal} setOpen={setUnitModal} >
                <UnitCreate grade={grade} setUnits={setUnits} />
            </ModalStyled>

            <ModalStyled open={open} setOpen={setOpen}>
                <UnitUpdate units={units} activeUnit={activeUnit} setUnits={setUnits} />
            </ModalStyled>

            <ModalStyled open={openDelete} setOpen={setOpenDelete} action={deleteFc}
                title={'هل انت متاكد من حذف الوحده ؟'} desc={'يجب ان يكون كل الكورسات محذوفه !'} />
        </>
    )
}

export default ManageUnits
