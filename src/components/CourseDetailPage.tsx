
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CourseDetailPageProps {
  courseId: string | null;
  onBack: () => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Course Details</h2>
          <p className="text-muted-foreground">Course ID: {courseId}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Back to Courses
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Detail Coming Soon</CardTitle>
          <CardDescription>Full course detail view with resources, assignments, and more</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will include course information, resources, assignments, announcements, and student management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailPage;
