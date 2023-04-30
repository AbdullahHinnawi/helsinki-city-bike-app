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
import ControlledPagination from '../../components/Pagination'
import { RootState } from '../../store'
import StationsTable from './StationsTable'
import { fetchStations, setStationSearch } from '../../actions/stationActions'
import { StationSearch } from '../../types/stationTypes'
import BasicFilter from '../../components/BasicFilter'
import AdvancedFilters from './AdvancedFilters'
import { initialStationSearch } from '../../reducers/stationReducer'
import AddStationDialog from './AddStationDialog'

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
  const [filters, setFilters] = useState<string>('basic')
  const [filter, setFilter] = useState<string>('')

  const handleFiltersSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    setFilter('')
    setFilters(value)
    dispatch(fetchStations(initialStationSearch))
  }

  useEffect(() => {
    dispatch(fetchStations(search))
    console.log('called')
  }, [dispatch, search])

  const handleSearchIconClick = () => {
    const newSearch: StationSearch = {
      query: {
        basicFilter: true,
        nameOrAddress: filter
      },
      options: initialStationSearch.options
    }
    dispatch(setStationSearch(newSearch))
  }

  const handleKeyPress = (e: any) => {
    // Check if the pressed key is "Enter"
    if (e.keyCode === 13) {
      // Prevent page reload on Enter click
      e.preventDefault()
      const newSearch: StationSearch = {
        query: {
          basicFilter: true,
          nameOrAddress: filter
        },
        options: initialStationSearch.options
      }
      dispatch(setStationSearch(newSearch))
    }
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    const newSearch: StationSearch = {
      ...search,
      options: { ...search.options, page: value },
    }
    dispatch(setStationSearch(newSearch))
    dispatch(fetchStations(newSearch))
  }

  const handleFilterChange = (e: any) => {
    setFilter(e.target.value)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container>
        <Grid item xs={12}>
              <Typography variant="h4" sx={{ textAlign: 'left', mb:2 }}>Stations</Typography>
              <AddStationDialog />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, mb:2 }}>
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
              placeholder={'Filter by name or address...'}
              handleKeyPress={handleKeyPress}
              handleSearchIconClick={handleSearchIconClick}
            />
          )}
        </Grid>
        {!stationsResponse?.docs?.length && stationsLoading  && (
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
            <Typography sx={{ mb: 2 }}>
              Total of <b>{stationsResponse?.totalDocs}</b> stations
            </Typography>
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
