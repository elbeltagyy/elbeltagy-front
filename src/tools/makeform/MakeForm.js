import { useState } from 'react'
import CreateFormik from './CreateFormik'
import WrapperHandler from '../WrapperHandler'
import ModalStyled from '../../style/mui/styled/ModalStyled'

export default function MakeForm({ inputs, status, onSubmit, btnWidth, enableReinitialize = true, modalInfo, formDirection, btnStyle, submitBtnStatus = false }) {

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
    }

    return (
        <>
            <CreateFormik
                inputs={inputs}
                onSubmit={openModal}
                status={status} btnWidth={btnWidth} enableReinitialize={enableReinitialize}
                formDirection={formDirection} btnStyle={btnStyle}
                submitBtnStatus={submitBtnStatus}
            />
            <WrapperHandler status={status} showSuccess={true} />
            <ModalStyled open={open} setOpen={setOpen} title={modalInfo?.title || ""} desc={modalInfo?.desc || ''} action={handleSubmit} />
        </>
    )
}