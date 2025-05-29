
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  book, 
  users, 
  calendar, 
  upload, 
  plus,
  edit,
  download
} from 'lucide-react';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Faculty Dashboard</h2>
        <p className="text-muted-foreground">Manage your courses and students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Courses</CardTitle>
            <book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Need grading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources Uploaded</CardTitle>
            <upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Assignment submitted', course: 'CS 101', student: 'Alice Johnson', time: '5 minutes ago' },
                { action: 'New student enrolled', course: 'Advanced Math', student: 'Bob Wilson', time: '1 hour ago' },
                { action: 'Resource viewed', course: 'CS 101', student: 'Carol Smith', time: '2 hours ago' },
                { action: 'Forum post created', course: 'Data Structures', student: 'David Brown', time: '3 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.course} • {activity.student} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Assignment and exam schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { task: 'Grade Midterm Exams', course: 'CS 101', due: 'Tomorrow', priority: 'high' },
                { task: 'Project Presentations', course: 'Advanced Math', due: 'In 3 days', priority: 'medium' },
                { task: 'Final Assignment Due', course: 'Data Structures', due: 'Next week', priority: 'low' },
                { task: 'Course Evaluation', course: 'Digital Marketing', due: 'In 2 weeks', priority: 'medium' },
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-muted-foreground">{task.course}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                      {task.due}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">My Courses</h2>
          <p className="text-muted-foreground">Manage your course content and students</p>
        </div>
        <Button>
          <plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { 
            title: 'Introduction to Computer Science', 
            code: 'CS 101',
            students: 145, 
            resources: 24,
            assignments: 8,
            description: 'Fundamental concepts in computer science and programming'
          },
          { 
            title: 'Data Structures and Algorithms', 
            code: 'CS 201',
            students: 89, 
            resources: 31,
            assignments: 12,
            description: 'Advanced data structures and algorithmic thinking'
          },
        ].map((course, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.code} • {course.description}</CardDescription>
                </div>
                <Badge>Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{course.students}</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{course.resources}</div>
                      <div className="text-xs text-muted-foreground">Resources</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{course.assignments}</div>
                      <div className="text-xs text-muted-foreground">Assignments</div>
                    </div>
                  </div>
                  <Button className="w-full">
                    Manage Course
                  </Button>
                </TabsContent>
                
                <TabsContent value="resources" className="space-y-4">
                  <div className="space-y-2">
                    {['Lecture 1: Introduction.pdf', 'Lab Exercise 1.docx', 'Reference Links'].map((resource, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{resource}</span>
                        <Button variant="ghost" size="sm">
                          <download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <upload className="w-4 h-4 mr-2" />
                    Upload Resource
                  </Button>
                </TabsContent>
                
                <TabsContent value="assignments" className="space-y-4">
                  <div className="space-y-2">
                    {['Assignment 1: Basic Programming', 'Midterm Project', 'Final Exam'].map((assignment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{assignment}</span>
                        <Badge variant="outline">12 submissions</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </TabsContent>
              </Tabs>
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
      case 'students':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Student Management</h2>
            <p className="text-muted-foreground">View and interact with your students</p>
          </div>
        );
      case 'announcements':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Announcements</h2>
            <p className="text-muted-foreground">Post updates for your courses</p>
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

export default FacultyDashboard;
