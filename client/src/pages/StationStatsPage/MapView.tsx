import React, { useState } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Box, CircularProgress, Typography } from '@mui/material'

/**
 * @component
 * @desc Renders Google map
 */

const MapView = () => {
  const { currentStation, currentStationLoading } = useSelector(
    (state: RootState) => state.station
  )
  const [showInfo, setShowInfo] = useState(false)

  const helsinkiLatLng = { lat: 60.1699, lng: 24.9384 }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  return (
    <Box>
      {!isLoaded && (
        <Box sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
          <CircularProgress style={{ width: '28px', height: '28px' }} />
        </Box>
      )}
      {isLoaded && (
        <>
          {(!currentStation || currentStationLoading) && (
            <GoogleMap
              mapContainerStyle={{
                width: '600px',
                height: '600px',
                borderRadius: '5px',
              }}
              zoom={10}
              center={helsinkiLatLng}
            ></GoogleMap>
          )}

          {!currentStationLoading && currentStation && (
            <GoogleMap
              mapContainerStyle={{ width: '600px', height: '600px' }}
              zoom={15}
              center={{
                lat: currentStation.x,
                lng: currentStation.y,
              }}
            >
              <Marker
                onClick={() => setShowInfo(true)}
                position={{
                  lat: currentStation.x,
                  lng: currentStation.y,
                }}
              />

              {showInfo && (
                <InfoWindow
                  position={{
                    lat: currentStation.x,
                    lng: currentStation.y,
                  }}
                  onCloseClick={() => setShowInfo(false)}
                >
                  <>
                    <Typography variant="body1">
                      {currentStation.nimi}
                    </Typography>
                    <Typography variant="caption">
                      {currentStation.osoite}
                      {currentStation.kaupunki
                        ? `, ${currentStation.kaupunki}`
                        : ''}
                    </Typography>
                  </>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </>
      )}
    </Box>
  )
}

export default MapView
