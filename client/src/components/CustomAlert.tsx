import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { getAlert, removeAlert } from '../actions/AlertActions'

const CustomAlert = () => {

  const { alert } = useSelector((state: RootState) => state.alert)
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(getAlert())
  }, [dispatch])

  const handleClose = () => {
    dispatch(removeAlert())
  }

  const styles = {
    maxWidth: '600px',
    '&.MuiSnackbar-anchorOriginBottomLeft': {
      left: '50% !important',
      transform: 'translateX(-50%)',
    },
    '& .css-1pxa9xg-MuiAlert-message': { color: '#fff !important' },
  }

  const getBackroundColor = () => {
    let color = ''
    switch (alert.severity) {
      case 'success':
        color = '#5EAD64 !important'
        break
      case 'error':
        color = '#da4e4b !important'
        break
      case 'info':
        color = '#81d4fa !important'
        break
      case 'warning':
        color = '#ffab00 !important'
        break
      default:
        break
    }
    return color
  }

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={alert.duration}
      onClose={handleClose}
      sx={styles}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{
          width: '100%',
          backgroundColor: getBackroundColor(),
          '& .MuiAlert-icon': {
            color: '#fff !important',
          },
          '& .MuiAlert-message': {
            color: '#fff !important',
          },
          '& .MuiSvgIcon-root': {
            color: '#fff !important',
          },
        }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default CustomAlert
