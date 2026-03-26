import { motion } from 'framer-motion';
import { sceneTransitions, springs } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

const steps = [
  { num: '01', text: 'Enter your building & roof details' },
  { num: '02', text: 'Specify your energy use & region' },
  { num: '03', text: 'Receive your full indicative proposal' },
];

export function Scene1_Calculator() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2400),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-bg-dark flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ padding: '5vmin 7vmin' }}
      {...sceneTransitions.wipe}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-accent), transparent)', opacity: 0.12 }}
          animate={{ opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : -15 }}
          transition={springs.snappy}
          className="flex items-center justify-center"
          style={{ gap: '2vmin', marginBottom: '3vmin' }}
        >
          <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
          <span className="text-accent font-bold uppercase" style={{ letterSpacing: '0.2em', fontSize: '2vmin' }}>UK Solar Calculator</span>
          <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.95 }}
          transition={springs.smooth}
          style={{ fontSize: '7vmin', fontWeight: 700, lineHeight: 1.2, marginBottom: '2vmin' }}
        >
          See your solar opportunity<br/>in just <span className="text-gradient">3 minutes.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="text-text-secondary"
          style={{ fontSize: '2.8vmin', marginBottom: '4vmin', lineHeight: 1.5 }}
        >
          The UK's Industrial & Commercial Solar Calculator gives your business an instant, data-driven view of the opportunity on your site.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2vmin' }}>
          {steps.map(({ num, text }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: stage >= 3 ? 1 : 0, x: stage >= 3 ? 0 : -20 }}
              transition={{ ...springs.bouncy, delay: i * 0.15 }}
              className="flex items-center bg-white/5 border border-white/10"
              style={{ borderRadius: '1.5vmin', padding: '2.5vmin 3vmin', gap: '3vmin', textAlign: 'left' }}
            >
              <span className="text-accent font-bold font-mono" style={{ fontSize: '2vmin', width: '4vmin', flexShrink: 0 }}>{num}</span>
              <span className="text-white/80" style={{ fontSize: '2.8vmin' }}>{text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 10 }}
          transition={{ ...springs.snappy, delay: 0.5 }}
          className="inline-block bg-accent/10 border border-accent/30"
          style={{ marginTop: '3.5vmin', borderRadius: '10vmin', padding: '1.2vmin 3vmin' }}
        >
          <span className="text-accent font-semibold" style={{ fontSize: '2.2vmin' }}>No sign-up. No cost. Instant results.</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
