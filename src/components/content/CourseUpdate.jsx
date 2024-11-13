import React, { useEffect, useState } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import { useUpdateCourseMutation } from '../../toolkit/apis/coursesApi'
import usePostData from '../../hooks/usePostData'
import { lang } from '../../settings/constants/arlang'

import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { AiFillPoundCircle } from "react-icons/ai";

import { VscSymbolBoolean } from "react-icons/vsc";


import * as Yup from "yup"
import { Box, FormControlLabel, Switch, Typography } from '@mui/material'
import { useField } from 'formik'
import MakeInput from '../../tools/makeform/MakeInput'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import dayjs from 'dayjs'

const PreDiscount = ({ props, value, input, inputName }) => {

    const [isPreDiscount, setPreDiscount] = useState(value ? true : false)

    useEffect(() => {
        setPreDiscount(value || value === 0 ? true : false)
    }, [value])

    useEffect(() => {
        props.setFieldValue(inputName, isPreDiscount ? value : '')
    }, [isPreDiscount])

    return <FlexRow sx={{
        justifyContent: 'space-between', gap: '10px'
    }}>
        <FormControlLabel control={<Switch checked={isPreDiscount} onChange={() => setPreDiscount(!isPreDiscount)} />} label="اضافه سعر قبل الخصم" />
        <Box sx={{ width: { xs: '100%', md: '40%' } }}>
            {isPreDiscount && (
                <MakeInput input={{ ...input, value: value }} props={props} />
            )}
        </Box>
    </FlexRow>
}


function CourseUpdate({ course, setCourse }) {

    const [sendData, status] = useUpdateCourseMutation()
    const [updateCourse] = usePostData(sendData)
    const inputs = [
        {
            name: '_id',
            label: '',
            value: course._id,
            hidden: true
        },
        {
            name: 'name',
            label: lang.COURSE_NAME,
            value: course.name,
            icon: <MdOutlineDriveFileRenameOutline />,
            validation: Yup.string().required(lang.REQUERIED)

        }, {
            name: 'description',
            label: lang.COURSE_DESCRIPTION,
            value: course.description,
            type: 'editor'
        }, {
            name: 'price',
            label: lang.PRICE,
            value: course.price,
            icon: <AiFillPoundCircle />,
            width: "100%",
            validation: Yup.number()
                .min(0, 'يجب ان يكون 0 او اكبر')
                .required(lang.REQUERIED),
        }, {
            name: 'preDiscount',
            label: 'السعر قبل الخصم',
            value: course.preDiscount,
            icon: <AiFillPoundCircle />,
            width: "100%",
            component: PreDiscount,
            validation: Yup.number()
                .nullable()
                .when('price', (price, schema) => {
                    return price != null
                        ? schema.moreThan(price, 'يجب ان يكون اكبر من السعر الفعلى')
                        : schema;
                }),
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'radio',
            value: course.isActive ?? false,
            options: [{ value: true, label: lang.ACTIVE }, { value: false, label: lang.NOT_ACTIVE }],
            icon: <VscSymbolBoolean />,
            width: "100%",
        }, {
            name: 'isMust',
            label: 'تفعيل اكمال المحاضرات',
            type: 'switch',
            value: course.isMust ?? false,
            icon: <VscSymbolBoolean />,
            width: "100%",
        }, {
            name: 'dateStart',
            label: 'تاريخ بدايه الكورس',
            type: 'fullDate',
            width: "100%",
            value: course.dateStart ? dayjs(course.dateStart) : null,

        }, {
            name: 'dateEnd',
            label: 'تاريخ نهايه الكورس',
            type: 'fullDate',
            width: "100%",
            value: course.dateEnd ? dayjs(course.dateEnd) : null,
            validation: Yup.mixed()
                .nullable()
                .when('dateStart', (dateStart, schema) =>
                    dateStart
                        ? schema.test(
                            'is-after-start-date',
                            'يجب ان يكون تاريخ النهايه بعد تاريخ البدايه',
                            (dateEnd) => {
                                if (dateEnd) {
                                    return dayjs(dateEnd).isAfter(dayjs(dateStart))
                                } else {
                                    return true
                                }
                            }
                        )
                        : schema
                ),
        }, {
            name: 'thumbnail',
            label: lang.THUMBNAIL,
            type: 'file',
            width: '100%',
            value: course.thumbnail,
            validation: Yup.mixed()
                .test({
                    message: 'Please provide a supported image typed(jpg or png)',
                    test: (file, context) => {
                        if (file && !file.url) {
                            if (file?.url) {
                                file.type = file.resource_type + "/" + file.format
                            }
                            const isValid = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file?.type);
                            if (!isValid) context?.createError();
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
                .test({
                    message: `يجب ان يكون حجم الملف اقل من ${Number(import.meta.env.VITE_MAX_IMAGE_SIZE_ADMIN) || 15} MB `,
                    test: (file) => {
                        if (file && file.size) {
                            const isValid = file?.size <= (import.meta.env.VITE_MAX_IMAGE_SIZE_ADMIN || 15) * 1024 * 1024; // 15MB
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
        },
    ]

    const onSubmit = async (values, props) => {
        const res = await updateCourse(values, true)
        if (setCourse) {
            setCourse(res)
        }
    }

    useEffect(() => {
        status.reset()
    }, [course._id])

    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
    )
}

export default CourseUpdate
