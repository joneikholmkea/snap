import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import React, { useState, useEffect } from 'react';

export default function ViewSnapScreen({route, navigation}) {
    const { snapItem, markAsViewed } = route.params;

    const [timerCount, setTimerCount] = useState(100)
    
    useEffect(() => {
        if (timerCount === 0) {
          markAsViewed(snapItem.id); // notify HomeScreen to update state
          navigation.navigate('HomeScreen');
          return;
        }
    
        const interval = setInterval(() => {
          setTimerCount(prev => prev - 1);
        }, 1000);
    
        return () => clearInterval(interval); // cleanup
      }, [timerCount]);
    

const skipTimer = () => {
    setTimerCount(0);
    };
    
return (
        <Pressable style={styles.container} onPress={skipTimer}>
          <View style={styles.header} />
          <Text style={styles.name}>{snapItem.username}</Text>
    
          <Image
            source={{ uri: snapItem.imageUrl }}
            style={styles.image}
          />
          <Text style={styles.counter}>{timerCount}</Text>
        </Pressable>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flexGrow:1,
    width: '100%',
    height:'90%',
  },
  name: {
    position:'absolute',
    fontWeight: 'bold',
    fontSize: 18,
    color:'white',
    borderRadius:5,
    padding:4,
    zIndex:150,
    top:10,
    left:20,
    opacity:1,

  },
  header: {
    top:0,
    width:'100%',
    height:'8%',
    backgroundColor:'black',
    position:'absolute',
    zIndex:99,
    opacity:0.5,

  },

  counter: {
    bottom:20,
    position:'absolute',
    fontWeight: 'bold',
    fontStyle: 'italic',
    zIndex:100,
    fontSize:32,
    color:'white'

  }
});
