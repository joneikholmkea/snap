import React, { useState, useEffect } from 'react'
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SnapItem from '../components/SnapItem'
// import firestore from '@react-native-firebase/firestore'    // for when we are going to use firebase
const HomeScreen = () => {
  const [snaps, setSnaps]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const navigation               = useNavigation()

  useEffect(() => {
    // EXAMPLE: replace with your real data-fetching logic
    // const unsubscribe = firestore()
    //   .collection('snaps')
    //   .onSnapshot(
    //     qs => {
    //       const data = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    //       setSnaps(data)
    //       setLoading(false)
    //     },
    //     err => {
    //       setError(err.message)
    //       setLoading(false)
    //     }
    //   )
    // return () => unsubscribe()

    // MOCK DATA for demo:
    setTimeout(() => {
      setSnaps([
        {
          id: '1',
          image: 'https://picsum.photos/id/100/200/200',
          sender: 'Alice',
        },
        {
          id: '2',
          image: 'https://picsum.photos/id/101/200/200',
          sender: 'Bob',
        },
      ])
      setLoading(false)
    }, 100)
  }, [])

  const handlePress = (id) => {
    const snap = snaps.find(s => s.id === id)
    if (snap) {
      // assumes you have a "SnapView" screen registered
      navigation.navigate('SnapView', { snap })
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error loading snaps: {error}</Text>
      </View>
    )
  }

  if (snaps.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No snaps from friends yet.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={snaps}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SnapItem
            id={item.id}
            image={item.image}
            sender={item.sender}
            onPress={handlePress}
          />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

export default HomeScreen
