import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Plane } from 'react-native-animated-spinkit'

export default function App() {
  return (
    <View style={styles.container}>
      <Plane />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
