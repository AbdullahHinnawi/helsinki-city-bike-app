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
import { StationSearch } from '../../types/stationTypes'
import { setStationSearch } from '../../actions/stationActions'
import { initialStationSearch } from '../../reducers/stationReducer'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const AdvancedFilters = () => {
  const { stationsResponse, stationsLoading, stationSearch } = useSelector(
    (state: RootState) => state.station
  )

  const dispatch: Dispatch<any> = useDispatch()

  const [nameOrAddress, setNameOrAddress] = useState('')
  const [logicalOperator, setLogicalOperator] = useState('or')
  const [capacityOperator, setCapacityOperator] = useState('gt')
  const [capacityValue, setCapacityValue] = useState(0)

  const handleNameorAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameOrAddress(event.target.value)
  }

  const handleLogicalOperatorChange = (event: SelectChangeEvent<any>) => {
    setLogicalOperator(event.target.value)
  }

  const handleCapacityOperatorChange = (event: SelectChangeEvent<any>) => {
    setCapacityOperator(event.target.value)
  }

  const handleCapacityValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCapacityValue(Number(event.target.value))
  }

  const handleSearchClick = () => {
    const newSearch: StationSearch = {
      ...stationSearch,
      query: {
        ...stationSearch.query,
        nameOrAddress: nameOrAddress,
        logicalOperator: logicalOperator,
        capacityOperator: capacityOperator,
        capacityValue: capacityValue,
      },
      options: {
        page: 1,
        limit: 50
      }
    }
    dispatch(setStationSearch(newSearch))
  }

  const handleClearClick = () => {
    setNameOrAddress('')
    setLogicalOperator('or')
    setCapacityOperator('gt')
    setCapacityValue(0)
    dispatch(setStationSearch(initialStationSearch))
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
            - Station name/address <b>AND/OR</b> station capacity
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            - Station capacity (leave station name/address empty)
          </Typography>
        </Alert>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          size="small"
          id="standard-basic"
          label="Name or Address"
          variant="outlined"
          value={nameOrAddress}
          onChange={handleNameorAddressChange}
        />
      </Grid>

      <Grid item xs={1.5}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Logical Operator
          </InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={logicalOperator}
            label="Logical Operator"
            onChange={handleLogicalOperatorChange}
            disabled={!nameOrAddress ? true : false}
          >
            <MenuItem value={'and'}>{'AND'}</MenuItem>
            <MenuItem value={'or'}>{'OR'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={1.5}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Capacity is</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={capacityOperator}
            label="Capacity is"
            onChange={handleCapacityOperatorChange}
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
          value={capacityValue}
          onChange={handleCapacityValueChange}
          type="number"
          label="Bikes"
          variant="outlined"
        />
      </Grid>

      <Grid item xs={1.5}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSearchClick}
          disabled={stationsLoading ? true : false}
        >
          Search
        </Button>
      </Grid>

      <Grid item xs={1.5}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClearClick}
          disabled={stationsLoading ? true : false}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  )
}

export default AdvancedFilters
