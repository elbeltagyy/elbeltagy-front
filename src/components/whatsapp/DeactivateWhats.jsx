import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import WrapperHandler from '../../tools/WrapperHandler'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { orange, red } from '@mui/material/colors'
import Loader from '../../style/mui/loaders/Loader'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { useLazyCloseWhatsQuery } from '../../toolkit/apis/whatsappApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import SwitchStyled from '../../style/mui/styled/SwitchStyled'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../ui/TitleWithDividers'

function DeactivateWhats() {

    const [open, setOpen] = useState(false)
    const [isLogout, setLogout] = useState(false)

    const [sendData, status] = useLazyCloseWhatsQuery()
    const [closeWhats] = useLazyGetData(sendData)

    return (
        <FlexRow>
            <WrapperHandler width='fit-content' status={status} showSuccess={true}>
                <FilledHoverBtn
                    disabled={status.isLoading || status.isFetching}
                    colorm={red[500]}
                    onClick={() => setOpen(true)}
                >
                    {status.isLoading ? <Loader color={'#fff'} /> : 'الغاء تفعيل الواتس'}
                </FilledHoverBtn>
            </WrapperHandler>

            <ModalStyled open={open} setOpen={setOpen}>
                <Section>
                    <TitleWithDividers title={'الغاء تفعيل الواتس'} />
                    <FlexColumn gap={'16px'}>
                        <SwitchStyled
                            checked={isLogout}
                            isLoading={status.isLoading}
                            label={'هل تريد تسجيل الخروج ؟'}
                            onChange={() => setLogout(!isLogout)}
                        />
                        <FilledHoverBtn colorm={'orange'} onClick={() => {
                            setOpen(false)
                            closeWhats({ isLogout })
                        }}>
                            {isLogout ? 'الغاء التفعيل و تسجيل الخروج' : 'الغاء تفعيل الواتس'}
                        </FilledHoverBtn>
                    </FlexColumn>
                </Section>
            </ModalStyled>
        </FlexRow >
    )
}

export default DeactivateWhats
