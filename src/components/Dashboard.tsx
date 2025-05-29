
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Book, Bell, Users } from 'lucide-react';
import { getAnnouncements, getAllCourses, getEnrollmentsByStudent } from '../services/firestore';
import { Course, Announcement, Enrollment } from '../types';

interface DashboardProps {
  onNavigate: (page: string, courseId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      try {
        // Load courses based on role
        const allCourses = await getAllCourses();
        
        let relevantCourseIds: string[] = [];
        let userCourses: Course[] = [];

        if (user.role === 'student') {
          const userEnrollments = await getEnrollmentsByStudent(user.userId);
          setEnrollments(userEnrollments);
          relevantCourseIds = userEnrollments.map(e => e.courseId);
          userCourses = allCourses.filter(course => relevantCourseIds.includes(course.id));
        } else if (user.role === 'faculty') {
          userCourses = allCourses.filter(course => course.instructorId === user.userId);
          relevantCourseIds = userCourses.map(course => course.id);
        } else {
          userCourses = allCourses;
          relevantCourseIds = allCourses.map(course => course.id);
        }

        setCourses(userCourses);

        // Load recent announcements
        const announcements = await getAnnouncements(user.role, relevantCourseIds);
        setRecentAnnouncements(announcements.slice(0, 5));

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getRoleSpecificStats = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Courses', value: courses.length, icon: Book },
          { title: 'Recent Announcements', value: recentAnnouncements.length, icon: Bell },
          { title: 'System Users', value: 'N/A', icon: Users }
        ];
      case 'faculty':
        return [
          { title: 'My Courses', value: courses.length, icon: Book },
          { title: 'Recent Announcements', value: recentAnnouncements.length, icon: Bell },
          { title: 'Students', value: 'N/A', icon: Users }
        ];
      case 'student':
        return [
          { title: 'Enrolled Courses', value: courses.length, icon: Book },
          { title: 'New Announcements', value: recentAnnouncements.length, icon: Bell },
          { title: 'Profile', value: user.displayName, icon: User }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.displayName}! Here's your university overview.
        </p>
      </div>

      {/* Role and User Info */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Current account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium">{user?.displayName}</p>
              <Badge variant="secondary" className="capitalize">
                {user?.role}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                User ID: {user?.userId.substring(0, 8)}...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getRoleSpecificStats().map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription>Latest updates from your courses</CardDescription>
        </CardHeader>
        <CardContent>
          {recentAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-primary pl-4">
                  <p className="text-sm font-medium">{announcement.text.substring(0, 100)}...</p>
                  <p className="text-xs text-muted-foreground">
                    By {announcement.author} • {announcement.timestamp?.toDate?.()?.toLocaleDateString()}
                  </p>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4"
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

      {/* Quick Course Access */}
      <Card>
        <CardHeader>
          <CardTitle>
            {user?.role === 'student' ? 'Your Courses' : 
             user?.role === 'faculty' ? 'Teaching' : 'All Courses'}
          </CardTitle>
          <CardDescription>Quick access to your courses</CardDescription>
        </CardHeader>
        <CardContent>
          {courses.length > 0 ? (
            <div className="space-y-2">
              {courses.slice(0, 5).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Instructor: {course.instructor}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onNavigate('course-detail', course.id)}
                  >
                    View
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => onNavigate('courses')}
              >
                View All Courses
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">
              {user?.role === 'student' ? 'You are not enrolled in any courses yet.' :
               user?.role === 'faculty' ? 'You are not assigned to any courses yet.' :
               'No courses have been created yet.'}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
