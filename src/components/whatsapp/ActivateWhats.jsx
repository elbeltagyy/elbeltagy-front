import { Box } from '@mui/material'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { useInitWhatsappMutation } from '../../toolkit/apis/whatsappApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import WrapperHandler from '../../tools/WrapperHandler'
import Loader from '../../style/mui/loaders/Loader'
import { FlexRow } from '../../style/mui/styled/Flexbox'

import DeactivateWhats from './DeactivateWhats'
import { useState } from 'react'
import Image from '../ui/Image'
import BtnConfirm from '../ui/BtnConfirm'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import usePostData from '../../hooks/usePostData'

function ActivateWhats() {

    const [sendData, status] = useInitWhatsappMutation()
    const [initWhatsFc] = usePostData(sendData)
    const [qr, setQr] = useState()
    const [recordMessages, setRecordMessages] = useState(false)

    const initWhats = async () => {
        const res = await initWhatsFc({ recordMessages })
        setQr(res)
    }


    return (
        <Box>
            <FlexRow sx={{ flexDirection: 'row', width: '100%', gap: '12px' }}>
                <WrapperHandler width='fit-content' status={status} showSuccess={true}>
                    <BtnConfirm
                        component={<SwitchStyled checked={recordMessages} onChange={setRecordMessages} label={'هل تريد حفظ و تسجيل الرسائل والمحادثات على المنصه'} />}
                        btn={<FilledHoverBtn
                            disabled={status.isLoading || status.isFetching}
                            onClick={initWhats}>
                            {status.isLoading ? <Loader color={'#fff'} /> : 'تفعيل الواتس'}
                        </FilledHoverBtn>} />
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
