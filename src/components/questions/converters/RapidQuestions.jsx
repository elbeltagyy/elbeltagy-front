import { IoSchool } from "react-icons/io5"
import { lang } from "../../../settings/constants/arlang"
 
import Section from "../../../style/mui/styled/Section"
import { makeArrWithValueAndLabel } from "../../../tools/fcs/MakeArray"
import TitleWithDividers from "../../ui/TitleWithDividers"
import { v4 as uuidv4 } from 'uuid'
import MakeForm from "../../../tools/makeform/MakeForm"
import useGrades from "../../../hooks/useGrades"

function RapidQuestions({ title, appendQuestions }) {
    const {grades} = useGrades()
    const optionSchema = () => ({
        id: uuidv4(),
        title: ""
    })

    const inputs = [
        {
            name: "numbers",
            label: "عدد الاسئله",
            type: "number",
            helperText: 'قم باختيار الصور ثم سيتم انشاء عدد اسئله متطابقه للاعداد طبقا لعدد الصور واذا لم يوجد صور يتم انشاء عدد اسئله طبقا للرقم هنا واذا كان هناك صور يتم طرح عدد الاسئله ليتم انشاء العدد المناسب',
            column: 1, row: 0
        },
        {
            label: 'صور الاسئله',
            name: 'images',
            type: 'file',
            column: 1, row: 1,
            multiple: true
        }, {
            name: "title",
            label: "العنوان",
            rows: 3,
            type: "editor",
            column: 1, row: 2
        }, {
            name: 'grade',
            label: lang.GRADE,
            type: 'select',
            options: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
            icon: <IoSchool color='green' />,
            column: 1, row: 3
        }, {
            name: "hints",
            label: "ملحوظه",
            column: 1, row: 3
        }, {
            name: "points",
            label: "عدد النقاط",
            type: "number",
            value: 1,
            column: 1, row: 3
        }, {
            type: 'header',
            title: 'الإختيارات'
        }, {
            name: "isShuffle",
            label: "هل تريد جعل الإختيارات عشوائيه؟",
            type: 'switch',
            value: true
        }, {
            name: "options",
            type: "array",
            addLabel: "إضافه اختيار",
            removeLabel: "ازاله اختيار",
            value: [],
            schema: optionSchema,
            isSchemaFc: true,
            array: [
                {
                    name: "id",
                    label: "...",
                    disabled: true,
                    hidden: true,
                }, {
                    name: "title",
                    label: "الإجابه",
                    // choose: "rtOptionId",
                    from: 'id',
                    rows: 3,

                }
            ]
        }, {
            name: "clarifyText",
            label: "إضافة توضيح لايجابه (يظهر عن عرض الحل)",
            rows: 2,
            variant: 'filled'
        }, {
            name: "clarifyUrl",
            label: "إضافة لينك فيديو (يظهر عن عرض الحل)",
            type: "url",
            player: "youtube"
        },
    ]

    const onSubmit = (values) => {
        const staticConfigs = {
            title: values.title,
            grade: values.grade,
            hints: values.hints,

            points: values.points,
            isShuffle: values.isShuffle,
            options: values.options.flat(),
            clarifyUrl: values.clarifyUrl, clarifyText: values.clarifyText
        }
        const questionsWitchImages = values.images ? values.images.map((img) => {
            return {
                ...staticConfigs,
                image: img,
            }
        }) : []
        const restLength = values.numbers - questionsWitchImages.length && values.numbers - questionsWitchImages.length

        const mergedQuestions = values.numbers && restLength && Array.from({ length: restLength }, () => ({ ...staticConfigs }));
        const questions = [...questionsWitchImages, ...mergedQuestions]

        appendQuestions(questions)
    }

    return (
        <Section>
            <TitleWithDividers
                title={title}
                desc="اختر الصور و عدد الاسئله"
            />
            <MakeForm inputs={inputs} onSubmit={onSubmit} />
        </Section>
    )
}

export default RapidQuestions
