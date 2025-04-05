
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Connecting borrowers and lenders directly, making loans simpler, faster, and more accessible.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Borrowers</h3>
            <ul className="space-y-2">
              <li><Link to="/borrower/signup" className="text-muted-foreground hover:text-primary transition-colors">Sign Up</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">How to Apply</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Loan Calculator</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Lenders</h3>
            <ul className="space-y-2">
              <li><Link to="/lender/signup" className="text-muted-foreground hover:text-primary transition-colors">Sign Up</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">How to Lend</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Returns Calculator</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LoanConnectHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
