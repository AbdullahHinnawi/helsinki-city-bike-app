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
import { createJourney } from '../../actions/journeyActions'

/**
 * @component
 * @desc Renders dialog to add a new journey
 */
const AddJourneyDialog: React.FC<any> = () => {
  const [open, setOpen] = React.useState(false)

  const { stationsResponse, stationsLoading, search } = useSelector(
    (state: RootState) => state.station
  )
  const dispatch: Dispatch<any> = useDispatch()

  const [departureStation, setDepartureStation] = useState<any>('')
  const [departureTime, setDepartureTime] = useState<any>(new Date())
  const [returnStation, setReturnStation] = useState<any>('')
  const [returnTime, setReturnTime] = useState<any>(new Date())
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)

  const addJourneyErrorsFound = () : boolean => {
    if(!departureStation || !departureTime || !returnStation || !returnTime || !distance || !duration){
      return true
    }
    return false
  }

  useEffect(() => {
    dispatch(fetchStations(search))
  }, [dispatch])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDepartureTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartureTime(e.target.value)
  }

  const handleReturnTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReturnTime(e.target.value)
  }

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value))
  }

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value))
  }

  const handleAdd = () => {
    if(!addJourneyErrorsFound()){
      const newJourney = {
        departure: departureTime,
        return: returnTime,
        departureStationId: departureStation.stationId,
        departureStationName: departureStation.nimi,
        returnStationId: returnStation.stationId,
        returnStationName: returnStation.nimi,
        coveredDistance: distance,
        duration: duration,

      }
      dispatch(createJourney(newJourney))
      setOpen(false)
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
        <DialogTitle sx={{fontSize: '24px'}}>Add New Journey</DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 2 }}
          >
            <Grid item xs={12}>
              <Typography variant="h6">Departure</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Departure Station
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={departureStation}
                  label="Departure Station"
                  onChange={(e) => setDepartureStation(e.target.value)}
                >
                  {stationsResponse?.docs
                    ?.sort((a: any, b: any) => a.nimi.localeCompare(b.nimi))
                    .map((s: any) => (
                      <MenuItem key={s.stationId} value={s}>
                        {s.nimi}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                id="datetime-local"
                label="Departure Time"
                type="datetime-local"
                //defaultValue="2017-05-24T10:30"
                value={departureTime}
                onChange={handleDepartureTimeChange}
                sx={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Return</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Return Station
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={returnStation}
                  label="Departure Station"
                  onChange={(e) => setReturnStation(e.target.value)}
                >
                  {stationsResponse?.docs
                    ?.sort((a: any, b: any) => a.nimi.localeCompare(b.nimi))
                    .map((s: any) => (
                      <MenuItem key={s.stationId} value={s}>
                        {s.nimi}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                id="datetime-local"
                label="Return Time"
                type="datetime-local"
                //defaultValue="2017-05-24T10:30"
                value={returnTime}
                onChange={handleReturnTimeChange}
                sx={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Distance and Duration</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                value={distance}
                onChange={handleDistanceChange}
                type="number"
                label="Covered Distance (m)"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                value={duration}
                onChange={handleDurationChange}
                type="number"
                label="Duration (sec)"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ m:1 }}>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' disabled={addJourneyErrorsFound() ? true : false} onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default AddJourneyDialog
