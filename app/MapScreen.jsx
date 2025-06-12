import React from 'react';
import { View, StyleSheet, Button, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const others = [
  { id: 1, latitude: 35.6895, longitude: 139.6917, name: 'Aさん' }, // 新宿
  { id: 2, latitude: 35.658034, longitude: 139.701636, name: 'Bさん' }, // 渋谷
  { id: 3, latitude: 35.729503, longitude: 139.7109, name: 'Cさん' }, // 池袋
];

const MapScreen = ({ goToHome }) => {
  const { location, errorMsg } = useCurrentLocation();
  
  // locationが取得できるまでローディング表示
  if (!location && !errorMsg) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>現在地を取得中...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text>{errorMsg}</Text>
        <View style={styles.buttonContainer}>
          <Button title="ホーム画面に戻れない" onPress={goToHome} />
        </View>
      </View>
    );
  }

  const myLocation = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
  const allPoints = [myLocation, ...others];
  const midLat = allPoints.reduce((sum, p) => sum + p.latitude, 0) / allPoints.length;
  const midLng = allPoints.reduce((sum, p) => sum + p.longitude, 0) / allPoints.length;
  const midpoint = { latitude: midLat, longitude: midLng };

  // デバッグ用: 位置情報と中間地点を出力
  console.log('myLocation:', myLocation);
  console.log('midpoint:', midpoint);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: midpoint.latitude,
          longitude: midpoint.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* 自分の位置 */}
        <Marker
          coordinate={myLocation}
          title="自分"
          pinColor="blue"
        />
        {/* 他の人の位置 */}
        {others.map(person => (
          <Marker
            key={person.id}
            coordinate={{ latitude: person.latitude, longitude: person.longitude }}
            title={person.name}
            pinColor="green"
          />
        ))}
        {/* 中間地点 */}
        <Marker
          coordinate={midpoint}
          title="中間地点"
          description="みんなの中間地点"
          pinColor="red"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="ホーム画面に戻れない" onPress={goToHome} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;
