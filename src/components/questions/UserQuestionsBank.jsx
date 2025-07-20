import ListMethods from "../../style/mui/styled/ListMethods"
import MakeForm from "../../tools/makeform/MakeForm"
import { useEffect, useState } from "react"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import { useStartQuestionBankMutation } from "../../toolkit/apis/questionsApi"
import { useSelector } from "react-redux"
import { useLazyGetTagsQuery } from "../../toolkit/apis/tagsApi"
import useLazyGetData from "../../hooks/useLazyGetData"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import Loader from "../../style/mui/loaders/Loader"
import TabInfo from "../ui/TabInfo"
import usePostData from "../../hooks/usePostData"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'
import examMethods from "../../settings/constants/examMethods"
import { isDevelop } from "../../tools/isDevelop"

function UserQuestionsBank() {
    const navigate = useNavigate()

    const [sendData, status] = useStartQuestionBankMutation()
    const [startBank] = usePostData(sendData)

    //Tags Handel
    const [chosenTags, setChosenTags] = useState([])
    const { user } = useSelector(s => s.global)
    const [getData, { isLoading }] = useLazyGetTagsQuery()
    const [getTagsFc] = useLazyGetData(getData)

    const [methods, setMethods] = useState([])
    const fetchFc = async () => {
        const res = await getTagsFc({ isActive: true, grade: user.grade, counting: true })
        const methods = res.tags.map(tag => {
            return { value: tag._id, label: tag.name, description: tag.description, icon: <TabInfo count={tag.unansweredCount + '/' + tag.count} i={1} /> }
        })
        setMethods(methods)
    }

    useEffect(() => {
        if (methods?.length === 0) {
            fetchFc()
        }
    }, [user.grade])


    const inputs = [
        {
            name: 'number',
            label: 'اختر عدد الاسئله',
            type: 'number',
            width: '45%',
            validation: yup.number().required().min(isDevelop ? 1 : 5, 'اقل عدد من الاسئله هو 5') // *_*
        }, {
            name: 'method',
            label: 'طريقه التصحيح',
            type: 'select',
            options: makeArrWithValueAndLabel(examMethods, { value: 'value', label: 'label' }),
            width: '45%',
            validation: yup.string().required()
        }, {
            title: 'اختر المواضيع',
            type: 'header',
        }, {
            name: 'tags',
            validation: yup.array().min(1, 'اختر واحد على الاقل !'),
            Component: ({ setValue }) => {

                useEffect(() => {
                    setValue(chosenTags)
                }, [chosenTags])

                if (isLoading) return <FlexColumn><Loader sx={{ textAlign: 'center' }} /> </FlexColumn>

                return <ListMethods
                    disableP={true}
                    itemWidth='fit-content'
                    sx={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', }}
                    activeMethod={chosenTags} setMethod={setChosenTags} isMulti={true}
                    methods={methods} />
            }
        }
    ]

    const onSubmit = async (values) => {
        const res = await startBank(values)

        if (res.length > 0) {
            navigate('/exams/' + values.method, {
                state: { questions: res, method: values.method, name: 'بنك الاسئله : ' + res.length + ' اسئله' }
            })
        }
        //exams/_id
    }
    return (
        <div>
            <MakeForm modalInfo={{ desc: 'فلتستمع ولتجب جيدا على الاسئله, حظا سعيدا' }} inputs={inputs} onSubmit={onSubmit} status={status} />
        </div>
    )
}

export default UserQuestionsBank
