// ブラウザのGeolocation APIを使って現在地を取得する関数
// Promiseで緯度・経度を返します

export function getCurrentLocation(): Promise<{ lat: number; lng: number; accuracy: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation APIがサポートされていません'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('現在地取得成功:', position);
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true, // できるだけ高精度
        timeout: 10000,           // 10秒でタイムアウト（必要に応じて調整）
        maximumAge: 0             // キャッシュを使わない
      }
    );
  });
}
