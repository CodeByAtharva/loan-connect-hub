
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, CreditCard, Users, Shield } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 animate-fade-in">
                Connecting Borrowers with Lenders <span className="text-primary">Directly</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 animate-slide-in">
                Cut out the middleman and get better rates for your loans or higher returns on your investments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Button size="lg" asChild>
                  <Link to="/borrower/signup">I Need a Loan</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/lender/signup">I Want to Lend</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                alt="Person using laptop for financial services" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A simple, transparent process that connects borrowers directly with lenders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Borrowers */}
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">For Borrowers</h3>
                  <ul className="text-left space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Create loan requests with your terms</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Get approved by multiple lenders</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Choose the best interest rate</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Receive funds quickly and securely</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/borrower/signup">Sign Up as Borrower</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Benefits */}
            <Card className="card-hover border-primary">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Platform Benefits</h3>
                  <ul className="text-left space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Secure transaction processing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Direct communication between parties</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Transparent fee structure</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>EMI tracking and management</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button variant="outline">
                      <Link to="/">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Lenders */}
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-teal-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">For Lenders</h3>
                  <ul className="text-left space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Browse verified borrower profiles</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Set your own interest rates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Diversify your investment portfolio</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Track all loan repayments easily</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/lender/signup">Sign Up as Lender</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">₹5Cr+</div>
              <p className="text-lg text-slate-600">Loans Facilitated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
              <p className="text-lg text-slate-600">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">9.5%</div>
              <p className="text-lg text-slate-600">Avg. Interest Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users already benefiting from our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/borrower/signup">Apply for a Loan</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/lender/signup">Become a Lender</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
