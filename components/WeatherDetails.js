import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils/index'
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function WeatherDetails({ currentWeather, units }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather

  const windSpeed =
    units === 'metric'
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: BORDER_COLOR,
          }}>
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5
              name="temperature-high"
              size={25}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Feels Like</Text>
              <Text style={styles.textSecondary}>{feels_like} °</Text>
            </View>
          </View>
        </View>

        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="speedometer"
              size={25}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Pressure</Text>
              <Text style={styles.textSecondary}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: BORDER_COLOR,
          }}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="air-humidifier"
              size={25}
              color={PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Humidity</Text>
              <Text style={styles.textSecondary}>{humidity} % </Text>
            </View>
          </View>
        </View>

        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <Feather name="wind" size={25} color={PRIMARY_COLOR} />
            <View style={styles.weatherDetailsItem}>
              <Text>Wind Speed</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItem: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondary: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: '700',
    margin: 7,
  },
})
