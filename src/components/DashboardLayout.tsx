
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
