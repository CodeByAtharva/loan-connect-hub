
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import SignupForm from '@/components/SignupForm';

const LenderSignup: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log('Lender signup data:', data);
    // In a real app, you would send this data to your backend
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="py-6 px-4 border-b bg-white">
        <div className="container mx-auto">
          <Logo />
        </div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <SignupForm userType="lender" onSubmit={handleSubmit} />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need a loan instead? <Link to="/borrower/signup" className="text-primary hover:underline">Sign up as a borrower</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LenderSignup;
