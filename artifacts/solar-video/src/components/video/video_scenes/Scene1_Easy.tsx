import { motion } from 'framer-motion';
import { sceneTransitions, staggerConfigs, itemVariants, springs } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

const fields = ['Building size & roof type', 'Location & energy tariff', 'Funding preference'];

export function Scene1_Easy() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-bg-dark overflow-hidden"
      style={{ padding: '5vmin 7vmin' }}
      {...sceneTransitions.wipe}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={`${import.meta.env.BASE_URL}images/executive.jpg`}
          alt="Executive"
          className="w-full h-full object-cover"
          style={{ opacity: 0.18 }}
          initial={{ scale: 1.08, filter: 'blur(8px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-bg-dark/60 to-bg-dark/95" />
      </div>

      <div className="relative z-20 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: staggerConfigs.slow } }}
          className="text-center"
          style={{ marginBottom: '4vmin' }}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center" style={{ gap: '2vmin', marginBottom: '2.5vmin' }}>
            <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
            <span className="text-accent font-bold uppercase" style={{ letterSpacing: '0.2em', fontSize: '2vmin' }}>Simplicity</span>
            <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
          </motion.div>
          <motion.h2 variants={itemVariants} style={{ fontSize: '8vmin', fontWeight: 700, lineHeight: 1.2, marginBottom: '2vmin' }}>
            Incredibly easy to use.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-text-secondary" style={{ fontSize: '3vmin', lineHeight: 1.5 }}>
            Very little input required to generate a comprehensive solar proposal.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20, scale: stage >= 1 ? 1 : 0.96 }}
          transition={springs.smooth}
          className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          style={{ borderRadius: '3vmin', padding: '4vmin' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2vmin' }}>
            <div className="bg-white/20 rounded-full" style={{ height: '1.5vmin', width: '30%' }} />
            {fields.map((label, i) => (
              <motion.div
                key={label}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: stage >= 2 ? 1 : 0, opacity: stage >= 2 ? 1 : 0 }}
                transition={{ ...springs.bouncy, delay: i * 0.15 }}
                className="bg-white/10 flex items-center"
                style={{ transformOrigin: 'left', height: '8vmin', borderRadius: '1.5vmin', padding: '0 2.5vmin', gap: '2vmin' }}
              >
                <div className="bg-accent/60 rounded-full" style={{ width: '3vmin', height: '3vmin', flexShrink: 0 }} />
                <span className="text-white/70" style={{ fontSize: '2.8vmin' }}>{label}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: stage >= 2 ? 1 : 0.9, opacity: stage >= 2 ? 1 : 0 }}
              transition={{ ...springs.snappy, delay: 0.6 }}
              className="bg-accent flex items-center justify-center"
              style={{ height: '8vmin', borderRadius: '2vmin', marginTop: '1vmin' }}
            >
              <span className="font-bold text-bg-dark" style={{ fontSize: '3vmin' }}>Generate Report →</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
