import { Typography } from "@mui/material"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import SwitchStyled from "../../style/mui/styled/SwitchStyled"
import { memo, useMemo } from "react"
import _ from 'lodash';
import TabInfo from "../../components/ui/TabInfo";
import { useField } from "formik";

function QNotSchema({ freeze, setFreeze, origin }) {

    // const origin = props.getFieldMeta('questions')?.value[currentValueIndex]
    const [{ value: linkedQuestions }] = useField('linkedQuestions')

    const current = linkedQuestions.find(l => l._id === origin._id)
    const hasChanged = useMemo(() => !_.isEqual(origin, current), [origin, current]);

    return (
        <FlexColumn sx={{ m: '12px 16px' }}>
            <Typography variant='body1'>
                هذا السؤال من بنك الأسئلة, اذا قمت بتعديل السؤال الان سيتم حفظه كسؤال جديد!
            </Typography>
            <SwitchStyled label={freeze ? 'تجميد السؤال' : 'هل تريد التعديل؟'} checked={freeze} onChange={setFreeze} />
            {hasChanged && <TabInfo sx={{ mr: 'auto', textDecoration: 'underline' }} count={'*سيتم إنشاء سؤال جديد دون تغيير السؤال الاساسي*'} i={1} />}
        </FlexColumn>
    )
}

export default memo(QNotSchema)
