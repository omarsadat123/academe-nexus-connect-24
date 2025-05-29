
export interface User {
  id: string;
  userId: string;
  role: 'student' | 'faculty' | 'admin';
  displayName: string;
  email?: string;
  createdAt: Date;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  instructorId: string;
  instructor: string;
  createdBy: string;
  createdAt: Date;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  enrolledAt: Date;
}

export interface Announcement {
  id: string;
  text: string;
  timestamp: Date;
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
  uploadedAt: Date;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  createdBy: string;
  createdByName: string;
  createdAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  courseId: string;
  submissionText: string;
  submittedAt: Date;
  updatedAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  currentUser: any;
  loading: boolean;
  authError?: string | null;
  signIn: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  switchAccount: (role: 'student' | 'faculty' | 'admin', displayName: string) => Promise<void>;
}
