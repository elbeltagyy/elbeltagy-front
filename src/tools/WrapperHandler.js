import { Alert, Box } from '@mui/material'
import { FlexColumn } from '../style/mui/styled/Flexbox'

function WrapperHandler({ children, status, showSuccess = false, width = '100%' }) {
  // console.log('err =>', status?.error)
  return (
    <FlexColumn>
      {children}
      <Box sx={{ width }}>
        <Box m={'8px 0'}>

          {status?.isLoading && <Alert sx={{ maxWidth: '100%', m: '0 auto' }} variant="filled" severity="warning">
            يتم تحميل البيانات...!
          </Alert>}

          {status?.isError && <Alert sx={{ maxWidth: '100%,', m: '0 auto' }} variant="filled" severity="error">
            {status?.error && status?.error.error || status.error.data.message || 'حدث خطا...!'}
          </Alert>
          }

          {(status?.isSuccess && showSuccess) && <Alert sx={{ maxWidth: '100%,', m: '0 auto' }} variant="filled" severity="success">
            {status.data.message}
          </Alert>
          }

        </Box>

      </Box>
    </FlexColumn>
  )
}

export default WrapperHandler
