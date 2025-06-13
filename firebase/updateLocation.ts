/*
import { ref, set } from "firebase/database";
import { realtimeDb } from "./firebaseConfig";

type Location = {
  latitude: number;
  longitude: number;
};

export async function updateLocation(userId: string, location: Location): Promise<void> {
  await set(ref(realtimeDb, `locations/${userId}`), {
    latitude: location.latitude,
    longitude: location.longitude,
    updatedAt: Date.now(),
  });
}
*/