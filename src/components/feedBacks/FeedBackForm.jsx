import RatingStyled from "../../style/mui/styled/RatingStyled"
import MakeForm from "../../tools/makeform/MakeForm"
import * as Yup from 'yup'

function FeedBackForm({ status, onSubmit }) {

    const inputs = [
        {
            name: 'user',
            hidden: true,
            disabled: true,
        },
        {
            name: 'subject',
            label: 'اسم الموضوع',
            validation: Yup.string().required()
        },
        {
            name: 'description',
            label: 'وصف الموضوع',
            rows: 6,
            variant: 'filled',
            validation: Yup.string().required()
        },
        {
            name: 'type',
            label: 'النوع',
            type: 'select',
            options: ['شكوى', 'اقتراح'],
            validation: Yup.string().required()

        }, {
            name: 'rating',
            label: 'تقييم',
            type: 'component',
            validation: Yup.number().required(),
            Component: ({ setValue, value }) => {
                return <RatingStyled value={value} title={'تقييم'} setValue={setValue} />
            }
        }
    ]

    return (
        <MakeForm
            inputs={inputs}
            status={status}
            onSubmit={onSubmit}
            modalInfo={{
                desc: 'سيتم ارسال البيانات وتاكد من توضيح فكرتك'
            }}
        />
    )
}

export default FeedBackForm
