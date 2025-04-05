
import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'borrower' | 'lender';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  userType
}) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar userType={userType} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader userType={userType} userName="John Doe" />
          <div className="flex-1 overflow-auto bg-slate-50 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
