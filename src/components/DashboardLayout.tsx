
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Home, 
  Users, 
  Book, 
  Settings, 
  Bell, 
  Search,
  Menu,
  User,
  Calendar
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'profile', label: 'Profile', icon: User },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'courses', label: 'Course Management', icon: Book },
        { id: 'announcements', label: 'Announcements', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }

    if (user?.role === 'faculty') {
      return [
        ...baseItems,
        { id: 'courses', label: 'My Courses', icon: Book },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'announcements', label: 'Announcements', icon: Bell },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
      ];
    }

    return [
      ...baseItems,
      { id: 'courses', label: 'My Courses', icon: Book },
      { id: 'assignments', label: 'Assignments', icon: Calendar },
      { id: 'announcements', label: 'Announcements', icon: Bell },
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Book className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">EduPortal</h1>
                <p className="text-xs text-muted-foreground capitalize">{user?.role} Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`nav-link w-full justify-start ${activeTab === item.id ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="w-full mt-3"
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-80"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
