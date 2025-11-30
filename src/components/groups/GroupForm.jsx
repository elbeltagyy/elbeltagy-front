import * as Yup from "yup"
import { memo, useMemo } from "react"
import { DAYES_AR } from "../../settings/constants/dateConstants"
import MakeForm from "../../tools/makeform/MakeForm"
import { IoSchool } from "react-icons/io5"
import { green } from "@mui/material/colors"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import useGrades from "../../hooks/useGrades"


function GroupForm({ status, onSubmit, group = {}, enableReinitialize = false, isResetNewVal }) {
    const { grades } = useGrades()

    const daySchema = {
        time: '',
        dayIndex: ''
    }
    const DAYES_FORMAT = useMemo(() => {
        return DAYES_AR.map((day, i) => ({ label: day, value: i }))
    }, [])

    const inputs = [
        {
            name: "grade",
            label: 'اختر الصف الدراسى',
            validation: Yup.string().required(),
            type: 'select',
            options: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
            icon: <IoSchool size={'1.5rem'} color={green[500]} />,
        }, {
            name: "name",
            label: "اسم المجموعه",
            validation: Yup.string().required("مطلوب"),
        }, {
            name: "days",
            type: 'array',
            add: daySchema,
            addLabel: "ايضافه يوم",
            removeLabel: "ازاله يوم",
            validation:
                Yup.array()
                    .of(
                        Yup.object().shape({
                            time: Yup.string().required("الوقت مطلوب"),
                            dayIndex: Yup.number().required("اختر اليوم"),
                        })
                    )
            // .required('Must have friends')
            // .min(1, 'Minimum of 1 questions')
            ,
            array: [
                {
                    name: "dayIndex",
                    type: 'select',
                    label: "اليوم",
                    options: DAYES_FORMAT
                },
                {
                    name: 'time',
                    type: 'time',
                    label: "الوقت",
                },
            ]
        }
    ]

    return (
        <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} preValue={group} enableReinitialize={enableReinitialize} isResetNewVal={isResetNewVal} />
    )
}

export default memo(GroupForm)
