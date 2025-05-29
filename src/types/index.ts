
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  facultyId: string;
  facultyName: string;
  studentIds: string[];
  resources: Resource[];
  assignments: Assignment[];
  announcements: Announcement[];
  createdAt: string;
  isActive: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  description?: string;
  category?: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  submissions: Submission[];
  createdAt: string;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  fileUrl?: string;
  text?: string;
  grade?: number;
  feedback?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  targetRole?: 'admin' | 'faculty' | 'student';
  courseId?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
}
