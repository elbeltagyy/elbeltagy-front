import React, { useState } from 'react'
import { FlexBetween } from '../../style/mui/styled/Flexbox'
import { StyledBtn } from '../../style/buttonsStyles'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import UnitCreate from '../../components/content/UnitCreate'
import { lang } from '../../settings/constants/arlang'
import SelectUnit from '../../components/content/SelectUnit'

function ManageUnits({ grade, activeUnit, setActiveUnit }) {

    const [openUnitModal, setUnitModal] = useState(false)
    const [units, setUnits] = useState([])

    return (
        <>
            <FlexBetween gap={'10px'} m={'20px 0'}>
                <StyledBtn onClick={() => setUnitModal(true)} disabled={!grade}> {lang.CREATE_UNIT} </StyledBtn>
                <SelectUnit grade={grade} activeUnit={activeUnit} setActiveUnit={setActiveUnit} reset={[grade]} units={units} setUnits={setUnits} />
            </FlexBetween>

            <ModalStyled open={openUnitModal} setOpen={setUnitModal} >
                <UnitCreate grade={grade} setUnits={setUnits} />
            </ModalStyled>
        </>
    )
}

export default ManageUnits
