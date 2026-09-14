import { Chip, IconButton, Typography, useTheme } from '@mui/material'
import TabInfo from '../ui/TabInfo'
import { useGetWhatsappStatusQuery } from '../../toolkit/apis/whatsappApi'
import { useEffect, useState } from 'react'
import { FlexRow } from '../../style/mui/styled/Flexbox'

import { HiOutlineRefresh } from 'react-icons/hi'

function GetWhatsStatus({ setWhatsStatus }) {
    const { data, isLoading, isSuccess, refetch, isFetching } = useGetWhatsappStatusQuery()
    const [reset, setReset] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        refetch()
    }, [reset])

    useEffect(() => {
        if (setWhatsStatus) {
            setWhatsStatus(data?.values?.isActive || false)
        }
    }, [data, isLoading])

    return (
        <FlexRow gap={'12px'}>
            <IconButton disabled={isLoading} onClick={() => {
                setReset(!reset)
            }}>
                <HiOutlineRefresh style={{ animation: (isFetching) && 'rotate .5s linear 0s infinite', color: theme.palette.primary.main }} />
            </IconButton>
            <Typography> حاله الواتس </Typography>
            {isLoading ? <TabInfo count={'loading...'} i={0} /> :
                (isSuccess && data?.values?.isActive) ? <FlexRow gap={'8px'}>
                    <TabInfo count={'active'} i={1} />
                    {data?.values?.recordMessages ? <Chip size='small' variant='outlined' label={'سيتم حفظ الرسائل'} color='primary' /> : <Chip size='small' variant='outlined' color='error' label={'لا يتم حفظ الرسائل'} />}
                </FlexRow> :
                    <TabInfo count={'Not active'} i={3} sx={{ fontSize: '8px' }} />}
        </FlexRow>
    )
}

export default GetWhatsStatus
