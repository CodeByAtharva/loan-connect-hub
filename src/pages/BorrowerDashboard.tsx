
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';

const BorrowerDashboard: React.FC = () => {
  // In a real app, this would come from your API/backend
  const loanSummary = {
    activeLoans: 2,
    totalBorrowed: 150000,
    pendingRequests: 1,
    nextPayment: {
      amount: 12500,
      dueDate: '2025-04-15'
    }
  };
  
  const recentLoans = [
    {
      id: 1,
      amount: 100000,
      lender: 'Rahul Sharma',
      interestRate: 10.5,
      status: 'active',
      progress: 65,
      nextEmi: 8500,
      dueDate: '2025-04-15'
    },
    {
      id: 2,
      amount: 50000,
      lender: 'Priya Patel',
      interestRate: 9.5,
      status: 'active',
      progress: 30,
      nextEmi: 4000,
      dueDate: '2025-04-22'
    }
  ];
  
  const pendingRequests = [
    {
      id: 101,
      amount: 75000,
      reason: 'Education',
      duration: 12,
      status: 'pending',
      createdDate: '2025-04-01'
    }
  ];

  return (
    <DashboardLayout userType="borrower">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Welcome, John</h2>
          <Button asChild>
            <Link to="/borrower/create-loan">
              <Plus className="h-4 w-4 mr-2" />
              Create Loan Request
            </Link>
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Loans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loanSummary.activeLoans}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Borrowed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{loanSummary.totalBorrowed.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loanSummary.pendingRequests}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{loanSummary.nextPayment.amount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Due on {new Date(loanSummary.nextPayment.dueDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Active Loans */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Active Loans</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/borrower/accepted-loans">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentLoans.map((loan) => (
              <Card key={loan.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-semibold">₹{loan.amount.toLocaleString()}</h4>
                        <Badge variant="outline" className="text-green-500 bg-green-50">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Lender: {loan.lender}</p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-sm font-medium">{loan.interestRate}% Interest</p>
                      <p className="text-xs text-muted-foreground">
                        Next EMI: ₹{loan.nextEmi.toLocaleString()} on {new Date(loan.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Repayment Progress</span>
                      <span>{loan.progress}%</span>
                    </div>
                    <Progress value={loan.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                    <Button size="sm">Pay EMI</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Pending Loan Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Pending Loan Requests</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/borrower/applied-loans">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-semibold">₹{request.amount.toLocaleString()}</h4>
                        <Badge variant="outline" className="text-amber-500 bg-amber-50">Pending</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Purpose: {request.reason}</p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-sm font-medium">{request.duration} months duration</p>
                      <p className="text-xs text-muted-foreground">
                        Created on {new Date(request.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                    <Button variant="ghost" size="sm">Cancel Request</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BorrowerDashboard;
