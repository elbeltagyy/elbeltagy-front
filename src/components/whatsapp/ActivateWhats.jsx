import { Box } from '@mui/material'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { useLazyInitWhatsappQuery } from '../../toolkit/apis/whatsappApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import WrapperHandler from '../../tools/WrapperHandler'
import Loader from '../../style/mui/loaders/Loader'
import { FlexRow } from '../../style/mui/styled/Flexbox'

import DeactivateWhats from './DeactivateWhats'
import { useState } from 'react'
import Image from '../ui/Image'

function ActivateWhats() {

    const [getData, status] = useLazyInitWhatsappQuery()
    const [initWhatsFc] = useLazyGetData(getData, true)
    const [qr, setQr] = useState()

    const initWhats = async () => {
        const res = await initWhatsFc()
        setQr(res)
        console.log(res)
    }

    return (
        <Box>
            <FlexRow sx={{ flexDirection: 'row', width: '100%', gap: '12px' }}>
                <WrapperHandler width='fit-content' status={status} showSuccess={true}>
                    <FilledHoverBtn
                        disabled={status.isLoading || status.isFetching}
                        onClick={initWhats}>
                        {status.isLoading ? <Loader color={'#fff'} /> : 'تفعيل الواتس'}
                    </FilledHoverBtn>
                </WrapperHandler>
                <DeactivateWhats />
            </FlexRow>


            {qr && (
                <Image img={qr} maxWidth='50vh' />
            )}
        </Box>
    )
}

export default ActivateWhats
