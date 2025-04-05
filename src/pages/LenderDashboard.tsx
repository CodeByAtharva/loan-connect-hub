
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LenderDashboard: React.FC = () => {
  // In a real app, this would come from your API/backend
  const lendingSummary = {
    activeLoans: 3,
    totalLent: 250000,
    pendingRequests: 5,
    expectedReturn: 287500
  };
  
  const activeLoans = [
    {
      id: 1,
      amount: 100000,
      borrower: 'Ankit Kumar',
      interestRate: 10.5,
      status: 'active',
      progress: 65,
      nextEmi: 8500,
      dueDate: '2025-04-15',
      totalReturn: 115000,
      receivedAmount: 74750
    },
    {
      id: 2,
      amount: 80000,
      borrower: 'Meera Joshi',
      interestRate: 9,
      status: 'active',
      progress: 40,
      nextEmi: 7200,
      dueDate: '2025-04-18',
      totalReturn: 88000,
      receivedAmount: 35200
    }
  ];
  
  const loanRequests = [
    {
      id: 101,
      amount: 50000,
      borrower: 'Vikram Singh',
      reason: 'Home renovation',
      duration: 12,
      requestedOn: '2025-04-02'
    },
    {
      id: 102,
      amount: 75000,
      borrower: 'Neha Sharma',
      reason: 'Education',
      duration: 24,
      requestedOn: '2025-04-01'
    }
  ];

  return (
    <DashboardLayout userType="lender">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Welcome, Rahul</h2>
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
              <div className="text-2xl font-bold">{lendingSummary.activeLoans}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Lent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{lendingSummary.totalLent.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Loan Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lendingSummary.pendingRequests}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Expected Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{lendingSummary.expectedReturn.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Including principal and interest
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Active Loans */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Active Loans</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/lender/loan-status">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {activeLoans.map((loan) => (
              <Card key={loan.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-semibold">₹{loan.amount.toLocaleString()}</h4>
                        <Badge variant="outline" className="text-green-500 bg-green-50">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Borrower: {loan.borrower}</p>
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
                  
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <div className="text-sm">Received: <span className="font-medium">₹{loan.receivedAmount.toLocaleString()}</span></div>
                      <div className="text-sm">Total Expected: <span className="font-medium">₹{loan.totalReturn.toLocaleString()}</span></div>
                    </div>
                    <div className="flex">
                      <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                      <Button size="sm" asChild>
                        <Link to={`/lender/messages`}>Contact Borrower</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Loan Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Loan Requests</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/lender/loan-requests">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {loanRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">₹{request.amount.toLocaleString()}</h4>
                      <p className="text-sm text-muted-foreground">Borrower: {request.borrower}</p>
                      <p className="text-sm text-muted-foreground">Purpose: {request.reason}</p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-sm font-medium">{request.duration} months duration</p>
                      <p className="text-xs text-muted-foreground">
                        Requested on {new Date(request.requestedOn).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">View Profile</Button>
                    <Button variant="destructive" size="sm" className="mr-2">Decline</Button>
                    <Button size="sm" asChild>
                      <Link to={`/lender/fund-loan`}>Approve & Fund</Link>
                    </Button>
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

export default LenderDashboard;
