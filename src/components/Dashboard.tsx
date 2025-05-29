
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Calendar,
  GraduationCap,
  Bell
} from 'lucide-react';
import { getEnrollmentsByStudent, getAllCourses, getAnnouncements } from '../services/firestore';
import { Course, Enrollment, Announcement } from '../types';

interface DashboardProps {
  onNavigate: (page: string, courseId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      try {
        // Load recent announcements
        const announcements = await getAnnouncements(user.id, user.role);
        setRecentAnnouncements(announcements.slice(0, 5));

        // Load enrolled courses for students
        if (user.role === 'student') {
          const enrollments = await getEnrollmentsByStudent(user.id);
          const allCourses = await getAllCourses();
          const enrolledCourseIds = enrollments.map(e => e.courseId);
          const userCourses = allCourses.filter(course => 
            enrolledCourseIds.includes(course.id)
          );
          setEnrolledCourses(userCourses);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>;
  }

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  const getRoleIcon = () => {
    switch (user.role) {
      case 'admin':
        return <Users className="h-5 w-5" />;
      case 'faculty':
        return <GraduationCap className="h-5 w-5" />;
      case 'student':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'faculty':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.displayName}</h1>
          <div className="flex items-center mt-2 space-x-2">
            {getRoleIcon()}
            <Badge className={getRoleColor()}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user.role === 'student' ? 'Enrolled Courses' : 'Total Courses'}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.role === 'student' ? enrolledCourses.length : '5'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentAnnouncements.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest updates and news</CardDescription>
          </CardHeader>
          <CardContent>
            {recentAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="border-l-4 border-primary pl-4">
                    <p className="text-sm text-muted-foreground">
                      By {announcement.author} • {announcement.timestamp instanceof Date 
                        ? announcement.timestamp.toLocaleDateString() 
                        : new Date(announcement.timestamp).toLocaleDateString()}
                    </p>
                    <p className="mt-1">{announcement.text}</p>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('announcements')}
                >
                  View All Announcements
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No recent announcements</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions / Course List */}
        <Card>
          <CardHeader>
            <CardTitle>
              {user.role === 'student' ? 'My Courses' : 'Quick Actions'}
            </CardTitle>
            <CardDescription>
              {user.role === 'student' ? 'Your enrolled courses' : 'Common tasks'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.role === 'student' ? (
              <div className="space-y-3">
                {enrolledCourses.length > 0 ? (
                  <>
                    {enrolledCourses.map((course) => (
                      <div 
                        key={course.id} 
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => onNavigate('course-detail', course.id)}
                      >
                        <div>
                          <h4 className="font-medium">{course.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Instructor: {course.instructor}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => onNavigate('courses')}
                    >
                      Browse All Courses
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">
                      You're not enrolled in any courses yet
                    </p>
                    <Button onClick={() => onNavigate('courses')}>
                      Browse Courses
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => onNavigate('courses')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Manage Courses
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => onNavigate('announcements')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Post Announcement
                </Button>
                {user.role === 'admin' && (
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => onNavigate('users')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
