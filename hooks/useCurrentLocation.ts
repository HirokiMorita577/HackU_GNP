/*
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

// expo-locationの型を利用
import type { LocationObject } from 'expo-location';

export function useCurrentLocation() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      console.log(status);
      if (status === 'denied') {
        setErrorMsg('位置情報の利用が拒否されました。端末の設定から許可してください。');
        return;
      }
      if (status !== 'granted') {
        setErrorMsg('位置情報の利用が許可されていません。');
        return;
      }
      try {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (e) {
        setErrorMsg('現在地の取得に失敗しました。');
      }
    })();
  }, []);

  return { location, errorMsg };
}
*/