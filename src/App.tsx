/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import WeatherScreen from './components/WeatherScreen'
import DefaultWeather from './components/DefaultWeather'
import WeatherCard from './components/WeatherCard'

function App() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <WeatherScreen />
    </div>
  )
}
export default App