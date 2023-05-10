import { Button, Grid, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Dispatch, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setJourneySearch } from '../../actions/journeyActions'
import { initialJourneySearch } from '../../reducers/journeyReducer'
import { JourneySearch } from '../../types/journeyTypes'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const AdvancedFilters = () => {
  const { journeysResponse, journeySearch, journeysLoading } = useSelector(
    (state: RootState) => state.journey
  )

  const dispatch: Dispatch<any> = useDispatch()

  const [stationName, setStationName] = useState('')
  const [firstLogicalOperator, setFirstLogicalOperator] = useState('or')
  const [distanceOperator, setDistanceOperator] = useState('gt')
  const [distanceValue, setDistanceValue] = useState(0)
  const [secondLogicalOperator, setSecondLogicalOperator] = useState('or')
  const [durationOperator, setDurationOperator] = useState('gt')
  const [durationValue, setDurationValue] = useState(0)

  const handleStationNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStationName(event.target.value)
  }

  const handleFirstLogicalOperatorChange = (event: SelectChangeEvent<any>) => {
    setFirstLogicalOperator(event.target.value)
  }

  const handleSecondLogicalOperatorChange = (event: SelectChangeEvent<any>) => {
    setSecondLogicalOperator(event.target.value)
  }

  const handleDistanceOperatorChange = (event: SelectChangeEvent<any>) => {
    setDistanceOperator(event.target.value)
  }

  const handleDistanceValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDistanceValue(Number(event.target.value))
  }

  const handleDurationOperatorChange = (event: SelectChangeEvent<any>) => {
    setDurationOperator(event.target.value)
  }

  const handleDurationValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDurationValue(Number(event.target.value))
  }

  const handleSearchClick = () => {
    const newSearch: JourneySearch = {
      query: {
        basicFilter: false,
        stationName: stationName,
        firstLogicalOperator: firstLogicalOperator,
        distanceOperator: distanceOperator,
        distanceValue: distanceValue,
        secondLogicalOperator: secondLogicalOperator,
        durationOperator: durationOperator,
        durationValue: durationValue,
      },
      options: {
        page: 1,
        limit: 100,
      },
    }
    dispatch(setJourneySearch(newSearch))
  }

  const handleClearClick = () => {
    setStationName('')
    setFirstLogicalOperator('or')
    setDistanceOperator('gt')
    setDistanceValue(0)
    setSecondLogicalOperator('or')
    setDurationOperator('gt')
    setDurationValue(0)
    dispatch(setJourneySearch(initialJourneySearch))
  }

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ mb: 2 }}
    >
      <Grid item xs={12}>
        <Alert severity="info">
          <AlertTitle>Use Cases</AlertTitle>
          <Typography sx={{ fontSize: '14px' }}>
            - Station name <b>AND/OR</b> (distance <b>AND/OR</b> duration)
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            - Distance <b>AND/OR</b> duration (leave station name empty)
          </Typography>
        </Alert>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          size="small"
          id="standard-basic"
          label="Departure/return station name"
          variant="outlined"
          value={stationName}
          onChange={handleStationNameChange}
        />
      </Grid>

      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">AND / OR</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={firstLogicalOperator}
            label="Logical Operator"
            onChange={handleFirstLogicalOperatorChange}
            disabled={!stationName ? true : false}
          >
            <MenuItem value={'and'}>{'AND'}</MenuItem>
            <MenuItem value={'or'}>{'OR'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}></Grid>

      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Distance is</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={distanceOperator}
            label="Capacity is"
            onChange={handleDistanceOperatorChange}
          >
            <MenuItem value={'gt'}>{'>'}</MenuItem>
            <MenuItem value={'gte'}>{'>='}</MenuItem>
            <MenuItem value={'eq'}>{'='}</MenuItem>
            <MenuItem value={'lt'}>{'<'}</MenuItem>
            <MenuItem value={'lte'}>{'<='}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          size="small"
          value={distanceValue}
          onChange={handleDistanceValueChange}
          type="number"
          label="Km"
          variant="outlined"
        />
      </Grid>

      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">AND / OR</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={secondLogicalOperator}
            label="Logical Operator"
            onChange={handleSecondLogicalOperatorChange}
          >
            <MenuItem value={'and'}>{'AND'}</MenuItem>
            <MenuItem value={'or'}>{'OR'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Duration is</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={durationOperator}
            label="Capacity is"
            onChange={handleDurationOperatorChange}
          >
            <MenuItem value={'gt'}>{'>'}</MenuItem>
            <MenuItem value={'gte'}>{'>='}</MenuItem>
            <MenuItem value={'eq'}>{'='}</MenuItem>
            <MenuItem value={'lt'}>{'<'}</MenuItem>
            <MenuItem value={'lte'}>{'<='}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          size="small"
          value={durationValue}
          onChange={handleDurationValueChange}
          type="number"
          label="Min"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={1.5}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSearchClick}
          disabled={journeysLoading ? true : false}
        >
          Search
        </Button>
      </Grid>

      <Grid item xs={1.5}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClearClick}
          disabled={journeysLoading ? true : false}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  )
}

export default AdvancedFilters
