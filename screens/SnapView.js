import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const SnapView = ({ route }) => {
  const { snap } = route.params

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: snap.image }}
        style={styles.fullImage}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
})

export default SnapView
