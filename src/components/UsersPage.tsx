
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const UsersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">User Management</h2>
        <p className="text-muted-foreground">Manage system users and roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management Coming Soon</CardTitle>
          <CardDescription>Admin functionality for managing users and roles</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will include user listing, role management, and user administration features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
