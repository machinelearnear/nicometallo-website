'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ClientLayout from '@/app/layout-client';

export default function NotFound() {
  return (
    <ClientLayout>
      <main className="fillHeight flex flex-col items-center justify-center py-[100px] px-[25px]">
        <motion.h1
          className="text-[150px] font-bold text-light-navy leading-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-2xl text-light-slate mt-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Page Not Found
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-link text-green hover:text-green/80 transition-colors"
          >
            Go back home
          </Link>
        </motion.div>
      </main>
    </ClientLayout>
  );
}
