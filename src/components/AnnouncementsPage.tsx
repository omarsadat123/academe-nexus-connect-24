
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AnnouncementsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Announcements</h2>
        <p className="text-muted-foreground">View and manage announcements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcements Coming Soon</CardTitle>
          <CardDescription>Full announcement management with LLM summarization</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will include announcement creation, viewing, and AI-powered summarization features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsPage;
