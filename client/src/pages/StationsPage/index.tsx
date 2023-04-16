import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ControlledPagination from '../../components/Pagination'
import { RootState } from '../../store'

import StationsTable from './StationsTable'
import { fetchStations, setStationSearch } from '../../actions/stationActions'
import { StationSearch } from '../../types/stationTypes'
import StationView from './StationView'

/**
 * @component
 * @desc Renders stations page
 */
const StationsPage = () => {
  const { stationsResponse, stationsLoading, search } = useSelector(
    (state: RootState) => state.station
  )

  const dispatch: Dispatch<any> = useDispatch()
  const [currentPage, setCurrentPage] = React.useState<number>(
    search.options.page
  )

  console.log('stationsResponse', stationsResponse)

  useEffect(() => {
    dispatch(fetchStations(search))
    console.log('called')
  }, [dispatch, search])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    const newSearch: StationSearch = {
      ...search,
      options: { ...search.options, page: value },
    }
    dispatch(setStationSearch(newSearch))
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <StationView />
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h4">Stations</Typography>
        </Grid>
        {!stationsResponse && (
          <Grid item xs={12} sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
            <CircularProgress style={{ width: '28px', height: '28px' }} />
          </Grid>
        )}
        {stationsResponse?.docs?.length && (
          <Grid item xs={12}>
            <ControlledPagination
              count={stationsResponse?.totalPages}
              page={currentPage}
              handleChange={handleChange}
            />
            {stationsResponse?.docs?.length > 0 && (
              <StationsTable
                stations={stationsResponse?.docs}
                stationsLoading={stationsLoading}
              />
            )}
            <ControlledPagination
              count={stationsResponse?.totalPages}
              page={currentPage}
              handleChange={handleChange}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default StationsPage
