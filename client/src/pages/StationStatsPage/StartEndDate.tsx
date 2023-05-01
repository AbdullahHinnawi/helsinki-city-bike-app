import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React, { ChangeEvent, useEffect, useState, Dispatch } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStationStats } from '../../actions/stationActions'
import { RootState } from '../../store'

const StartEndDate = () => {
  const [startDate, setStartDate] = useState('2021-05-01')
  const [endDate, setEndDate] = useState('2021-06-30')

  const {
    stationsResponse,
    stationsLoading,
    stationSearch,
    currentStation,
    currentStationLoading,
  } = useSelector((state: RootState) => state.station)

  const dispatch: Dispatch<any> = useDispatch()

  const loading = false

  useEffect(() => {
    console.log('test')
  }, [])

  const handleApply = () => {
    dispatch(
      getStationStats(Number(currentStation.stationId), startDate, endDate)
    )
  }

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
  }

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
  }

  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sx={{ mt: 1, mb: 2 }}>
        {/*<Typography variant='h5'>Date</Typography>*/}
      </Grid>

      <Grid item xs={4} sx={{}}>
        <TextField
          id="startDate"
          label="Start date"
          type="date"
          value={startDate}
          //defaultValue="2017-05-24"
          onChange={handleStartDateChange}
          size="small"
          sx={{ width: '100%' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={4} sx={{}}>
        <TextField
          id="endDate"
          label="End date"
          type="date"
          //defaultValue="2017-05-24"
          value={endDate}
          onChange={handleEndDateChange}
          size="small"
          sx={{ width: '100%' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={4} sx={{ mt: 0.1 }}>
        <Button
          disabled={currentStationLoading ? true : false}
          variant="contained"
          onClick={handleApply}
          sx={{ textTransform: 'none', width: '100%' }}
        >
          {loading ? (
            <CircularProgress
              style={{ width: '24px', height: '24px', color: '#fff' }}
            />
          ) : (
            'Apply'
          )}
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ mt: 3, mb: 3 }}>
        <Divider />
      </Grid>
    </Grid>
  )
}

export default StartEndDate
