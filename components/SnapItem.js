import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  AccessibilityRole,
} from 'react-native'
import PropTypes from 'prop-types'

const SnapItem = ({ id, image, sender, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPress(id)}
    accessibilityRole={'button'}
    accessibilityLabel={`View snap from ${sender}`}
  >
    <Image
      source={{ uri: image }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.info}>
      <Text style={styles.sender}>{sender}</Text>
    </View>
  </TouchableOpacity>
)

SnapItem.propTypes = {
  id:       PropTypes.string.isRequired,
  image:    PropTypes.string.isRequired,
  sender:   PropTypes.string.isRequired,
  onPress:  PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
  },
  sender: {
    fontSize: 16,
    fontWeight: '600',
  },
})

export default SnapItem
