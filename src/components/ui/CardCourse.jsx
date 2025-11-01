import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, Chip, Divider, IconButton, ImageListItem, useTheme } from '@mui/material';


import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox';
import Image from './Image';




export default function CardCourse({ img, title, children, borderColor }) {

  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        transition: '.3s all ease',
        '&:hover  img': {
          filter: 'saturate(140%) !important', transform: 'scale(1.1)'

        },
        '&:hover > div:nth-of-type(2)': {
          transform: 'scale(1.1)'
        },
      }}
      display={'flex'} flexDirection={'column'}>

      <Image img={img} saturate={true} sx={{minHeight: '100px'}} />

      <Box sx={{
        transition: '.3s all ease',
        m: '8px auto', padding: '22px', width: '80%', flex: '1', mt: '-60px', position: 'relative', zIndex: '3',
        bgcolor: 'background.alt', color: 'neutral.0',
        boxShadow: theme.shadows[8], borderRadius: " 8px", display: 'flex', flexDirection: 'column', border: '4px solid ', borderColor: borderColor || 'orange'
      }}>

        <FlexRow justifyContent={'center'} sx={{ flexWrap: 'nowrap' }}>
          <Typography variant='h6' component={'h6'} textAlign={'center'} mr={'5px'}>
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