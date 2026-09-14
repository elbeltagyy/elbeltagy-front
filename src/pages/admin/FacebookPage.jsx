import { useEffect } from 'react'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { Alert, Avatar, Box, Chip, Grid, Stack, } from '@mui/material';
import { useState } from 'react';
import PageCard from '../../components/socials/PageCard';
import { useGetPagesQuery } from '../../toolkit/apis/socials/facebookApi';
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton';
import GetPagePosts from '../../components/socials/GetPagePosts';
import FacebookAuth from '../../components/socials/FacebookAuth';
import socialConstants from '../../settings/constants/socialConstants';

function FacebookPage() {
    const [pages, setPages] = useState([])
    const [page, setPage] = useState({})

    const { data, isLoading, isSuccess } = useGetPagesQuery()
    useEffect(() => {
        if (data?.values) {
            setPages(data.values)
            setPage(data.values[0])
        }
    }, [data, setPages])


    return (
        <Section>
            <TitleWithDividers title={'اداره صفحات الفيسبوك'} />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', bgcolor: 'background.alt', p: '12px 16px' }}>
                {/* Link To Page - unLink */}
                <FacebookAuth isShow={isSuccess} pages={pages} setPage={setPage} setPages={setPages} type={socialConstants.FACEBOOK} />

                {/* Pages */}
                {isLoading && <LoaderSkeleton />}
                <Grid container spacing={2} mb={3}>
                    {pages?.length ? pages.map((p) => <PageCard setPage={setPage} key={p.id} page={p} />) : <Alert severity='warning' >يمكنك اضافه صفحه الان من خلال الضغط على ربط المنصه بصفحه الفيسبوك</Alert>}
                </Grid>

                {/* Posts */}
                <Box>
                    {/* Page switcher */}
                    <Stack direction="row" gap={1} mb={3} flexWrap="wrap">
                        {pages.map((p) => (
                            <Chip key={p.id} onClick={() => setPage(p)} avatar={<Avatar src={p?.picture?.data?.url} sx={{ bgcolor: p.color + " !important", fontSize: "11px !important" }}>{p.avatar}</Avatar>}
                                label={p.name}

                                variant={page.id === p.id ? "filled" : "outlined"}
                                color={page.id === p.id ? "primary" : "default"}
                                sx={{ fontWeight: page.id === p.id ? 700 : 400 }}
                            />
                        ))}
                    </Stack>

                    {page?.id && (
                        <GetPagePosts page={page} key={page.id} />
                    )}
                </Box>
            </Box>
        </Section>
    )
}

export default FacebookPage