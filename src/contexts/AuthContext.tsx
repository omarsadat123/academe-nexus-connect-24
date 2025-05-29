
import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInAnonymously, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUser, createUser, updateUser, getAllUsers } from '../services/firestore';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const generateDisplayName = () => {
    const uuid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36);
    return `User ${uuid.substring(0, 8).toUpperCase()}`;
  };

  const signIn = async () => {
    try {
      setAuthError(null);
      const result = await signInAnonymously(auth);
      setCurrentUser(result.user);
      return result;
    } catch (error: any) {
      console.error('Error signing in:', error);
      setAuthError(error.message || 'Authentication failed');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setCurrentUser(null);
      setAuthError(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const switchAccount = async (role: 'student' | 'faculty' | 'admin', displayName: string) => {
    if (!currentUser) return;
    
    try {
      await updateUser(currentUser.uid, { role, displayName });
      setUser(prev => prev ? { ...prev, role, displayName } : null);
    } catch (error) {
      console.error('Error switching account:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        
        try {
          let userProfile = await getUser(firebaseUser.uid);
          
          if (!userProfile) {
            // Check if this is the first user (should be admin)
            const allUsers = await getAllUsers();
            const isFirstUser = allUsers.length === 0;
            
            const newUser = {
              userId: firebaseUser.uid,
              role: isFirstUser ? 'admin' as const : 'student' as const,
              displayName: generateDisplayName(),
              email: firebaseUser.email || undefined
            };
            
            await createUser(newUser);
            userProfile = { ...newUser, id: firebaseUser.uid, createdAt: new Date() };
          }
          
          setUser(userProfile);
          setAuthError(null);
        } catch (error) {
          console.error('Error loading user profile:', error);
          setAuthError('Failed to load user profile');
        }
      } else {
        setCurrentUser(null);
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      currentUser, 
      loading, 
      signIn, 
      signOut, 
      switchAccount,
      authError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
