
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'
import MakeForm from '../../tools/makeform/MakeForm'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'
import { IoSchool } from 'react-icons/io5'

function QuestionsForm({ onSubmit, status, questions = null, metaData = { isAdd: true, isDelete: true } }) {
    const questionSchema = {
        title: "",
        hints: "",
        image: "",
        rtOptionId: "",
        points: 1,
        isShuffle: true,
        clarifyText: '',
        clarifyUrl: '',
        grade:  '', //Number(localStorage.getItem("grade")) ??
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

    //exam info => in update nested
    const inputs = [
        {
            name: "questions",
            label: "الاسئله ==>",
            schema: questionSchema,
            value: questions || [questionSchema], //Clone it, not Acc to Schema
            addLabel: metaData.isAdd && "اضافه سؤال",
            removeLabel: metaData.isAdd && "ازاله السؤال",
            startNums: 1,

            type: "chunk",
            array: [ //inputs control to values of schema
                {
                    name: "title",
                    label: "العنوان",
                }, {
                    name: 'grade',
                    label: lang.GRADE,
                    type: 'select',
                    options: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name', isNumber: true }),
                    icon: <IoSchool color='green' />,
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
            ],
            validation:
                Yup.array()
                    .of(
                        Yup.object().shape({
                            title: Yup.string().required(lang.REQUERIED),
                            rtOptionId: Yup.string().required('اختر الايجابه الصحيحه'),
                            grade: Yup.string().required(''),
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
                    .min(1, '1 على الاقل') // *_*
            ,
        }
    ]

    return (
        <div>
            <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} enableReinitialize={false} />
        </div>
    )
}

export default QuestionsForm
