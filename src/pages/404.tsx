
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      router.asPath
    );
  }, [router.asPath]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! The page you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
