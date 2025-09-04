import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';

// We use the new modular functions to get the service instances
export const authInstance = getAuth();
export const db = getFirestore();
