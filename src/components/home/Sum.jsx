import { Box, Typography, useTheme } from "@mui/material";
import { FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox";
import Section from "../../style/mui/styled/Section";
import RotatingTriangle from "./RotatingTriangle";
import { FilledHoverBtn } from "../../style/buttonsStyles";
import { Link } from "react-router-dom";

function Sum() {
  const theme = useTheme()
  return (
    <Section>
      {/* <Typography variant="banner" component={'h2'} textAlign={'center'} sx={{ whiteSpace: 'balance' }} mb={4}>المعادله باختصار</Typography> */}
      <FlexRow sx={{ gap: 3, alignItems: 'center', flexWrap: { sm: 'wrap', md: 'wrap', lg: 'nowrap' }, justifyContent: 'center' }}>

        <Box sx={{
          p: '22px 16px', bgcolor: 'background.alt',
          height: "fit-content", borderRadius: '22px 22px 50% 22px', alignItems: 'center',
          flex: 1
        }}>
          <FlexColumn flexDirection={'column'} gap={1}>
            <Typography variant="h4" component={'h2'} fontFamily={'second'} color={'primary.main'}>مستر البلتاجي مش مجرد مدرس !</Typography>
            <FlexRow sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
              <Typography variant="subtitle1"> ● ده هيفهمك وهيخليك تحل عشان تكون جاهز لاي سؤال</Typography>
              <Typography variant="subtitle1">● بيوفرلك كل اللي تحتاجه من اول المتابعه لغايه الدعم الفني والعلمي والنفسي </Typography>
              <Typography variant="subtitle1"> ● ده اب و اخ وصاحب ليك قبل ما يكون مدرس ليك </Typography>

            </FlexRow>

            <FilledHoverBtn component={Link} to={'/signup'} size="large" sx={{ borderRadius: '6px', m: '28px auto' }}>انضم لعيله البلتاجي !</FilledHoverBtn>
          </FlexColumn>
        </Box>

        <Box position={'relative'}>
          <Typography variant="subBanner" fontFamily={'second'} color={'primary.main'} sx={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' }}>إفهم</Typography>
          <Typography variant="subBanner" fontFamily={'second'} color={'primary.main'} sx={{ position: 'absolute', bottom: '27.5%', }}>طبّق</Typography>
          <Typography variant="subBanner" fontFamily={'second'} color={'primary.main'} sx={{ position: 'absolute', right: '5%', bottom: '27.5%' }}>حِل</Typography>
          <RotatingTriangle circleFill={theme.palette.background.alt} />
        </Box>
      </FlexRow>
    </Section>
  );
}

export default Sum;