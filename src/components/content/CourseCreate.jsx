import React, { memo, useEffect, useState } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import Section from '../../style/mui/styled/Section'
import usePostData from '../../hooks/usePostData'
import TitleWithDividers from '../ui/TitleWithDividers'
import { useCreateCourseMutation } from '../../toolkit/apis/coursesApi'
import { lang } from '../../settings/constants/arlang'
import { VscSymbolBoolean } from 'react-icons/vsc'
import { AiFillPoundCircle } from 'react-icons/ai'

import * as Yup from "yup"
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import dayjs from 'dayjs'
import PreDiscount from './PreDiscount'

function CourseCreate({ unit, grade, setCourses }) {

    const [sendData, status] = useCreateCourseMutation()
    const [createCourse] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await createCourse(values, true)
        setCourses(pre => { return [...pre, res] })
        props.resetForm()
    }

    const inputs = [
        {
            name: 'unit',
            label: "",
            hidden: true,
            value: unit
        }, {
            name: 'grade',
            label: "",
            hidden: true,
            value: grade
        },
        {
            name: 'name',
            label: lang.COURSE_NAME,
            icon: <MdOutlineDriveFileRenameOutline />,
            validation: Yup.string().required(lang.REQUERIED)
        }, {
            name: 'description',
            label: "Course description",
            type: 'editor',
            validation: Yup.string().required(lang.REQUERIED)

        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'radio',
            options: [{ value: true, label: lang.ACTIVE }, { value: false, label: lang.NOT_ACTIVE }],
            icon: <VscSymbolBoolean />,
            value: true
        }, {
            name: 'isMust',
            label: 'تفعيل اكمال المحاضرات',
            type: 'switch',
            icon: <VscSymbolBoolean />,
            value: true
        }, {
            name: 'price',
            label: lang.PRICE,
            icon: <AiFillPoundCircle />,
            width: "40%",
            validation: Yup.number()
                .min(0, 'يجب ان يكون 0 او اكبر')
                .required(lang.REQUERIED),
        }, {
            name: 'preDiscount',
            label: 'السعر قبل الخصم',
            icon: <AiFillPoundCircle />,
            width: "100%",
            component: PreDiscount,
            validation: Yup.number()
                .nullable() // Allow null or undefined
                .when('price', (price, schema) => {
                    return price
                        ? schema.min(price, 'يجب ان يكون اكبر من السعر الفعلى')
                        : schema // No validation if price is not provided
                }
                )
        }, {
            name: 'dateStart',
            label: 'تاريخ بدايه الكورس',
            type: 'fullDate',
            width: "100%",
        }, {
            name: 'dateEnd',
            label: 'تاريخ نهايه الكورس',
            type: 'fullDate',
            width: "100%",
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
            validation: Yup.mixed()
                .required(lang.REQUERIED)
                .test({
                    message: 'Please provide a supported image typed(jpg or png or webp)',
                    test: (file, context) => {
                        if (file) {
                            if (file?.url) {
                                file.type = file.resource_type + "/" + file.format //look
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
                    message: `يجب ان يكون حجم الملف اقل من ${(import.meta.env.VITE_MAX_IMAGE_SIZE_ADMIN || 15)} MB `,
                    test: (file) => {
                        if (file) {
                            const isValid = file?.size <= (import.meta.env.VITE_MAX_IMAGE_SIZE_ADMIN || 15) * 1024 * 1024; // 15MB
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
        },
    ]


    return (
        <Section sx={{ minWidth: '250px' }}>
            <TitleWithDividers title={'انشاء كورس'} />
            <MakeForm inputs={inputs} btnWidth={'100%'} onSubmit={onSubmit} status={status} enableReinitialize={true} />
        </Section>
    )
}

export default memo(CourseCreate)
