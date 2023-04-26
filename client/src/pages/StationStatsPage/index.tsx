import { Box, Container, Grid, Typography } from '@mui/material'
import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'

import { getStationStats } from '../../actions/stationActions'
import StationStats from './StationStats'
import { useParams, useLocation } from 'react-router-dom'
import MapView from './MapView'
import StartEndDate from './StartEndDate'

/**
 * @component
 * @desc Renders station stats page
 */
const StaionStatsPage = () => {
  const { stationsResponse, stationsLoading, search, currentStation } =
    useSelector((state: RootState) => state.station)

  const dispatch: Dispatch<any> = useDispatch()

  const { id } = useParams<{ id: string }>()
  const { state } = useLocation()
  const { selectedStation } = state

  useEffect(() => {
    dispatch(getStationStats(Number(id), undefined, undefined))
  }, [dispatch, id])

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={6}>
          <Grid container sx={{ border: '1px solid transparent' }}>
            <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
              <Typography variant="h3">{selectedStation.nimi}</Typography>
              <Typography variant="body1">
                {selectedStation.osoite}
                {selectedStation.kaupunki
                  ? `, ${selectedStation.kaupunki}`
                  : ''}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <StartEndDate />
            </Grid>
            <StationStats />
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Box
            sx={{
              border: '1px solid #f2f2f2',
              borderRadius: '5px',
              width: 600,
              height: 600,
            }}
          >
            <MapView station={selectedStation} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StaionStatsPage
