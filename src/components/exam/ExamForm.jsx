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
import useQuestionsSchema from '../questions/useQuestionsSchema'
import { useField } from 'formik'
import MakeInput from '../../tools/makeform/MakeInput'

const TimeInput = ({ value, input }) => {
    const [{ value: isTime }] = useField('isTime')

    return <>
        {isTime && (
            <MakeInput input={{ ...input, value: value }} />
        )}
    </>

}

function ExamForm({ lecture, status, onSubmit }) {
    const questionsSchema = useQuestionsSchema({ grade: lecture.grade, questions: lecture?.exam?.questions ?? [] })

    // const questionSchema = {
    //     title: "",
    //     hints: "",
    //     image: "",
    //     rtOptionId: "",
    //     points: 1,
    //     grade: lecture.grade,
    //     isShuffle: true,
    //     clarifyText: '',
    //     clarifyUrl: '',
    //     options: [
    //         {
    //             id: uuidv4(),
    //             title: "",
    //             image: ""
    //         }, {
    //             id: uuidv4(),
    //             title: "",
    //             image: ""

    //         }, {
    //             id: uuidv4(),
    //             title: "",
    //             image: ""

    //         }, {
    //             id: uuidv4(),
    //             title: "",
    //             image: ""
    //         }
    //     ]
    // }

    // const optionSchema = [
    //     {
    //         id: uuidv4(),
    //         title: ""
    //     }
    // ]

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
            component: TimeInput,

            validation: Yup.string()
                // .required(lang.REQUERIED)
                .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط'),
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
    const inputs = [...lectureInfoInputs, ...questionsSchema]

    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} enableReinitialize={false} />
    )
}

export default memo(ExamForm)