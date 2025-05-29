
export interface User {
  userId: string;
  role: 'student' | 'faculty' | 'admin';
  displayName: string;
  email?: string;
  createdAt: any; // Firestore Timestamp
}

export interface Course {
  id: string;
  name: string;
  description: string;
  instructorId: string;
  instructor: string;
  createdBy: string;
  createdAt: any; // Firestore Timestamp
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  enrolledAt: any; // Firestore Timestamp
}

export interface Announcement {
  id: string;
  text: string;
  timestamp: any; // Firestore Timestamp
  authorId: string;
  author: string;
  courseId?: string;
  targetRole?: 'all' | 'student' | 'faculty' | 'admin';
}

export interface Resource {
  id: string;
  courseId: string;
  title: string;
  type: 'link' | 'text' | 'video' | 'pdf' | 'slides';
  content: string;
  category: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: any; // Firestore Timestamp
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: any; // Firestore Timestamp
  createdBy: string;
  createdByName: string;
  createdAt: any; // Firestore Timestamp
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  courseId: string;
  submissionText: string;
  submittedAt: any; // Firestore Timestamp
  updatedAt?: any; // Firestore Timestamp
}

export interface AuthContextType {
  user: User | null;
  currentUser: any; // Firebase User
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
  switchAccount: (role: string, displayName: string) => Promise<void>;
}
