import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getCurrentLocation } from "@/function/getCurrentLocation";
import L from "leaflet";
import { updateLocation } from '@/firebase/update/updateLocation';
import { useAtom } from 'jotai';
import { userIdAtom } from '../../atom/profileAtoms';

// 他人の位置サンプル（例: 渋谷駅）
const others = [
  { pos: [35.658034, 139.701636], name: "他人A" },
  { pos: [35.689592, 139.700413], name: "他人B" }
];

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

const MapView: React.FC = () => {
  const [userId] = useAtom(userIdAtom);
  const [myPos, setMyPos] = useState<[number, number] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    getCurrentLocation()
      .then((loc) => {
        setMyPos([loc.lat, loc.lng]);
        setAccuracy(loc.accuracy);
        if (userId) {
          updateLocation(userId, loc); // 位置情報をアップロード
        }
      })
      .catch(() => {
        setMyPos(null);
        setAccuracy(null);
      });
  }, [userId]);

  // すべてのピンの座標を配列にまとめる
  const allPositions: [number, number][] = [
    ...others.map(o => o.pos as [number, number]),
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
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={midpoint || [35.681236, 139.767125]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 他人のピン（赤色） */}
        {others.map((o, i) => (
          <Marker key={i} position={o.pos as [number, number]} icon={redIcon}>
            <Popup>{o.name}</Popup>
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
