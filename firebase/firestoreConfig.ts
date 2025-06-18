import { getFirestore } from 'firebase/firestore';
import app from './firebaseConfig';

const firestore = getFirestore(app);
export default firestore;