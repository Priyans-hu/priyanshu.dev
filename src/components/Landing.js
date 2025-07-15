'use client';

import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <section className='h-screen flex flex-col justify-center items-center text-center bg-gradient-to-tr from-blue-500 to-purple-600 text-white'>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-5xl font-bold mb-4'
      >
        Hi, I’m Priyanshu 👋
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-lg max-w-xl'
      >
        Full-stack developer with a passion for sleek UIs and functional code.
        Building tools, products, and experiences that scale.
      </motion.p>
      <motion.a
        href='about'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='mt-8 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition'
      >
        Learn more
      </motion.a>
    </section>
  );
}
