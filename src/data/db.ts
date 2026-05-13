import { collection, query, getDocs, doc, getDoc, addDoc, setDoc, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Place, Review } from './models';
import { OperationType } from './errors';

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function getPlaces(): Promise<Place[]> {
  try {
    const q = query(collection(db, 'places'), where('status', '==', 'approved'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Place));
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'places');
    return [];
  }
}

export async function getPlace(id: string): Promise<Place | null> {
  try {
    const d = await getDoc(doc(db, 'places', id));
    if (d.exists()) {
      return { id: d.id, ...d.data() } as Place;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `places/${id}`);
    return null;
  }
}

export async function addPlace(place: Omit<Place, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'places'), place);
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'places');
    return '';
  }
}

export async function getReviews(placeId: string): Promise<Review[]> {
  try {
    const q = query(collection(db, 'reviews'), where('placeId', '==', placeId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'reviews');
    return [];
  }
}

export async function addReview(review: Omit<Review, 'id'>): Promise<void> {
  try {
    await addDoc(collection(db, 'reviews'), review);
    
    // Also update average rating of the place 
    // Usually this is done via Cloud Functions, but doing client side here
    // Note: requires get then update so we might get concurrent issues but fine for MVP
    const p = await getPlace(review.placeId);
    if (p) {
      const newCount = (p.ratingCount || 0) + 1;
      const newTotal = (p.averageRating || 0) * (p.ratingCount || 0) + review.rating;
      const newAvg = newTotal / newCount;
      await setDoc(doc(db, 'places', review.placeId), {
        averageRating: newAvg,
        ratingCount: newCount
      }, { merge: true });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'reviews');
  }
}

export async function getMyPlacesCount(uid: string): Promise<number> {
  try {
    const q = query(collection(db, 'places'), where('createdBy', '==', uid));
    const snap = await getDocs(q);
    return snap.size;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, 'places');
    return 0;
  }
}
