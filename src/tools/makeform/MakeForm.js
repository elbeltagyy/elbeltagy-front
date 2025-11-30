import { useState } from 'react'
import CreateFormik from './CreateFormik'
import WrapperHandler from '../WrapperHandler'
import ModalStyled from '../../style/mui/styled/ModalStyled'

export default function MakeForm({ inputs, status = {}, onSubmit, btnWidth,
    enableReinitialize = true, modalInfo, formDirection, btnStyle, submitBtnStatus = false,
    disabledBtn, allowDirty, preValue = null, isResetNewVal = false, isAllDisabled }) {

    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(null)
    const [props, setProps] = useState(null)

    const openModal = (values, props) => {
        setValues(values)
        setProps(props)
        setOpen(true)
    }

    const handleSubmit = async () => {
        setOpen(false)
        await onSubmit(values, props)
        if (isResetNewVal) {
            props.resetForm({ values })
        }
    }

    return (
        <>
            <CreateFormik
                inputs={inputs} isAllDisabled={isAllDisabled}
                onSubmit={openModal}
                status={{ ...status }} btnWidth={btnWidth} enableReinitialize={enableReinitialize}
                formDirection={formDirection} btnStyle={btnStyle}
                submitBtnStatus={submitBtnStatus}
                disabledBtn={disabledBtn} allowDirty={allowDirty}
                preValue={preValue}
            />
            <WrapperHandler status={status} showSuccess={true} />
            <ModalStyled open={open} setOpen={setOpen} title={modalInfo?.title || ""} desc={modalInfo?.desc || ''} action={handleSubmit} />
        </>
    )
}