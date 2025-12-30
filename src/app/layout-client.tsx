'use client';

import { useState, useEffect } from 'react';
import { Loader, Nav, Social, Email, Footer } from '@/components';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const finishLoading = () => {
      setIsLoading(false);
    };

    if (typeof window !== 'undefined') {
      const timeout = setTimeout(finishLoading, 100);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <>
      <Loader finishLoading={() => setIsLoading(false)} />
      <Nav isHome={true} />
      <Social isHome={true} />
      <Email isHome={true} />
      <div className="relative">
        {children}
      </div>
      <Footer />
    </>
  );
}
