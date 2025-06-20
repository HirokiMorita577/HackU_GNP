//@髙塚 ここに書くユーザーの画像が表示されるようにセット

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getCurrentLocation } from "../../function/getCurrentLocation";
import L from "leaflet";
import { updateLocation } from '../../firebase/update/updateLocation';
import { useAtom } from 'jotai';
import { userIdAtom } from '../../atom/profileAtoms';
import type { GroupUserLocation } from '../../firebase/get/getGroupLocation';

// 青色アイコン（自分）
const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
// 赤色アイコン（他人）
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapViewProps {
  others?: GroupUserLocation[];
}

const MapView: React.FC<MapViewProps> = ({ others = [] }) => {
  const [userId] = useAtom(userIdAtom);
  const [myPos, setMyPos] = useState<[number, number] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    console.log('[MapView] ');
    console.log(others);
    getCurrentLocation()
      .then((loc: { lat: number; lng: number; accuracy: number }) => {
        setMyPos([loc.lat, loc.lng]);
        setAccuracy(loc.accuracy);
        if (userId) {
          updateLocation(userId, loc); // 位置情報をアップロード
        }
      })
      .catch((): void => {
        setMyPos(null);
        setAccuracy(null);
      });
  }, [userId]);

  // すべてのピンの座標を配列にまとめる
  const allPositions: [number, number][] = [
    ...others
      .filter(o => o.locations.lat !== null && o.locations.lng !== null)
      .map(o => [o.locations.lat as number, o.locations.lng as number] as [number, number]),
    ...(myPos ? [myPos] : [])
  ];

  // 中間地点（重心）を計算
  let midpoint: [number, number] | null = null;
  if (allPositions.length > 0) {
    const latSum = allPositions.reduce((sum, p) => sum + p[0], 0);
    const lngSum = allPositions.reduce((sum, p) => sum + p[1], 0);
    midpoint = [latSum / allPositions.length, lngSum / allPositions.length];
  }

  return (
    <div style={{ height: "70vh", width: "70vh"}}>
      <MapContainer center={midpoint || [35.681236, 139.767125]} zoom={13} style={{height: "70vh", width: "70vh"  }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 他人のピン（赤色） */}
        {others.filter(o => o.locations.lat !== null && o.locations.lng !== null).map((o, _i) => (
          <Marker key={o.userId} position={[(o.locations.lat as number), (o.locations.lng as number)]} icon={redIcon}>
            <Popup>
              <div>
                <img src={o.data.profileurl} alt={o.data.userName} style={{width:32, height:32, borderRadius:'50%'}} /><br/>
                {o.data.userName}<br/>
                精度: {o.locations.accuracy ? `${o.locations.accuracy} m` : '不明'}
              </div>
            </Popup>
          </Marker>
        ))}
        {/* 自分のピン（青色） */}
        {myPos && (
          <>
            <Marker position={myPos} icon={blueIcon}>
              <Popup>
                あなたの現在地<br />
                精度: {accuracy ? `${accuracy} m` : '不明'}
              </Popup>
            </Marker>
            {accuracy && (
              <Circle center={myPos} radius={accuracy} pathOptions={{ color: 'blue', fillOpacity: 0.2 }} />
            )}
          </>
        )}
        {/* 中間地点ピン（緑色） */}
        {midpoint && (
          <Marker position={midpoint} icon={new L.Icon({
            iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}>
            <Popup>みんなの中間地点</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
