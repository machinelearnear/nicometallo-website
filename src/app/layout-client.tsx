'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader, Nav, Social, Email, Footer } from '@/components';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <>
          <Nav isHome={true} />
          <Social isHome={true} />
          <Email isHome={true} />
          <div className="relative">
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
