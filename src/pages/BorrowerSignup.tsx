/*import React, { useState } from 'react';
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

const BorrowerSignup: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      console.log('Borrower signup data:', data);

      // Make API call to your backend
      const response = await fetch('/api/borrowers/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userType: 'borrower',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register borrower');
      }

      const responseData = await response.json();
      
      // Show success notification
      toast({
        title: "Registration Successful!",
        description: "Your borrower account has been created. Redirecting to dashboard...",
        variant: "default",
      });

      // Store user data in localStorage or state management solution
      localStorage.setItem('user', JSON.stringify({
        ...responseData.user,
        userType: 'borrower',
      }));

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/borrower/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Borrower registration failed:', error);
      
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
*/



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

const BorrowerSignup: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      console.log('Borrower signup data:', data);

      // Updated endpoint to match the backend route
      const response = await fetch('http://localhost:5000/api/auth/borrowers/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Failed to register borrower');
      }

      const responseData = await response.json();
      
      // Show success notification
      toast({
        title: "Registration Successful!",
        description: "Your borrower account has been created. Redirecting to dashboard...",
        variant: "default",
      });

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        ...responseData.data,
        userType: 'borrower',
      }));

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/borrower/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Borrower registration failed:', error);
      
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
            userType="borrower" 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting}
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Want to lend instead? <Link to="/lender/signup" className="text-primary hover:underline">Sign up as a lender</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BorrowerSignup;









