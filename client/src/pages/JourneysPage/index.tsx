import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJourneys, setJourneySearch } from '../../actions/journeyActions'
import ControlledPagination from '../../components/Pagination'
import { RootState } from '../../store'
import { JourneySearch } from '../../types/journeyTypes'
import JourneysTable from './JourneysTable'

/**
 * @component
 * @desc Renders journeys page
 */
const JourneysPage = () => {
  const { journeysResponse, search, journeysLoading } = useSelector(
    (state: RootState) => state.journey
  )

  const dispatch: Dispatch<any> = useDispatch()
  const [currentPage, setCurrentPage] = React.useState<number>(
    search.options.page
  )

  console.log('journeysResponse', journeysResponse)

  useEffect(() => {
    dispatch(fetchJourneys(search))
  }, [dispatch, search])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    const newSearch: JourneySearch = {
      ...search,
      options: { ...search.options, page: value },
    }
    dispatch(setJourneySearch(newSearch))
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h4">Journeys</Typography>
        </Grid>
        {!journeysResponse && (
          <Grid item xs={12} sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
            <CircularProgress style={{ width: '28px', height: '28px' }} />
          </Grid>
        )}
        {journeysResponse?.docs?.length && (
          <Grid item xs={12}>
            <ControlledPagination
              count={journeysResponse?.totalPages}
              page={currentPage}
              handleChange={handleChange}
            />
            {journeysResponse?.docs?.length > 0 && (
              <JourneysTable
                journeys={journeysResponse?.docs}
                journeysLoading={journeysLoading}
              />
            )}
            <ControlledPagination
              count={journeysResponse?.totalPages}
              page={currentPage}
              handleChange={handleChange}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default JourneysPage
