'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 60 }}
      className={clsx(
        'fixed top-0 left-0 w-full z-50 transition-all backdrop-blur-md',
        scrolled
          ? 'bg-white/80 shadow-md dark:bg-gray-900/80'
          : 'bg-transparent'
      )}
    >
      <div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Priyanshu</h1>
        <nav className='space-x-6 text-sm font-medium'>
          {['about', 'ledger', 'pastebox', 'stockflow', 'urbankicks'].map(
            (item) => (
              <Link
                href={`/${item}`}
                key={item}
                className='hover:text-blue-500 transition'
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            )
          )}
        </nav>
      </div>
    </motion.header>
  );
}
