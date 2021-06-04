import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import Reloader from './components/Reloader'
import WeatherDetails from './components/WeatherDetails'

const WEATHER_API_KEY = 'bd3ec9255336a8a0ff69b6d5d1b240ed'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [units, setUnits] = useState('metric')

  useEffect(() => {
    load()
  }, [units])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMessage('Access to the location is needed to run the app')
        return
      }

      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)
      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.main}>
          <UnitsPicker units={units} setUnits={setUnits} />
          <Reloader load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>

        <View>
          <WeatherDetails currentWeather={currentWeather} units={units} />
        </View>
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Reloader load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0085D1" />
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
})
