import MakeForm from '../../tools/makeform/MakeForm'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import sectionConstants from '../../settings/constants/sectionConstants'
import { lang } from '../../settings/constants/arlang'
import dayjs from 'dayjs'
import LinkToQuestion from './LinkToQuestion'
import { memo } from 'react'
import examMethods, { getExamMethod } from '../../settings/constants/examMethods'
import { isDevelop } from '../../tools/isDevelop'
import { durationRegex } from '../content/LectureForm'



function ExamForm({ lecture, status, onSubmit }) {

    const questionSchema = {
        title: "",
        hints: "",
        image: "",
        rtOptionId: "",
        points: 1,
        grade: lecture.grade,
        isShuffle: true,
        clarifyText: '',
        clarifyUrl: '',
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
            label: 'section',
            value: sectionConstants.EXAM,
            hidden: false,
            disabled: true,
            validation: Yup.string()
                .required(lang.REQUERIED),
            column: 1,
            row: 1
        }, {
            name: 'grade',
            label: '',
            value: lecture?.grade,
            hidden: true,
            validation: Yup.string()
                .required(lang.REQUERIED),
        }, {
            name: 'course',
            label: '',
            value: lecture?.course,
            hidden: true,
            validation: Yup.string()
                .required(lang.REQUERIED),
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
            value: lecture.name ?? '',
            validation: Yup.string()
                .required(lang.REQUERIED),
            column: 1,
            row: 2,
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            rows: 10,
            value: lecture.description ?? '',
            validation: Yup.string()
                .required(lang.REQUERIED),
            column: 2,
            row: 1,
            rowSpan: 3, // to match height of 3 rows in column 1
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'switch',
            value: lecture.isActive ?? true,
            column: 1,
            row: 5,
        }, {
            name: 'method',
            label: 'اختر نوع الاختبار',
            type: 'select',
            value: lecture?.exam?.method ?? getExamMethod({ isDefault: true, key: 'value' }),
            options: examMethods,
            column: 1,
            row: 3,
            validation: Yup.string()
                .required(lang.REQUERIED),
        }, {
            name: "isTime",
            label: "هل تريد تفعيل التوقيت فى الاختبار",
            type: 'switch',
            value: lecture?.exam?.isTime ?? true,
            column: 1,
            row: 3,
        }, {
            name: "dateStart",
            label: "تاريخ تفعيل الاختبار",
            type: 'fullDate',
            value: lecture?.dateStart ? dayjs(lecture.dateStart) : null,
            column: 3,
            row: 1,
        }, {
            name: "dateEnd",
            label: "تاريخ الغاء الاختبار",
            type: 'fullDate',
            value: lecture?.dateEnd ? dayjs(lecture.dateEnd) : null,
            column: 3,
            row: 2,
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
            name: "attemptsNums",
            label: "عدد المحاولات",
            type: 'number',
            value: lecture?.exam?.attemptsNums ?? 1,
            validation: Yup.number()
                .required(lang.REQUERIED),
            column: 1,
            row: 4
        },
        {
            name: "showAnswersDate",
            label: "تاريخ اظهار الايجابات",
            type: 'fullDate',
            value: lecture?.exam?.showAnswersDate ? dayjs(lecture.exam.showAnswersDate) : null,
            column: 3,
            row: 3,
        }, {
            name: "isShowAnswers",
            label: "هل تريد اظهار الايجابات",
            type: 'switch',
            value: lecture?.exam?.isShowAnswers ?? true,
            column: 3,
            row: 3,
        }, {
            name: "time",
            label: "الوقت",
            value: lecture?.exam?.time ?? '15m',
            validation: Yup.string()
                .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
                .required(lang.REQUERIED),
            column: 1,
            row: 4
        }, {
            name: 'price',
            label: 'السعر',
            type: 'number',
            value: lecture?.price ?? 0,
            column: 2
        }, {
            name: 'isSalable',
            label: 'قابله للبيع',
            type: 'switch',
            value: lecture?.isSalable ?? true,
            column: 3
        }, {
            name: "linkedQuestions",
            component: LinkToQuestion
        },
    ]

    //exam info => in update nested
    const inputs = [...lectureInfoInputs, {
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
            }, {
                type: 'header',
                title: 'الاختيارات'
            }, {
                name: "isShuffle",
                label: "هل تريد جعل الاختيارات عشوائيه؟",
                type: 'switch',
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
            {
                name: "clarifyText",
                label: "ايضافه توضيح لايجابه (يظهر عن عرض الحل)",
                rows: 4,
                variant: 'filled'
            }, {
                name: "clarifyUrl",
                label: "ايضافه لينك فيديو (يظهر عن عرض الحل)",
                type: "url",
                player: "youtube"
            },
        ], validation:
            Yup.array()
                .of(
                    Yup.object().shape({
                        title: Yup.string().required(lang.REQUERIED),
                        rtOptionId: Yup.string().required('اختر الايجابه الصحيحه'),
                        image: Yup.mixed()
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
                            }),
                        options: Yup.array().of(
                            Yup.object().shape({
                                title: Yup.string().required(lang.REQUERIED),
                            })
                        )
                    })
                )
                .required('يجب ان يكون هناك اسئله') // these constraints are shown if and only if inner constraints are satisfied
                .min(isDevelop ? 1 : 5, 'يجب إنشاء 5 اسئله على الاقل !')
        ,
    }
    ]

    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} enableReinitialize={false} />
    )
}

export default memo(ExamForm)