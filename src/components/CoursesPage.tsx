
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CoursesPageProps {
  onNavigate: (page: string, courseId?: string) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Courses</h2>
        <p className="text-muted-foreground">Manage and access your courses</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses Coming Soon</CardTitle>
          <CardDescription>Full course management functionality will be implemented next</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will include course creation, enrollment management, and detailed course views.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesPage;
