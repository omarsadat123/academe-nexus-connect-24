
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, AuthContextType } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider initializing...');
    
    if (!supabase) {
      console.warn('Supabase not configured, using demo mode');
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('Initial session:', session, error);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
        return;
      }

      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          avatar: data.avatar,
          createdAt: data.created_at,
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!supabase) {
      // Demo mode - simulate login with demo accounts
      console.log('Demo login for:', email);
      const demoUsers = {
        'admin@university.edu': { id: '1', name: 'Admin User', role: 'admin' as const },
        'sarah.johnson@university.edu': { id: '2', name: 'Sarah Johnson', role: 'faculty' as const },
        'john.student@university.edu': { id: '3', name: 'John Student', role: 'student' as const },
      };
      
      const demoUser = demoUsers[email as keyof typeof demoUsers];
      if (demoUser) {
        setUser({
          ...demoUser,
          email,
          avatar: '',
          createdAt: new Date().toISOString(),
        });
        return true;
      }
      return false;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    if (!supabase) {
      setUser(null);
      return;
    }
    
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
    if (!supabase) {
      console.warn('Registration not available in demo mode');
      return false;
    }

    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: 'defaultPassword123',
      });

      if (authError) {
        console.error('Auth registration error:', authError.message);
        return false;
      }

      if (authData.user) {
        // Then create the user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              avatar: userData.avatar,
            }
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError.message);
          return false;
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
