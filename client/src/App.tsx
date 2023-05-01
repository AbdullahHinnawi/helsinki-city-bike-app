import React from 'react'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StationsPage from './pages/StationsPage'
import JourneysPage from './pages/JourneysPage'
import StationStatsPage from './pages/StationStatsPage'
import HomePage from './pages/HomePage'
import CustomAlert from './components/CustomAlert'

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/stations/:id" element={<StationStatsPage />} />
        <Route path="/stations" element={<StationsPage />} />
        <Route path="/journeys" element={<JourneysPage />} />
      </Routes>
      <CustomAlert/>
    </Router>
  )
}

export default App
