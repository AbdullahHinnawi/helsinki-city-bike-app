import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStations } from '../../actions/stationActions'
import stationService from '../../services/stationService'
import { setAlert } from '../../actions/AlertActions'
import { AlertSeverity } from '../../types/AlertTypes'

/**
 * @component
 * @desc Renders dialog to add a new station
 */
const AddStationDialog: React.FC<any> = () => {
  const [open, setOpen] = React.useState(false)

  const { stationsResponse, stationsLoading, stationSearch } = useSelector(
    (state: RootState) => state.station
  )
  const dispatch: Dispatch<any> = useDispatch()

  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('helsinki')
  const [capacity, setCapacity] = useState<number>(10)
  const [lat, setLat] = useState<number>(60.1699)
  const [lng, setLng] = useState<number>(24.9384)

  const addStationErrorsFound = () : boolean => {
    if(!name || !address || !city || !capacity || !lat || !lng){
      return true
    }
    return false
  }


  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(event.target.value))
  }

  const handleLatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLat(Number(event.target.value))
  }


  const handleLngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLng(Number(event.target.value))
  }

  const resetFields = () => {
    setName('')
    setAddress('')
    setCity('helsinki')
    setCapacity(10)
    setLat(60.1699)
    setLng(24.9384)
  }

  const handleAdd = () => {
    if(!addStationErrorsFound()){
      const newStation = {
        nimi:name,
        osoite: address,
        kaupunki: city,
        kapasiteet: capacity,
        x:lat,
        y:lng
      }

      stationService.createStation(newStation).then((result) => {
        if(result){
          dispatch(fetchStations(stationSearch))
          dispatch(setAlert({ open: true, severity: AlertSeverity.Success, message: 'Station added successfully!', duration: 7000 }))
          setOpen(false)
          resetFields()
        }
      }).catch((error:any) => {
        const errMsg = error?.response?.data?.messge ? error?.response?.data?.messge : error?.messge
        dispatch(setAlert({ open: true, severity: AlertSeverity.Error, message: errMsg, duration: null }))
      })
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '600px', // Set your width here
            },
          },
        }}
      >
        <DialogTitle sx={{fontSize: '24px'}}>Add New Station</DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 2 }}
          >
            <Grid item xs={12}>
              <Typography variant="h6">Name and Capacity</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Station Name"
                variant='outlined'
                value={name}
                onChange={handleNameChange}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                id="datetime-local"
                label="Capacity"
                type="number"
                value={capacity}
                onChange={handleCapacityChange}
                sx={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address and City</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                id="datetime-local"
                label="Station Address"
                type="text"
                variant='outlined'
                value={address}
                onChange={handleAddressChange}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Station City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="Station City"
                  onChange={handleCityChange}
                >
                  <MenuItem value={'helsinki'}>Helsinki</MenuItem>
                  <MenuItem value={'espoo'}>Espoo</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Coordinates</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                id="datetime-local"
                label="Latitude"
                type="number"
                value={lat}
                onChange={handleLatChange}
                sx={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                id="datetime-local"
                label="Longitude"
                type="number"
                value={lng}
                onChange={handleLngChange}
                sx={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions sx={{ m:1 }}>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' disabled={addStationErrorsFound() ? true : false} onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default AddStationDialog
