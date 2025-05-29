
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Dashboard from './Dashboard';
import CoursesPage from './CoursesPage';
import AnnouncementsPage from './AnnouncementsPage';
import UsersPage from './UsersPage';
import CourseDetailPage from './CourseDetailPage';
import AccountSwitcherModal from './AccountSwitcherModal';

const CanvasApp = () => {
  const { user, loading, signIn, signInWithEmail, signOut, authError } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  const [email, setEmail] = useState('test@university.edu');
  const [password, setPassword] = useState('password123');

  const handleEmailLogin = async () => {
    setAttemptingLogin(true);
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Email login failed:', error);
    } finally {
      setAttemptingLogin(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setAttemptingLogin(true);
    try {
      await signIn();
    } catch (error) {
      console.error('Anonymous login failed:', error);
    } finally {
      setAttemptingLogin(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading University Canvas...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6 p-6">
          <h1 className="text-3xl font-bold">University Canvas</h1>
          <p className="text-muted-foreground">Welcome to the University Learning Management System</p>
          
          {authError && (
            <Alert variant="destructive">
              <AlertDescription>
                Authentication Error: {authError}
                <br />
                <small className="text-xs">
                  Note: This is a demo app. Firebase configuration may need to be set up for full functionality.
                </small>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button 
                onClick={handleEmailLogin}
                disabled={attemptingLogin}
                className="w-full"
              >
                {attemptingLogin ? 'Signing In...' : 'Sign In with Email'}
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            <Button 
              onClick={handleAnonymousLogin}
              disabled={attemptingLogin}
              variant="outline"
              className="w-full"
            >
              {attemptingLogin ? 'Signing In...' : 'Demo Mode (Anonymous)'}
            </Button>
            
            <div className="text-xs text-muted-foreground">
              <p>Demo Mode Features:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>View sample courses and announcements</li>
                <li>Test role-based permissions</li>
                <li>Experience the full UI without Firebase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleNavigation = (page: string, courseId?: string) => {
    setCurrentPage(page);
    if (courseId) {
      setSelectedCourseId(courseId);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'courses':
        return <CoursesPage onNavigate={handleNavigation} />;
      case 'course-detail':
        return <CourseDetailPage courseId={selectedCourseId} onBack={() => setCurrentPage('courses')} />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'users':
        return user.role === 'admin' ? <UsersPage /> : <Dashboard onNavigate={handleNavigation} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">University Canvas</h1>
          
          <nav className="flex items-center space-x-6">
            <Button 
              variant={currentPage === 'dashboard' ? 'default' : 'ghost'} 
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant={currentPage === 'courses' ? 'default' : 'ghost'} 
              onClick={() => setCurrentPage('courses')}
            >
              Courses
            </Button>
            <Button 
              variant={currentPage === 'announcements' ? 'default' : 'ghost'} 
              onClick={() => setCurrentPage('announcements')}
            >
              Announcements
            </Button>
            {user.role === 'admin' && (
              <Button 
                variant={currentPage === 'users' ? 'default' : 'ghost'} 
                onClick={() => setCurrentPage('users')}
              >
                Users
              </Button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <div className="font-medium">{user.displayName}</div>
              <div className="text-muted-foreground capitalize">{user.role}</div>
            </div>
            <Button variant="outline" onClick={() => setShowAccountSwitcher(true)}>
              Switch Account
            </Button>
            <Button variant="outline" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </main>

      {/* Account Switcher Modal */}
      {showAccountSwitcher && (
        <AccountSwitcherModal onClose={() => setShowAccountSwitcher(false)} />
      )}
    </div>
  );
};

export default CanvasApp;
