import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, Chip, Divider, IconButton, ImageListItem, useTheme } from '@mui/material';


import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox';
import { ErrorBtn, FilledHoverBtn, OutLinedHoverBtn, SuccessBtn } from '../../style/buttonsStyles';


import RowInfo from './RowInfo';
import { AiFillPoundCircle } from "react-icons/ai";




export default function CardCourse({ img, title, children, borderColor }) {

  const theme = useTheme()
  return (
    <Box
      sx={{
        '&:hover  img': {
          filter: 'saturate(140%) !important', transform: 'scale(1.1)'

        },
        '&:hover > div': {
          transform: 'scale(1.1)'
        },
      }}
      display={'flex'} flexDirection={'column'}>

      <ImageListItem sx={{
        overflow: 'hidden',
        borderRadius: '16px', width: '100%', maxHeight: '250px',bgcolor: 'orange'
      }}>
        <img
          srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          src={`${img}`}
          alt={title}
          loading="lazy"
          style={{
            borderRadius: '16px',
            filter: 'saturate(70%)',
          }}
        />
      </ImageListItem>

      <Box sx={{
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