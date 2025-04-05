import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import SignupForm from '@/components/SignupForm';
import { toast } from '@/components/ui/use-toast';

// Define the form data type based on the SignupForm component
type FormData = {
  name: string;
  phone: string;
  aadhar: string;
  pan: string;
  profession: string;
};

const LenderSignup: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      console.log('Lender signup data:', data);

      // Make API call to your backend
      const response = await fetch('/api/lenders/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userType: 'lender',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register lender');
      }

      const responseData = await response.json();
      
      // Show success notification
      toast({
        title: "Registration Successful!",
        description: "Your lender account has been created. Redirecting to dashboard...",
        variant: "default",
      });

      // Store user data in localStorage or state management solution
      localStorage.setItem('user', JSON.stringify({
        ...responseData.user,
        userType: 'lender',
      }));

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/lender/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Lender registration failed:', error);
      
      // Show error notification
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <SignupForm 
            userType="lender" 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting}
          />
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