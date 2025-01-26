import Section from '../../style/mui/styled/Section'
import BannerIcon from '../../components/ui/BannerIcon'
import { IoIosCreate } from 'react-icons/io'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { Box } from '@mui/material'
import { useGetPrivaciesQuery } from '../../toolkit/apis/privacyApi'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import SEOHelmetAsync from '../../tools/SEOHelmetAsync'


function PrivacyPage() {

    const { data, isLoading } = useGetPrivaciesQuery({ isActive: true })

    if (isLoading || !data) return <LoaderSkeleton />

    return (
        <Section>

            <SEOHelmetAsync
                title={'Privacy - السياسات الخاصه بمنصه البلتاجى'}
                desc={"كل التفاصيل الخاصه بمنصه البلتاجى , بطل تضيع وقت وابدا يلا "}
                url={"https://mrelbeltagy.com/privacy"}
                isSiteLink={true}
            />

            {/* <Helmet>
                <title>Privacy - السياسات الخاصه بمنصه البلتاجى</title>
                <meta name="description" content="كل التفاصيل الخاصه بمنصه البلتاجى , بطل تضيع وقت وابدا يلا " />
                <meta property="og:title" content=" السياسات الخاصه بمنصه البلتاجى" />
                <meta property="og:description" content="كل التفاصيل الخاصه بمنصه البلتاجى , بطل تضيع وقت وابدا يلا " />
                <meta property="og:url" content="https://mrelbeltagy.com/privacy" />
                <meta property="og:image" content="/assets/logo.webp" />
                <meta property="og:site_name" content="Elbeltagy Platform" />
            </Helmet> */}


            <BannerIcon title={'سياسات المنصه'} bgcolor='primary.main' icon={<IoIosCreate style={{
                width: '3rem', height: '3rem', color: '#fff'
            }} />} />
            <FlexColumn sx={{ alignItems: "flex-start" }}>

                {data && data.values.privacy.map((privacy, i) => {
                    return (
                        <FlexColumn key={i} sx={{ alignItems: "flex-start", width: '100%' }}>
                            <TitleWithDividers title={privacy.title} />
                            <Box sx={{ p: '16px', bgcolor: 'background.alt', width: '100%' }}>
                                <span dangerouslySetInnerHTML={{ __html: privacy.description }} />
                            </Box>
                        </FlexColumn>
                    )
                })}

            </FlexColumn>

        </Section>
    )
}

export default PrivacyPage
