
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  book, 
  calendar, 
  download, 
  upload,
  bell
} from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Student Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's your academic overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">+0.1 from last semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Announcements</CardTitle>
            <bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">From your courses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest updates from your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: 'Midterm Exam Schedule Released', 
                  course: 'CS 101', 
                  faculty: 'Dr. Sarah Johnson', 
                  time: '2 hours ago',
                  urgent: true
                },
                { 
                  title: 'New Assignment Posted', 
                  course: 'Advanced Math', 
                  faculty: 'Prof. Michael Davis', 
                  time: '1 day ago',
                  urgent: false
                },
                { 
                  title: 'Guest Lecture Tomorrow', 
                  course: 'Digital Marketing', 
                  faculty: 'Dr. Lisa Chen', 
                  time: '2 days ago',
                  urgent: false
                },
              ].map((announcement, index) => (
                <div key={index} className="space-y-2 p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{announcement.title}</h4>
                    {announcement.urgent && (
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {announcement.course} • {announcement.faculty} • {announcement.time}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Announcements
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Assignments and exams due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: 'Programming Assignment 3', 
                  course: 'CS 101', 
                  due: 'Tomorrow 11:59 PM', 
                  priority: 'high',
                  submitted: false
                },
                { 
                  title: 'Calculus Problem Set', 
                  course: 'Advanced Math', 
                  due: 'Friday 5:00 PM', 
                  priority: 'medium',
                  submitted: false
                },
                { 
                  title: 'Marketing Analysis Paper', 
                  course: 'Digital Marketing', 
                  due: 'Next Monday', 
                  priority: 'low',
                  submitted: true
                },
              ].map((assignment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{assignment.title}</h4>
                    <Badge 
                      variant={
                        assignment.submitted ? 'default' : 
                        assignment.priority === 'high' ? 'destructive' : 
                        assignment.priority === 'medium' ? 'default' : 'secondary'
                      }
                    >
                      {assignment.submitted ? 'Submitted' : assignment.due}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{assignment.course}</p>
                  {!assignment.submitted && (
                    <Button size="sm" variant="outline" className="w-full">
                      <upload className="w-4 h-4 mr-2" />
                      Submit Assignment
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Your performance across all enrolled courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { course: 'Introduction to Computer Science', progress: 85, grade: 'A-', color: 'bg-green-500' },
              { course: 'Advanced Mathematics', progress: 78, grade: 'B+', color: 'bg-blue-500' },
              { course: 'Digital Marketing', progress: 92, grade: 'A', color: 'bg-green-500' },
              { course: 'Data Structures', progress: 65, grade: 'B-', color: 'bg-yellow-500' },
            ].map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">{course.course}</h4>
                  <Badge variant="outline">{course.grade}</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <Progress value={course.progress} className="flex-1" />
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">My Courses</h2>
        <p className="text-muted-foreground">Access your enrolled courses and materials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: 'Introduction to Computer Science', 
            code: 'CS 101',
            faculty: 'Dr. Sarah Johnson',
            progress: 85,
            nextClass: 'Tomorrow 10:00 AM',
            resources: 24,
            assignments: 3
          },
          { 
            title: 'Advanced Mathematics', 
            code: 'MATH 201',
            faculty: 'Prof. Michael Davis',
            progress: 78,
            nextClass: 'Friday 2:00 PM',
            resources: 31,
            assignments: 2
          },
          { 
            title: 'Digital Marketing', 
            code: 'MKT 301',
            faculty: 'Dr. Lisa Chen',
            progress: 92,
            nextClass: 'Monday 9:00 AM',
            resources: 18,
            assignments: 1
          },
        ].map((course, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.code} • {course.faculty}</CardDescription>
                </div>
                <Badge variant="secondary">{course.progress}%</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={course.progress} />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">{course.resources}</div>
                  <div className="text-muted-foreground">Resources</div>
                </div>
                <div>
                  <div className="font-medium">{course.assignments}</div>
                  <div className="text-muted-foreground">Pending</div>
                </div>
              </div>
              
              <div className="text-sm">
                <div className="font-medium">Next Class:</div>
                <div className="text-muted-foreground">{course.nextClass}</div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  View Course
                </Button>
                <Button size="sm" variant="outline">
                  <download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Assignments</h2>
        <p className="text-muted-foreground">Track and submit your assignments</p>
      </div>

      <div className="grid gap-6">
        {[
          { 
            title: 'Programming Assignment 3: Data Structures',
            course: 'CS 101',
            faculty: 'Dr. Sarah Johnson',
            dueDate: 'Tomorrow 11:59 PM',
            status: 'pending',
            points: 100,
            description: 'Implement a binary search tree with insertion, deletion, and search operations.'
          },
          { 
            title: 'Calculus Problem Set 5',
            course: 'MATH 201',
            faculty: 'Prof. Michael Davis',
            dueDate: 'Friday 5:00 PM',
            status: 'pending',
            points: 50,
            description: 'Solve integration problems using advanced techniques.'
          },
          { 
            title: 'Marketing Campaign Analysis',
            course: 'MKT 301',
            faculty: 'Dr. Lisa Chen',
            dueDate: 'Last Monday',
            status: 'submitted',
            points: 150,
            grade: 142,
            description: 'Analyze a real-world marketing campaign and propose improvements.'
          },
        ].map((assignment, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.course} • {assignment.faculty}</CardDescription>
                </div>
                <Badge 
                  variant={
                    assignment.status === 'submitted' ? 'default' : 
                    assignment.dueDate.includes('Tomorrow') ? 'destructive' : 'secondary'
                  }
                >
                  {assignment.status === 'submitted' ? 'Submitted' : assignment.dueDate}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{assignment.description}</p>
              
              <div className="flex justify-between text-sm">
                <span>Points: {assignment.points}</span>
                {assignment.grade && (
                  <span className="font-medium">Grade: {assignment.grade}/{assignment.points}</span>
                )}
              </div>
              
              {assignment.status === 'pending' ? (
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Submission
                  </Button>
                  <Button size="sm" variant="outline">
                    Download Feedback
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardOverview();
      case 'courses':
        return renderCourses();
      case 'assignments':
        return renderAssignments();
      case 'announcements':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Announcements</h2>
            <p className="text-muted-foreground">Stay updated with course announcements</p>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Profile Settings</h2>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>
        );
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default StudentDashboard;
