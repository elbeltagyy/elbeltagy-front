import ListMethods from "../../style/mui/styled/ListMethods"
import MakeForm from "../../tools/makeform/MakeForm"
import { useEffect, useState } from "react"
import { makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import { useStartQuestionBankMutation } from "../../toolkit/apis/questionsApi"
import { useSelector } from "react-redux"
import { useLazyGetTagsQuery } from "../../toolkit/apis/tagsApi"
import useLazyGetData from "../../hooks/useLazyGetData"
import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import Loader from "../../style/mui/loaders/Loader"
import TabInfo from "../ui/TabInfo"
import usePostData from "../../hooks/usePostData"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'
import examMethods from "../../settings/constants/examMethods"
import { isDevelop } from "../../tools/isDevelop"
import { Alert, Box, Typography } from "@mui/material"
import PaymentMethods from "../payment/PaymentMethods"
import products from "../../settings/constants/products"

function UserQuestionsBank({ grade }) {
    const navigate = useNavigate()

    const [sendData, status] = useStartQuestionBankMutation()
    const [startBank] = usePostData(sendData)

    //Tags Handel
    const [chosenTags, setChosenTags] = useState([])
    const [getData, { isLoading }] = useLazyGetTagsQuery()
    const [getTagsFc] = useLazyGetData(getData)

    const [methods, setMethods] = useState([])
    const fetchFc = async () => {
        const res = await getTagsFc({ isActive: true, grade, counting: true }, true)
        const methods = res.tags.map(tag => {
            return {
                value: tag._id, label: tag.name, description: tag.description,
                icon: <TabInfo count={tag.unansweredCount + '/' + tag.count} i={tag.unansweredCount === 0 ? 3 : 1} />,
                overlay: !tag.access && <Box onClick={() => {
                    setTagToPay(tag)
                    setOpen(true)
                }}

                    sx={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: '#00000073', zIndex: 2, cursor: 'pointer' }
                    }>
                    <Typography sx={{ color: 'grey.0', bgcolor: 'primary.main', width: 'fit-content', height: 'fit-content' }}>
                        {tag.price || tag.price === 0 || tag.price === '0' ? ` شراء الاسئله بسعر ${tag.price} جنيه` : 'هذا الدرس غير متاح لك حاليا'}
                    </Typography>
                </Box>,
                disabled: tag.unansweredCount === 0
            }
        })
        setMethods(methods)
    }

    useEffect(() => {
        fetchFc()
    }, [grade])

    //Payments
    const [open, setOpen] = useState(false)
    const [tagToPay, setTagToPay] = useState()

    const handelResponse = (res) => {
        // console.log('respo ==>', res)
        const modifiedMethods = methods.map(method => {
            if (method.value === res.tag) {
                delete method.overlay
            }
            return method
        })
        setMethods(modifiedMethods)
    }

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
                if (methods?.length === 0) return <Alert severity="warning" variant="filled">لا يوجد دروس متاحه حاليا</Alert>
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

        // if (res.length > 0) {
        //     navigate('/exams/' + values.method, {
        //         state: { questions: res, method: values.method, name: 'بنك الاسئله : ' + res.length + ' اسئله' }
        //     })
        // }

        if (Array.isArray(res) && res.length > 0) {
            setTimeout(() => {
                navigate(`/exams/${encodeURIComponent(values.method)}`, {
                    state: {
                        questions: res,
                        method: values.method,
                        name: `بنك الاسئله : ${res.length} اسئله`
                    }
                });
            }, 100);
        }
        //exams/_id
    }

    const setCoupon = (coupon) => {
        setTagToPay({
            ...tagToPay, ...coupon
        })
    }
    return (
        <div>
            <MakeForm modalInfo={{ desc: 'فلتستمع ولتجب جيدا على الاسئله, حظا سعيدا' }} inputs={inputs} onSubmit={onSubmit} status={status} />
            <PaymentMethods
                open={open} setOpen={setOpen}
                title={'الاشتراك فى الرابط' + ' :' + tagToPay?.name}
                subTitle={'الاشتراك فى الرابط' + ' :' + tagToPay?.name}
                setCoupon={setCoupon}
                tag={tagToPay?._id} handelResponse={handelResponse}
                price={tagToPay?.price} invoiceNameId={'tag'}
            />
        </div>
    )
}

export default UserQuestionsBank
