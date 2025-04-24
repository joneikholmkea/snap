import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SnapMapScreen from './screens/SnapMapScreen.js'

export default function App() {
  return (
    <View style={styles.container}>
        <SnapMapScreen/>
      <Text>Open</Text>
      <Text>Open up App.js to start working!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
