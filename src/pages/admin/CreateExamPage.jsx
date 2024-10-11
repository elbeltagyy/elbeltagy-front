import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLazyGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import MakeForm from '../../tools/makeform/MakeForm'

import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Loader from '../../style/mui/loaders/Loader'
import { lang } from '../../settings/constants/arlang'
import sectionConstants from '../../settings/constants/sectionConstants'
import usePostData from '../../hooks/usePostData'

import { useCreateExamMutation } from '../../toolkit/apis/lecturesApi'
import { useUploadFilesMutation } from '../../toolkit/apis/filesApi'

const durationRegex = /^(?:(?:\d+)\s*[hms]?)(?:\s+(?:(?:\d+)\s*[hms]))*$/;

function CreateExamPage() {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const [course, setCourse] = useState()

    const [getData] = useLazyGetOneCourseQuery()
    const [getCourse] = useLazyGetData(getData)

    const [uploadedFilesList, setUploadedFilesList] = useState([])
    const [uploadData, { isLoading }] = useUploadFilesMutation()
    const [uploadFiles] = usePostData(uploadData)

    useEffect(() => {
        const trigger = async () => {
            const res = await getCourse({ _id: courseId, select: "name grade" })
            setCourse(res)
        }
        trigger()
    }, [courseId])

    const [sendData, status] = useCreateExamMutation()
    const [createExam] = usePostData(sendData)

    const onSubmit = async (values) => {
        let exam = JSON.parse(JSON.stringify(values));
        let images = [];

        //create images
        values.questions.forEach((question, i) => {
            if (question.image) {
                images.push(values.questions[i].image);
                exam.questions[i].image = images.length - 1;
            } else {
                delete exam.questions[i].image
            }
        });

        //upload images
        let savedFiles = uploadedFilesList || []
        if (uploadedFilesList.length !== images.length && images.length !== 0) {
            savedFiles = await uploadFiles({ files: [...images] }, true)
            setUploadedFilesList(savedFiles)
        }

        //modify questions with images
        exam.questions.forEach((question, i) => {
            if (question.image || Number(question.image) === 0) {
                const imageIndex = Number(question.image)
                question.image = savedFiles[imageIndex];
            }
        });

        //saving Exam
        const res = await createExam(exam)
        console.log('res ==.', res)
        navigate(-1, { replace: true })
    }

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

    const lectureInfoInputs = [
        {
            name: 'sectionType',
            label: '',
            value: sectionConstants.EXAM,
            hidden: true,
        }, {
            name: 'grade',
            label: '',
            value: course?.grade,
            hidden: true,
        }, {
            name: 'course',
            label: '',
            value: courseId,
            hidden: true,
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            rows: 11,
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'switch',
            value: true,
        }
    ]

    const inputs = [...lectureInfoInputs,
    {
        name: "attemptsNums",
        label: "عدد المحاولات",
        type: 'number',
        value: 1,
        validation: Yup.string()
            .required(lang.REQUERIED)
    }, {
        name: "dateStart",
        label: "تاريخ البدء",
        type: 'fullDate',
        value: null,
    }, {
        name: "showAnswersDate",
        label: "تاريخ اظهار الايجابات",
        type: 'fullDate',
        value: null,
    }, {
        name: "isActive",
        label: "الحاله (فعال)",
        type: 'switch',
        value: true,
    }, {
        name: "isShowAnswers",
        label: "هل تريد اظهار الايجابات",
        type: 'switch',
        value: true,
    }, {
        name: "time",
        value: '15m', //seconds
        label: "الوقت",
        validation: Yup.string()
            .matches(durationRegex, 'ارقام فقط, غير مسموح بوجود مساحات, h,m,s فقط')
            .required(lang.REQUERIED),
    }, {
        name: "questions",
        label: "الاسئله ==>",
        value: [],
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

    if (!course) return <Loader />

    return (
        <Section>
            <TitleWithDividers title={'انشاء اختبار : ' + course.name} />
            <MakeForm inputs={inputs} onSubmit={onSubmit} status={{ ...status, isLoading: isLoading || status.isLoading || false }} />
        </Section>
    )
}

export default CreateExamPage
