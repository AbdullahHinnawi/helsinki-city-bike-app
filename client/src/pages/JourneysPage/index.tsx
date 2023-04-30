import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJourneys, setJourneySearch } from '../../actions/journeyActions'
import ControlledPagination from '../../components/Pagination'
import { RootState } from '../../store'
import { JourneySearch } from '../../types/journeyTypes'
import JourneysTable from './JourneysTable'
import { initialJourneySearch } from '../../reducers/journeyReducer'
import BasicFilter from '../../components/BasicFilter'
import AdvancedFilters from './AdvancedFilters'
import AddJourneyDialog from './AddJourneyDialog'

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

  const [filters, setFilters] = useState<string>('basic')
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    dispatch(fetchJourneys(search))
  }, [dispatch, search])

  const handleSearchIconClick = () => {
    const newSearch: JourneySearch = {
      query: {
        basicFilter: true,
        stationName: filter
      },
      options: initialJourneySearch.options
    }
    dispatch(setJourneySearch(newSearch))
  }

  const handleKeyPress = (e: any) => {
    // Check if the pressed key is "Enter"
    if (e.keyCode === 13) {
      // Prevent page reload on Enter click
      e.preventDefault()
      const newSearch: JourneySearch = {
        query: {
          basicFilter: true,
          stationName: filter
        },
        options: initialJourneySearch.options
      }
      dispatch(setJourneySearch(newSearch))
    }
  }

  const handleFiltersSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    setFilter('')
    setFilters(value)
    dispatch(fetchJourneys(initialJourneySearch))
  }

  const handleFilterChange = (e: any) => {
    setFilter(e.target.value)
  }

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
        <Grid item xs={12}>
              <Typography variant="h4" sx={{ textAlign: 'left', mb:2 }}>Journeys</Typography>
              <AddJourneyDialog />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Filters
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={filters}
              onChange={handleFiltersSelection}
            >
              <FormControlLabel
                value={'basic'}
                control={<Radio />}
                label="Basic"
              />
              <FormControlLabel
                value={'advanced'}
                control={<Radio />}
                label="Advanced"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {filters === 'advanced' && <AdvancedFilters />}
          {filters === 'basic' && (
            <BasicFilter
              filter={filter}
              handleFilterChange={handleFilterChange}
              placeholder={'Filter by departure/return station name...'}
              handleKeyPress={handleKeyPress}
              handleSearchIconClick={handleSearchIconClick}
            />
          )}
        </Grid>
        {!journeysResponse?.docs?.length && journeysLoading  && (
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
            <Typography sx={{ mb: 2 }}>
              Total of <b>{journeysResponse?.totalDocs}</b> journeys
            </Typography>
            {journeysResponse?.docs?.length > 0 && (
              <JourneysTable
                journeys={ journeysResponse?.docs }
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
