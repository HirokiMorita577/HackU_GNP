import { ref, set } from "firebase/database";
import { realtimeDb } from "./firebaseConfig";


export async function updateLocation(userId, location) {
  await set(ref(realtimeDb, `locations/${userId}`), {
    latitude: location.latitude,
    longitude: location.longitude,
    updatedAt: Date.now(),
  });
}
