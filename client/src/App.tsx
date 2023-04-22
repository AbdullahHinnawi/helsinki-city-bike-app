import React from 'react'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StationsPage from './pages/StationsPage'
import JourneysPage from './pages/JourneysPage'
import StationStatsPage from './pages/StationStatsPage'

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={''} />
        <Route path="/stations/:id" element={<StationStatsPage />} />
        <Route path="/stations" element={<StationsPage />} />
        <Route path="/journeys" element={<JourneysPage />} />
      </Routes>
    </Router>
  )
}

export default App
