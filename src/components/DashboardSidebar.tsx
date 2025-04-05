
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { 
  Home, 
  CreditCard, 
  File, 
  Calendar, 
  MessageCircle, 
  User, 
  LogOut,
  Plus
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  active
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-x-2 text-slate-600 text-sm font-medium pl-6 pr-3 py-4 rounded-md hover:bg-slate-100 transition-colors",
        active && "bg-slate-100 text-primary"
      )}
    >
      <div className="flex items-center justify-center w-5 h-5">
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};

interface DashboardSidebarProps {
  userType: 'borrower' | 'lender';
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userType }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const borrowerRoutes = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      href: "/borrower/dashboard",
    },
    {
      icon: <Plus className="h-5 w-5" />,
      label: "Create Loan Request",
      href: "/borrower/create-loan",
    },
    {
      icon: <File className="h-5 w-5" />,
      label: "Applied Loans",
      href: "/borrower/applied-loans",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Accepted Loans",
      href: "/borrower/accepted-loans",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Loan Status & EMIs",
      href: "/borrower/loan-status",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "Messages",
      href: "/borrower/messages",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      href: "/borrower/profile",
    },
  ];

  const lenderRoutes = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      href: "/lender/dashboard",
    },
    {
      icon: <File className="h-5 w-5" />,
      label: "Loan Requests",
      href: "/lender/loan-requests",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Fund Loan",
      href: "/lender/fund-loan",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Loan Status",
      href: "/lender/loan-status",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "Messages",
      href: "/lender/messages",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      href: "/lender/profile",
    },
  ];

  const routes = userType === 'borrower' ? borrowerRoutes : lenderRoutes;

  return (
    <div className="h-full border-r flex flex-col bg-white w-64">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            active={pathname === route.href}
          />
        ))}
      </div>
      <div className="mt-auto p-6">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/">
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
