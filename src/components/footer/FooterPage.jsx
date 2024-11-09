import { IconButton, Typography } from '@mui/material'

import Section from '../../style/mui/styled/Section'
import Image from '../ui/Image'
import Separator from '../ui/Separator'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { lang } from '../../settings/constants/arlang'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function FooterPage() {

    const user = useSelector(s => s.global.user)

    const whatsText = user?.role ? `اسم المستخدم: ${user.userName}%0A%0Aالاسم: ${user.name}` : 'غير مسجل'

    return (
        <Section sx={{ minHeight: '60vh', bgcolor: "rgb(18, 20, 27)" }}>
            <FlexColumn gap={'12px'}>

                <Image img={'/assets/logo.png'} maxWidth='160px' ratio={'auto'} />
                <Typography variant='h5' sx={{ color: 'grey.0', fontFamily: '"Changa", sans-serif' }}>
                    {lang.LOGO}
                </Typography>
                <Typography noWrap component={Link} to={'/privacy'} sx={{ cursor: 'pointer', color: 'grey.200', textDecoration: 'underline' }}>سياسات المنصه !</Typography>
                <Separator sx={{ width: '80vw' }} />

                <FlexRow justifyContent={'center'} >
                    <IconButton component={Link} to={'https://www.facebook.com/Elbeltagy.Geo?mibextid'}>
                        <Image img={'/assets/facebook.png'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                    <IconButton component={Link} to={'https://youtube.com/@mohammedelbltagy?si=iGiK5HHUyvo8Uyye'}>
                        <Image img={'/assets/youtube.png'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                    <IconButton component={Link} to={"https://api.whatsapp.com/send?phone=empty&text=" + whatsText}>
                        <Image img={'/assets/whatsapp.png'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                    <IconButton component={Link} to={'https://t.me/mrmoelbeltagy'}>
                        <Image img={'/assets/telegram.png'} maxWidth='50px' ratio={'auto'} />
                    </IconButton>
                </FlexRow>

                <Typography variant='body2' sx={{ color: "grey.0", textAlign: 'center' }}>
                    اصل الجيولوجيا والعلوم المتكامله مع مستر البلتاجى وحوش الجيولوجيا
                </Typography>
                <Separator sx={{ borderColor: 'grey.100', borderWidth: '1px', width: '40vw' }} />

                <FlexRow sx={{ gap: '8px' }}>
                    <Typography sx={{ color: "primary.600" }}>
                        &lt;/ ME&gt;
                    </Typography>
                    <Typography sx={{ color: "grey.0" }}>
                        All Rights Reserved {new Date().getFullYear()}
                    </Typography>
                    <Typography sx={{ color: "primary.600" }}>
                        &lt;ME&gt;
                    </Typography>
                </FlexRow>
                <Typography component={Link} to={"https://api.whatsapp.com/send?phone=2001001902943&text=" + 'from Elbeltagy Platform'} variant='body2' sx={{ color: "grey.0", textDecoration: 'none' }} noWrap>
                    تم التطوير بواسطه <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>ME Group Innovations</span>
                </Typography>
                <Image sx={{ borderRadius: 0, my: '12px' }} img={'/assets/megroup-footer.png'} maxWidth="120px" ratio={'auto'} />
            </FlexColumn>
        </Section>
    )
}

export default FooterPage
