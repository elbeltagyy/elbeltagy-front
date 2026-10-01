import Typography from '@mui/material/Typography';
import { Box, Divider, useTheme } from '@mui/material';


import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox';
import Image from './Image';


export default function CardCourse({ img, title, children, borderColor }) {

  const theme = useTheme()
  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.light + 10,
        width: '100%',
        transition: '.3s all ease',
        '&:hover  img': {
          filter: 'saturate(140%) !important', transform: 'scale(1.1)'

        },
        // '&:hover > div:nth-of-type(2)': {
        //   transform: 'scale(1.1)'
        // },
      }}
      display={'flex'} flexDirection={'column'}>

      <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
        <Box sx={{ overflow: 'hidden' }}>
          <Box
            component="img"
            src={img}
            alt={title}
            loading="lazy"
            // onError={(e) => {
            //   e.currentTarget.src = placeholderImage(a.light, a.dark, imgW, imgH);
            // }}
            sx={{
              width: "100%", height: "100%", transition: '.3s',
              objectFit: "cover", objectPosition: "center", display: "block", maxHeight: '500px'
            }}
          />
        </Box>
      </Box>

      <Box sx={{
        transition: '.3s all ease',
        flex: '1', position: 'relative', zIndex: '3',
        color: 'neutral.0',
        // boxShadow: theme.shadows[2],
        borderRadius: " 0 0 8px 8px", p: '22px',
        display: 'flex', flexDirection: 'column', border: '4px solid ', borderColor: borderColor || 'orange'
      }}>

        <FlexRow justifyContent={'center'} sx={{ flexWrap: 'nowrap' }}>
          <Typography variant='h5' component={'h6'} textAlign={'center'} >
            <span>{title} </span>
          </Typography>
        </FlexRow>

        <Divider sx={{ border: `2px solid ${theme.palette.primary.light}`, borderRadius: '8px', my: '8px', width: '100%' }} />

        <FlexColumn gap={'5px'}>
          {children}
        </FlexColumn>
      </Box>
    </Box >
  );
}


{/* <ImageListItem sx={{
  overflow: 'hidden',
  borderRadius: '16px', width: '100%', maxHeight: '250px', bgcolor: 'orange',
  transition: '.3s all ease', minWidth: '100%', minHeight: '200px'
}}>
  <img
    srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
    src={`${img}`}
    alt={title}
    loading="lazy"
    style={{
      borderRadius: '16px',
      filter: 'saturate(70%)',
      transition: '.3s all ease',

    }}
  />
</ImageListItem> */}