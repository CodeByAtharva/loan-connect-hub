
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/" className="font-medium hover:text-primary transition-colors">How It Works</Link>
          <Link to="/" className="font-medium hover:text-primary transition-colors">About Us</Link>
          <Link to="/" className="font-medium hover:text-primary transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/lender/signup">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/borrower/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
