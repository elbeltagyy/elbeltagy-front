import React, { memo } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import Section from '../../style/mui/styled/Section'
import { useCreateUnitMutation, useUpdateUnitMutation } from '../../toolkit/apis/unitsApi'
import usePostData from '../../hooks/usePostData'
import TitleWithDividers from '../ui/TitleWithDividers'

function UnitUpdate({ activeUnit, units, setUnits }) {

    const [sendData, status] = useUpdateUnitMutation()
    const [updateUnit] = usePostData(sendData)

    const unit = units.find(u => u?._id === activeUnit)
    const onSubmit = async (values, props) => {
        const res = await updateUnit(values)
        setUnits(pre => {
            let units = [...pre]
            units.forEach(prevUnit => {
                if (prevUnit._id !== res._id) {
                    return res
                } else {
                    return prevUnit
                }
            })

            return units
        })
    }

    const inputs = [
        {
            name: 'id',
            label: "",
            hidden: true,
            value: unit._id
        }, {
            name: 'grade',
            label: "",
            hidden: true,
            value: unit.grade
        },
        {
            name: 'name',
            label: "اسم الوحده",
            value: unit.name
        },
    ]


    return (
        <Section sx={{ minWidth: '250px' }}>
            <TitleWithDividers title={'تعديل الوحده'} />
            <MakeForm inputs={inputs} btnWidth={'100%'} onSubmit={onSubmit} status={status} enableReinitialize={true} />
        </Section>
    )
}

export default memo(UnitUpdate)
