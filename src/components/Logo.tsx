
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
        <span className="text-white text-xl font-bold">LC</span>
      </div>
      <span className="text-xl font-bold text-primary">LoanConnectHub</span>
    </Link>
  );
};

export default Logo;
