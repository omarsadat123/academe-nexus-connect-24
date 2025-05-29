
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
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
export const createUser = async (userData: Omit<User, 'createdAt'>) => {
  const userRef = collection(db, getCollectionPath('users'));
  return await addDoc(userRef, {
    ...userData,
    createdAt: Timestamp.now()
  });
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, getCollectionPath('users'), userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? { id: userSnap.id, ...userSnap.data() } as User : null;
};

export const getAllUsers = async () => {
  const usersRef = collection(db, getCollectionPath('users'));
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  const userRef = doc(db, getCollectionPath('users'), userId);
  return await updateDoc(userRef, updates);
};

// Course operations
export const createCourse = async (courseData: Omit<Course, 'id' | 'createdAt'>) => {
  const courseRef = collection(db, getCollectionPath('courses'));
  return await addDoc(courseRef, {
    ...courseData,
    createdAt: Timestamp.now()
  });
};

export const getAllCourses = async () => {
  const coursesRef = collection(db, getCollectionPath('courses'));
  const snapshot = await getDocs(coursesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
};

export const getCourse = async (courseId: string) => {
  const courseRef = doc(db, getCollectionPath('courses'), courseId);
  const courseSnap = await getDoc(courseRef);
  return courseSnap.exists() ? { id: courseSnap.id, ...courseSnap.data() } as Course : null;
};

// Enrollment operations
export const enrollStudent = async (studentId: string, studentName: string, courseId: string) => {
  const enrollmentRef = collection(db, getCollectionPath('enrollments'));
  return await addDoc(enrollmentRef, {
    studentId,
    studentName,
    courseId,
    enrolledAt: Timestamp.now()
  });
};

export const getEnrollmentsByStudent = async (studentId: string) => {
  const enrollmentsRef = collection(db, getCollectionPath('enrollments'));
  const q = query(enrollmentsRef, where('studentId', '==', studentId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enrollment));
};

export const getEnrollmentsByCourse = async (courseId: string) => {
  const enrollmentsRef = collection(db, getCollectionPath('enrollments'));
  const q = query(enrollmentsRef, where('courseId', '==', courseId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enrollment));
};

// Announcement operations
export const createAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'timestamp'>) => {
  const announcementRef = collection(db, getCollectionPath('announcements'));
  return await addDoc(announcementRef, {
    ...announcementData,
    timestamp: Timestamp.now()
  });
};

export const getAnnouncements = async (userRole: string, enrolledCourseIds: string[] = []) => {
  const announcementsRef = collection(db, getCollectionPath('announcements'));
  let q = query(announcementsRef, orderBy('timestamp', 'desc'));
  
  const snapshot = await getDocs(q);
  const allAnnouncements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
  
  // Filter announcements based on user role and course enrollments
  return allAnnouncements.filter(announcement => {
    // Global announcements
    if (!announcement.courseId) {
      return !announcement.targetRole || 
             announcement.targetRole === 'all' || 
             announcement.targetRole === userRole;
    }
    // Course-specific announcements
    return enrolledCourseIds.includes(announcement.courseId);
  });
};

// Resource operations
export const createResource = async (resourceData: Omit<Resource, 'id' | 'uploadedAt'>) => {
  const resourceRef = collection(db, getCollectionPath('resources'));
  return await addDoc(resourceRef, {
    ...resourceData,
    uploadedAt: Timestamp.now()
  });
};

export const getResourcesByCourse = async (courseId: string) => {
  const resourcesRef = collection(db, getCollectionPath('resources'));
  const q = query(resourcesRef, where('courseId', '==', courseId), orderBy('uploadedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
};

// Assignment operations
export const createAssignment = async (assignmentData: Omit<Assignment, 'id' | 'createdAt'>) => {
  const assignmentRef = collection(db, getCollectionPath('assignments'));
  return await addDoc(assignmentRef, {
    ...assignmentData,
    createdAt: Timestamp.now()
  });
};

export const getAssignmentsByCourse = async (courseId: string) => {
  const assignmentsRef = collection(db, getCollectionPath('assignments'));
  const q = query(assignmentsRef, where('courseId', '==', courseId), orderBy('dueDate', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));
};

// Submission operations
export const createSubmission = async (submissionData: Omit<Submission, 'id' | 'submittedAt'>) => {
  const submissionRef = collection(db, getCollectionPath('submissions'));
  return await addDoc(submissionRef, {
    ...submissionData,
    submittedAt: Timestamp.now()
  });
};

export const getSubmissionsByAssignment = async (assignmentId: string) => {
  const submissionsRef = collection(db, getCollectionPath('submissions'));
  const q = query(submissionsRef, where('assignmentId', '==', assignmentId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
};

export const getSubmissionByStudentAndAssignment = async (studentId: string, assignmentId: string) => {
  const submissionsRef = collection(db, getCollectionPath('submissions'));
  const q = query(submissionsRef, 
    where('studentId', '==', studentId), 
    where('assignmentId', '==', assignmentId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.length > 0 ? 
    { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Submission : null;
};
