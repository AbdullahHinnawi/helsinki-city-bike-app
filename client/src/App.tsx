import React from 'react'
import NavigationBar from './components/NavigationBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StationsPage from './pages/StationsPage'
import JourneysPage from './pages/JourneysPage'

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={''} />
        <Route path="/stations" element={<StationsPage />} />
        <Route path="/journeys" element={<JourneysPage />} />
      </Routes>
    </Router>
  )
}

export default App
