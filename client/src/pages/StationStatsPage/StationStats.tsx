import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStationStats } from '../../actions/stationActions'
import { CircularProgress, Grid, Typography, Divider } from '@mui/material'
import { RootState } from '../../store'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import PopularSationsTable from './PopularSationsTable'

/**
 * @component
 * @desc Renders station statistics
 */
const StationStats = () => {
  const { currentStation, currentStationLoading } = useSelector(
    (state: RootState) => state.station
  )

  return (
    <Grid container sx={{ border: '1px solid transparent' }}>
      {currentStationLoading && (
        <Grid item xs={12} sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
          <CircularProgress style={{ width: '28px', height: '28px' }} />
        </Grid>
      )}

      {!currentStationLoading && currentStation && (
        <>
          <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h5">Capacity</Typography>
            <Typography variant="body1" sx={{ color: 'gray', mt: 1 }}>
              {currentStation.kapasiteet}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h5">Departures</Typography>
            <Typography variant="body1" sx={{ color: 'gray', mt: 1 }}>
              {currentStation.departureJourneysCount}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h5">Arrivals</Typography>
            <Typography variant="body1" sx={{ color: 'gray', mt: 1 }}>
              {currentStation.returnJourneysCount}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h5">Departures Avg. Distance</Typography>
            <Typography variant="body1" sx={{ color: 'gray', mt: 1 }}>
              {Number(currentStation.departureJourneysDistanceAverage).toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h5">Arrivals Avg. Distance</Typography>
            <Typography variant="body1" sx={{ color: 'gray', mt: 1 }}>
              {Number(currentStation.returnJourneysDistanceAverage).toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ mt: 3, mb: 3 }}>
            <Divider />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h5">
              Popular Return Stations for Departures
            </Typography>
            <PopularSationsTable
              popularStations={
                currentStation.mostPopularReturnStationsForDepartureStations
              }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 3, mb: 3 }}>
            <Divider />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h5">
              Popular Departure Stations for Arrivals
            </Typography>
            <PopularSationsTable
              popularStations={
                currentStation.mostPopularDepartureStationsForReturnStations
              }
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default StationStats
