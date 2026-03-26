import { motion } from 'framer-motion';
import { sceneTransitions, springs } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

export function Scene5_ZeroUpfront() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-primary flex flex-col justify-center items-center text-center px-12 overflow-hidden"
      {...sceneTransitions.perspectiveFlip}
    >
      {/* Background animated lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-accent-alt to-transparent w-full"
            style={{ top: `${(i + 1) * 10}%` }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-5xl"
      >
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springs.smooth}
          className="text-8xl font-bold mb-8 text-white leading-tight"
        >
          Zero upfront capital required.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
          transition={springs.snappy}
          className="bg-white/5 border border-accent-alt/30 rounded-full px-10 py-4 inline-block backdrop-blur-md mt-4"
        >
          <p className="text-3xl text-accent-alt font-medium">
            Funding options available
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="text-2xl text-text-secondary mt-12 max-w-2xl mx-auto"
        >
          Businesses don't need to invest anything to start saving.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
