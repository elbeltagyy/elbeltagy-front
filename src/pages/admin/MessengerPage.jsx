import { Avatar, Box, Chip, Stack } from "@mui/material"
import FacebookAuth from "../../components/socials/FacebookAuth"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import socialConstants from "../../settings/constants/socialConstants"
import Section from "../../style/mui/styled/Section"
import { useGetPagesQuery } from "../../toolkit/apis/socials/facebookApi"
import { useState } from "react"
import { useEffect } from "react"
import MessengerConversations from "../../components/socials/MessengerConversations"

function MessengerPage() {
    const [pages, setPages] = useState([])
    const [page, setPage] = useState({})

    const { data, isSuccess } = useGetPagesQuery({ type: socialConstants.MESSENGER })
    useEffect(() => {
        if (data?.values) {
            setPages(data.values)
            setPage(data.values[0])
        }
    }, [data, setPages])


    return (
        <Section>
            <TitleWithDividers title={'اداره رسائل ماسنجر'} desc="يرجي العلم انه يمكن ارسال الرسائل فى خلال 24 ساعه من بعد اخر رساله" />
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', bgcolor: 'background.alt', p: '12px 16px' }}>
                <FacebookAuth
                    pages={pages}
                    setPages={setPages}
                    setPage={setPage} isShow={isSuccess} type={socialConstants.MESSENGER} />

                {/* Conversations */}
                <Box>
                    {/* Page switcher */}
                    <Stack direction="row" gap={1} mb={3} flexWrap="wrap">
                        {pages.map((p) => (
                            <Chip key={p.id} onClick={() => setPage(p)} avatar={<Avatar
                                src={page.picture.data.url}
                                sx={{ bgcolor: p.color + " !important", fontSize: "11px !important", }}>{p.avatar}</Avatar>}
                                label={p.name}
                                variant={page.id === p.id ? "filled" : "outlined"}
                                color={page.id === p.id ? "primary" : "default"}
                                sx={{ fontWeight: page.id === p.id ? 700 : 400 }}
                            />
                        ))}
                    </Stack>
                    {page?.id && (
                        <MessengerConversations pageId={page.id} key={page.id} />
                    )}
                </Box>
            </Box>
        </Section>
    )
}

export default MessengerPage