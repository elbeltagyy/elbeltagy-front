import Section from '../../style/mui/styled/Section'
import BannerIcon from '../../components/ui/BannerIcon'
import { IoIosCreate } from 'react-icons/io'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { Box } from '@mui/material'
import { useGetPrivaciesQuery } from '../../toolkit/apis/privacyApi'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import SEOHelmetAsync from '../../tools/SEOHelmetAsync'
import { lang } from '../../settings/constants/arlang'


function PrivacyPage() {

    const { data, isLoading } = useGetPrivaciesQuery({ isActive: true })

    if (isLoading || !data) return <LoaderSkeleton />

    return (
        <Section>
            <SEOHelmetAsync
                title={lang.Privacy.title}
                desc={lang.Privacy.description}
                url={lang.Website + "/privacy"}
                isSiteLink={true}
            />

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
