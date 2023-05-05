import React from 'react'
import { Container,Grid,Typography } from '@mui/material'
import ImageGallery from './ImageGallery'


/**
 * @component
 * @desc Renders Home page
 */
const HomePage = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ textAlign: 'left', mb:2 }}>Welcome to City Bikes App</Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageGallery/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomePage
