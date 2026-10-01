import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Grid, Stack, Typography, Chip, Avatar, Button,
  List, ListItem, ListItemIcon, ListItemText, GlobalStyles,
  Alert,
  useTheme,
} from '@mui/material';
import {
  CheckCircleRounded, AccessTimeRounded, PlayLessonRounded,
  StarRounded, WorkspacePremiumRounded,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import useGrades from '../../hooks/useGrades';
import { useLazyGetUnitsQuery } from '../../toolkit/apis/unitsApi';
import useLazyGetData from '../../hooks/useLazyGetData';
import { useSelector } from 'react-redux';
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox';
import TitleSection from '../../components/ui/TitleSection';
import { lang } from '../../settings/constants/arlang';
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton';
import UnitCourseDetails from '../../components/content/UnitCourseDetails';
import Section from '../../style/mui/styled/Section';
import SEOHelmetAsync from '../../tools/SEOHelmetAsync';
import UnitsList from '../../components/content/UnitCourses';
import GradeHeader from '../../components/content/GradeHeader';
import { MdArrowForward } from 'react-icons/md';

function placeholderImage(c1 = 'green', c2 = 'green', w = 900, h = 560) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <circle cx="${w * 0.78}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.32}" fill="rgba(255,255,255,0.14)"/>
    <circle cx="${w * 0.18}" cy="${h * 0.85}" r="${Math.min(w, h) * 0.22}" fill="rgba(255,255,255,0.10)"/>
    <path d="M0 ${h * 0.7} Q ${w * 0.5} ${h * 0.5} ${w} ${h * 0.75} L ${w} ${h} L 0 ${h} Z" fill="rgba(0,0,0,0.10)"/>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const ACCENT = '#DE9A2B';
const ACCENT_2 = '#37B27F';
const INK = '#1B1D27';
const INK_SOFT = '#666B7A';
const BORDER = '#E4E6ED';
const EDITOR_BG = '#14151F';
const EDITOR_LINE = '#272A3A';
const EDITOR_TEXT = '#C9CDDB';

export default function CoursePage() {
  const { gradeId } = useParams()
  const { grades } = useGrades()

  const navigate = useNavigate()
  const [units, setUnits] = useState([])

  const [getUnitsFc, status] = useLazyGetUnitsQuery()
  const [getUnits] = useLazyGetData(getUnitsFc)

  const user = useSelector(s => s.global.user)
  const theme = useTheme()
  useEffect(() => {
    const trigger = async () => {
      const res = await getUnits({ grade: gradeId })
      setUnits(res.units)
    }

    if (gradeId !== "undefined") {
      trigger()
    } else {
      if (user) { navigate('/grades/' + user.grade) }
    }
  }, [gradeId, user])

  if (!grades.find(g => g.index === Number(gradeId))) {
    return
  }

  if (gradeId === "undefined" || gradeId === undefined || typeof Number(gradeId) !== 'number') {
    return
  }

  const grade = grades.find(g => g.index === Number(gradeId)) ? grades.find(g => g.index === Number(gradeId)) : {}

  return (
    <Section sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <SEOHelmetAsync
        title={"السنه الدراسيه - " + grade.name}
        desc={grade.description}
        url={window.location.href}
        isSiteLink={true}
      />

      <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden', bgcolor: 'background.default', border: 0 }}>

        {/* , boxShadow: '0 30px 70px -30px rgba(20,22,40,.35)' */}
        {/* window chrome */}
        <Grid container justifyContent={'space-between'} flexWrap={'wrap-reverse'} gap={'16px'}>
          {/* info column */}
          <Grid item xs={12} sm={6.5} sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', gap: 2.2, position: ' relative', borderRadius: '16px', overflow: 'hidden' }}>
            <Box sx={{
              position: 'absolute', top: '0', right: '0', width: '100%', height: '100%',
              background: `linear-gradient(to right,  ${theme.palette.primary.light}  , ${theme.palette.primary.dark} 10%)`, opacity: .2 //linear-gradient(to left, ${theme.palette.primary.light} 30%, ${theme.palette.primary.dark} 75%) `linear-gradient(45deg,transparent 42%,#9400ff 42%)`
            }} />
            <FlexRow
              onClick={() => navigate(-1)}
              sx={{ zIndex: 5, position: 'relative', alignItems: 'center', cursor: 'pointer' }}>
              <MdArrowForward size={'1.5rem'} style={{
                marginBottom: '-5px'
              }} />
              <Typography sx={{ textDecoration: 'underline' }}>الرجوع</Typography>
            </FlexRow>

            <FlexColumn sx={{ height: '100%', gap: '16px' }}>
              <Typography variant='h4' sx={{
                zIndex: 1, bgcolor: theme.palette.grey[0],
                p: '12px 16px', color: 'primary.dark',
                borderRadius: '6px', border: '1px solid', borderColor: theme.palette.primary.dark,
                textAlign: 'center'
              }}>
                {/* {sectionName && <span style={{ textDecoration: 'underline' }}>{sectionName}</span>} */}
                {/* :   */}
                {grade.name}
              </Typography>

              <Typography variant='body2'>
                {grade.description}
              </Typography>
              <FlexRow gap={'12px'} sx={{ justifyContent: 'center' }}>
                {<GradeHeader gradeId={gradeId} onlyInfo />}
              </FlexRow>
              <Stack direction="row" flexWrap="wrap" gap={1.2} sx={{ py: 2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
                {units.map(unit => {
                  return <Chip key={unit._id} size="small" variant="outlined" label={unit.name} sx={{ '& .MuiChip-icon': { color: ACCENT } }} />
                })}
              </Stack>
              {/* 
                <List dense disablePadding>
                  {[
                    'A REST API with authentication and role-based access',
                    'A responsive React dashboard connected to live data',
                    'A deployed full-stack app running on your own domain',
                  ].map((text) => (
                    <ListItem key={text} disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CheckCircleRounded sx={{ fontSize: 18, color: 'primary.light' }} />
                      </ListItemIcon>
                      <ListItemText primary={text} primaryTypographyProps={{ fontSize: 14.5 }} />
                    </ListItem>
                  ))}
                </List> */}
            </FlexColumn>

            {/* <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_2})`, width: 42, height: 42, fontWeight: 700, fontSize: 14 }}>
                  KA
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Karim Abdel Rahman</Typography>
                  <Typography sx={{ fontSize: 12.5, color: INK_SOFT }}>Full-stack engineer, 8 years building production apps</Typography>
                </Box>
              </Stack> */}
          </Grid>

          {/* Image column */}
          <Grid item xs={12} sm={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
              <Box
                component="img"
                src={grade.image.url || placeholderImage(theme.palette.primary.dark, theme.palette.primary.dark)}
                alt={grade.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = placeholderImage();
                }}
                sx={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center", display: "block", borderRadius: '16px'
                }}
              />
              {/* <Box sx={{ position: 'absolute', top: 14, right: 14 }}>
                  <TabInfo fontSize={'.6rem'} count={grades.find(g => g.index === course.grade)?.name} i={0} />
                </Box> */}

            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box minHeight={'100vh'} sx={{ padding: '8px' }}>
        <TitleSection title={lang.GRADE_CONTENT} />

        {(status.isSuccess && units?.length === 0) && (
          <Alert variant='filled' severity='warning'>الوحدات هتنزل قريب , خليك متابع !</Alert>
        )}
        {status.isLoading && <LoaderSkeleton />}
        {units?.length > 0 &&
          <>
            {units?.map((unit, i) => <UnitsList key={i} unit={unit} />)}
          </>
        }

      </Box>
    </Section>
  );
}