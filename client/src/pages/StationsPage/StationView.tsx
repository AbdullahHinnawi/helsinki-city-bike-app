import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStationStats } from '../../actions/stationActions'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { RootState } from '../../store'

/**
 * @component
 * @desc Renders station statistics
 */
const StationView = () => {
  const { currentStation, currentStationLoading } = useSelector(
    (state: RootState) => state.station
  )

  return (
    <Grid container>
      {currentStationLoading && (
        <Grid item xs={12} sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
          <CircularProgress style={{ width: '28px', height: '28px' }} />
        </Grid>
      )}
      {!currentStationLoading && currentStation && (
        <Grid item xs={12}>
          <Typography>Station name: {currentStation.nimi}</Typography>
          <Typography>
            Departure journeys: {currentStation.departureJourneysCount}
          </Typography>
          <Typography>
            Return journeys: {currentStation.returnJourneysCount}
          </Typography>
          <Typography>
            Average distance of departure journeys:{' '}
            {currentStation.departureJourneysDistanceAverage}
          </Typography>
          <Typography>
            Average distance of return journeys:{' '}
            {currentStation.returnJourneysDistanceAverage}
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default StationView
