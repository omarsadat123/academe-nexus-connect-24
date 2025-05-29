
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db, APP_ID } from '../config/firebase';
import { User, Course, Enrollment, Announcement, Resource, Assignment, Submission } from '../types';

const getCollectionPath = (collectionName: string) => 
  `artifacts/${APP_ID}/public/data/${collectionName}`;

// User operations
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, getCollectionPath('users')), {
    ...userData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getUser = async (userId: string): Promise<User | null> => {
  const q = query(collection(db, getCollectionPath('users')), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) return null;
  
  const doc = querySnapshot.docs[0];
  const data = doc.data();
  return {
    id: doc.id,
    userId: data.userId,
    role: data.role,
    displayName: data.displayName,
    email: data.email,
    createdAt: data.createdAt.toDate()
  } as User;
};

export const getAllUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, getCollectionPath('users')));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      role: data.role,
      displayName: data.displayName,
      email: data.email,
      createdAt: data.createdAt.toDate()
    } as User;
  });
};

export const updateUser = async (userId: string, updates: Partial<Omit<User, 'id' | 'userId' | 'createdAt'>>) => {
  const q = query(collection(db, getCollectionPath('users')), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const docRef = doc(db, getCollectionPath('users'), querySnapshot.docs[0].id);
    await updateDoc(docRef, updates);
  }
};

// Course operations
export const createCourse = async (courseData: Omit<Course, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, getCollectionPath('courses')), {
    ...courseData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getAllCourses = async (): Promise<Course[]> => {
  const querySnapshot = await getDocs(collection(db, getCollectionPath('courses')));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate()
  } as Course));
};

// Enrollment operations
export const enrollStudent = async (studentId: string, studentName: string, courseId: string) => {
  const docRef = await addDoc(collection(db, getCollectionPath('enrollments')), {
    studentId,
    studentName,
    courseId,
    enrolledAt: Timestamp.now()
  });
  return docRef.id;
};

export const getEnrollmentsByCourse = async (courseId: string): Promise<Enrollment[]> => {
  const q = query(collection(db, getCollectionPath('enrollments')), where('courseId', '==', courseId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    enrolledAt: doc.data().enrolledAt.toDate()
  } as Enrollment));
};

export const getEnrollmentsByStudent = async (studentId: string): Promise<Enrollment[]> => {
  const q = query(collection(db, getCollectionPath('enrollments')), where('studentId', '==', studentId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    enrolledAt: doc.data().enrolledAt.toDate()
  } as Enrollment));
};

// Announcement operations
export const createAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'timestamp'>) => {
  const docRef = await addDoc(collection(db, getCollectionPath('announcements')), {
    ...announcementData,
    timestamp: Timestamp.now()
  });
  return docRef.id;
};

export const getAnnouncements = async (userId?: string, role?: string): Promise<Announcement[]> => {
  const q = query(collection(db, getCollectionPath('announcements')), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate()
  } as Announcement));
};
