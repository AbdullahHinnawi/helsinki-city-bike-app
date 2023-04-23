import { Box, Container, Grid } from '@mui/material'
import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'

import { getStationStats } from '../../actions/stationActions'
import StationStats from './StationStats'
import { useParams } from 'react-router-dom'
import MapView from './MapView'

/**
 * @component
 * @desc Renders station stats page
 */
const StaionStatsPage = () => {
  const { stationsResponse, stationsLoading, search, currentStation } =
    useSelector((state: RootState) => state.station)

  const dispatch: Dispatch<any> = useDispatch()

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(getStationStats(Number(id)))
  }, [dispatch, id])

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={6}>
          <StationStats />
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
            <MapView />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StaionStatsPage
