import { getFirestore } from 'firebase/firestore';
import { storage } from '../firebase';
import app from '../firebase';
export const db = getFirestore(app);
export { storage }; 