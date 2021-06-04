import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker'
export default function UnitsPicker({ units, setUnits }) {
  return (
    <View style={styles.unitStyle}>
      <Picker
        selectedValue={units}
        onValueChange={(item) => setUnits(item)}
        mode="dropdown"
        itemStyle={{ fontSize: 12 }}>
        <Picker.Item label="Celcius (°C)" value="metric" />
        <Picker.Item label="Farenheit (°F)" value="imperial" />
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  unitStyle: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: -30,
      },
      android: {
        top: 50,
      },
    }),
    left: 20,
    height: 50,
    width: 200,
  },
})
