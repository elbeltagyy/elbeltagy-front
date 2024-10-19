import React from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import sectionConstants from '../../settings/constants/sectionConstants'
import { lang } from '../../settings/constants/arlang'
import dayjs from 'dayjs'


const durationRegex = /^(?:(?:\d+)\s*[hms]?)(?:\s+(?:(?:\d+)\s*[hms]))*$/;



function ExamForm({ lecture, status, onSubmit }) {

    const questionSchema = {
        title: "",
        hints: "",
        image: "",
        rtOptionId: "",
        points: 1,
        options: [
            {
                id: uuidv4(),
                title: "",
                image: ""
            }, {
                id: uuidv4(),
                title: "",
                image: ""

            }, {
                id: uuidv4(),
                title: "",
                image: ""

            }, {
                id: uuidv4(),
                title: "",
                image: ""

            }
        ]
    }

    const optionSchema = [
        {
            id: uuidv4(),
            title: ""
        }
    ]

    //lecture info
    const lectureInfoInputs = [
        {
            name: 'sectionType',
            label: '',
            value: sectionConstants.EXAM,
            hidden: true,
        }, {
            name: 'grade',
            label: '',
            value: lecture?.grade,
            hidden: true,
        }, {
            name: 'course',
            label: '',
            value: lecture?.course,
            hidden: true,
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
            value: lecture.name ?? ''
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            rows: 11,
            value: lecture.description ?? ''
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'switch',
            value: lecture.isActive ?? true,
        }
    ]

    //exam info => in update nested
    const inputs = [...lectureInfoInputs,
    {
        name: "attemptsNums",
        label: "عدد المحاولات",
        type: 'number',
        value: lecture?.exam?.attemptsNums ?? 1,
        validation: Yup.string()
            .required(lang.REQUERIED)
    }, {
        name: "dateStart",
        label: "تاريخ البدء",
        type: 'fullDate',
        value: lecture?.exam?.dateStart ? dayjs(lecture.exam.dateStart) : null,
    }, {
        name: "dateEnd",
        label: "تاريخ الغاء الاختبار",
        type: 'fullDate',
        value: lecture?.exam?.dateEnd ? dayjs(lecture.exam.dateEnd) : null,
    }, {
        name: "showAnswersDate",
        label: "تاريخ اظهار الايجابات",
        type: 'fullDate',
        value: lecture?.exam?.showAnswersDate ? dayjs(lecture.exam.showAnswersDate) : null,
    }, {
        name: "isShowAnswers",
        label: "هل تريد اظهار الايجابات",
        type: 'switch',
        value: lecture?.exam?.isShowAnswers ?? true,
    }, {
        name: "time",
        label: "الوقت",
        value: lecture?.exam?.time ?? '15m',
        validation: Yup.string()
            .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
            .required(lang.REQUERIED),
    }, {
        name: "questions",
        label: "الاسئله ==>",
        value: lecture?.exam?.questions ?? [],
        schema: questionSchema, //
        addLabel: "اضافه سؤال", // add schema for reply this field in main values
        removeLabel: "ازاله السؤال", //
        type: "chunk", //
        array: [ //inputs control to values of schema
            {
                name: "title",
                label: "العنوان",
            }, {
                name: "hints",
                label: "ملحوظه",
            }, {
                name: "image",
                label: "اضافه صوره",
                type: "file",
                disabled: false
            }, {
                name: "points",
                label: "عدد النقاط",
                type: "number",
                value: 1
            }, {
                type: 'header',
                title: 'الاختيارات'
            }, {
                name: "rtOptionId",
                label: "الايجابه الصحيحه",
                disabled: true,
                hidden: true
            }, {
                name: "options",
                type: "array",
                value: [],
                schema: optionSchema,
                array: [
                    {
                        name: "id",
                        label: "...",
                        disabled: true,
                        hidden: true,
                    }, {
                        name: "title",
                        label: "الايجابه",
                        choose: "rtOptionId",
                        from: 'id'
                    }
                ]
            },
        ], validation:
            Yup.array()
                .of(
                    Yup.object().shape({
                        title: Yup.string().required(lang.REQUERIED),
                        rtOptionId: Yup.string().required('اختر الايجابه الصحيحه'),
                        options: Yup.array().of(
                            Yup.object().shape({
                                title: Yup.string().required(lang.REQUERIED),
                            })
                        )
                    })
                )
                .required('يجب ان يكون هناك اسئله') // these constraints are shown if and only if inner constraints are satisfied
                .min(2, 'سؤالين على الاقل')
        ,
    }
    ]

    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
    )
}

export default ExamForm
