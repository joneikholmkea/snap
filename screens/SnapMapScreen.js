import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import db from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function SnapMapScreen() {
    const [region, setRegion] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Tilladelse afvist", "Du skal give adgang til lokation for at se kortet.");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

            fetchMarkersFromFirebase();
        })();
    }, []);

    const fetchMarkersFromFirebase = async () => {
        const snapshot = await getDocs(collection(db, "markers"));
        const loadedMarkers = snapshot.docs.map(doc => doc.data());
        setMarkers(loadedMarkers);
    };

    const handleLongPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;

        const newMarker = {
            latitude,
            longitude,
        };

        // Gem til Firestore
        await addDoc(collection(db, "markers"), newMarker);

        // Opdater lokal visning
        setMarkers([...markers, newMarker]);
    };

    return (
        <View style={styles.container}>
            {region && (
                <MapView
                    style={styles.map}
                    region={region}
                    showsUserLocation={true}
                    onLongPress={handleLongPress}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker}
                            title={`Marker ${index + 1}`}
                            description="Bruger tilføjet marker"
                        />
                    ))}
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default SnapMapScreen;