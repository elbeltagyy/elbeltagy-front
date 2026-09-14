import { Avatar, Box, Card, CardContent, Grid, Link as LinkCompo, Stack, Typography } from "@mui/material";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : n;

function PageCard({ page, setPage }) {
    return (
        <Grid item xs={12} sm={6} md={4} key={page.id} >
            <Card elevation={2} sx={{ cursor: "pointer", "&:hover": { boxShadow: 5 }, transition: "box-shadow .2s" }} onClick={() => setPage(page)}>
                <Box component={'img'} src={page.cover.source} sx={{ maxWidth: '940px', maxHeight: '150px', bgcolor: page.coverColor || 'primary.main' }} />
                <CardContent sx={{ pt: 0 }}>
                    <Avatar sx={{ bgcolor: page.color, width: 80, height: 80, fontWeight: 800, mt: -5.5, border: "3px solid white", mb: 1 }} src={page.picture.data.url}>I</Avatar>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        {/* <InfoText label={'اسم الصفحه'} description={page.name} /> */}
                        <Typography fontWeight={800}>{page.name}</Typography>
                        {<GridCheckCircleIcon sx={{ fontSize: 15, color: "primary.main" }} />}
                    </Stack>
                    <Stack flexDirection={'column'} gap={.1}>
                        <Typography variant="caption" color="text.secondary" sx={{ opacity: .5 }}>{page.category}</Typography>
                        <LinkCompo component={Link} to={page.link} variant="caption" color="primary.light">فتح فى الفيسبوك</LinkCompo>
                    </Stack>
                    <Stack direction="row" gap={2} mt={1}>
                        <Box><Typography fontWeight={700} fontSize={14}>{fmt(page.followers_count)}</Typography><Typography variant="caption" color="text.secondary">Followers</Typography></Box>
                        <Box><Typography fontWeight={700} fontSize={14}>{fmt(page.fan_count)}</Typography><Typography variant="caption" color="text.secondary">Fan Count</Typography></Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default PageCard