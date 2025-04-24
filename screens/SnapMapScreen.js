import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function SnapMapScreen() {
    const [region, setRegion] = useState(null);
    const [markers, setMarkers] = useState([]);

    // Hent brugerens lokation
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
        })();
    }, []);

    // Når brugeren long-presser på kortet
    const handleLongPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const newMarker = {
            latitude,
            longitude,
        };
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
