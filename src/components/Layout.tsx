
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ 
  children, 
  title = "CryptoPredict AI - Cryptocurrency Prediction with AI",
  description = "Leverage advanced machine learning models to forecast cryptocurrency market trends and make data-driven investment decisions."
}: LayoutProps) => {
  // Set document title programmatically (since we're not using Next.js Head)
  if (typeof document !== 'undefined') {
    document.title = title;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <footer className="bg-card py-6 border-t border-border/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} CryptoPredict AI. All rights reserved.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
