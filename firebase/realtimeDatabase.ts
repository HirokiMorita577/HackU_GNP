// src/firebase/realtimeDatabase.ts
import { getDatabase } from 'firebase/database';
import app from './firebaseConfig';

const database = getDatabase(app);
export default database;
