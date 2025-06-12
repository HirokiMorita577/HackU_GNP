import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      console.log(status)
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
