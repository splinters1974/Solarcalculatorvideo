import { motion } from 'framer-motion';
import { sceneTransitions, springs } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

const options = [
  { label: 'Outright Purchase', icon: '🏦' },
  { label: 'Asset Finance', icon: '📊' },
  { label: 'Power Purchase Agreement', icon: '⚡' },
  { label: 'Operating Lease', icon: '📋' },
];

export function Scene5_Funding() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-bg-dark flex flex-col items-center justify-center overflow-hidden"
      style={{ padding: '4vmin 6vmin' }}
      {...sceneTransitions.perspectiveFlip}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-accent-alt to-transparent w-full"
            style={{ height: '1px', top: `${(i + 1) * 13}%` }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 3.5 + i * 0.3, delay: i * 0.4, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : -15 }}
          transition={springs.snappy}
          className="text-center"
          style={{ marginBottom: '3.5vmin' }}
        >
          <div className="flex items-center justify-center" style={{ gap: '2vmin', marginBottom: '2vmin' }}>
            <div className="bg-accent-alt" style={{ height: '1px', width: '6vmin' }} />
            <span className="text-accent-alt font-bold uppercase" style={{ letterSpacing: '0.2em', fontSize: '2vmin' }}>Funding Options</span>
            <div className="bg-accent-alt" style={{ height: '1px', width: '6vmin' }} />
          </div>
          <h2 style={{ fontSize: '7vmin', fontWeight: 700, lineHeight: 1.2, marginBottom: '1vmin' }}>
            Flexible routes to ownership.
          </h2>
          <p className="text-text-secondary" style={{ fontSize: '2.5vmin' }}>Zero upfront cost options available</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vmin', marginBottom: '3vmin' }}>
          {options.map(({ label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: stage >= 2 ? 1 : 0, scale: stage >= 2 ? 1 : 0.88 }}
              transition={{ ...springs.bouncy, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 text-center flex flex-col items-center"
              style={{ borderRadius: '2vmin', padding: '2.5vmin' }}
            >
              <span style={{ fontSize: '5vmin', marginBottom: '1vmin' }}>{icon}</span>
              <p className="text-white/90 font-semibold" style={{ fontSize: '2.2vmin', lineHeight: 1.3 }}>{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 15 }}
          transition={springs.smooth}
          className="relative overflow-hidden border border-white/20"
          style={{ borderRadius: '2vmin', maxHeight: '28vmin' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/report-screenshot.jpeg`}
            alt="Solar Calculator Report"
            className="w-full block object-cover object-top"
            style={{ maxHeight: '28vmin' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/30 to-transparent" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 3 ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-0 inset-x-0"
            style={{ padding: '2vmin 2.5vmin' }}
          >
            <p className="text-accent font-semibold" style={{ fontSize: '2.2vmin' }}>
              The calculator shows ROI for each funding option — instantly.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
