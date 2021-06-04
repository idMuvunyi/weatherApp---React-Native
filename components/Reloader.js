import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils/index.js'

export default function Reloader({ load }) {
  const reloaderIcon = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
  return (
    <View style={styles.reloader}>
      <Ionicons
        onPress={load}
        name={reloaderIcon}
        size={24}
        color={colors.PRIMARY_COLOR}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  reloader: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: -30,
      },
      android: {
        top: 65,
      },
    }),
    right: 20,
  },
})
