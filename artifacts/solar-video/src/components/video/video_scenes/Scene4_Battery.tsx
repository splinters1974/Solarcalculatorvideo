import { motion } from 'framer-motion';
import { sceneTransitions, staggerConfigs, itemVariants, springs } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

const features = [
  {
    label: 'Load Shifting',
    desc: 'Store cheap overnight energy, use it during peak tariff hours',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '5vmin', height: '5vmin' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22V14a10 10 0 0 1 20 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="4" y="22" width="24" height="4" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 8v6M13 11l3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Grid Trading',
    desc: 'Export surplus energy back to the grid for additional revenue',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '5vmin', height: '5vmin' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16h24M16 4v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 9l14 14M23 9L9 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
      </svg>
    ),
  },
  {
    label: 'Backup Power',
    desc: 'Protect operations against grid outages and price spikes',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '5vmin', height: '5vmin' }} xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L4 18h12l-4 10 16-14H16L20 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function BatterySVG() {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="35" y="8" width="50" height="12" rx="4" fill="currentColor" opacity="0.4"/>
      <rect x="10" y="20" width="100" height="168" rx="10" stroke="currentColor" strokeWidth="3"/>
      <rect x="18" y="28" width="84" height="34" rx="5" fill="currentColor" opacity="0.15"/>
      <rect x="18" y="28" width="56" height="34" rx="5" fill="currentColor" opacity="0.6"/>
      <rect x="18" y="70" width="84" height="34" rx="5" fill="currentColor" opacity="0.15"/>
      <rect x="18" y="70" width="75" height="34" rx="5" fill="currentColor" opacity="0.6"/>
      <rect x="18" y="112" width="84" height="34" rx="5" fill="currentColor" opacity="0.15"/>
      <rect x="18" y="112" width="42" height="34" rx="5" fill="currentColor" opacity="0.45"/>
      <rect x="18" y="154" width="84" height="24" rx="5" fill="currentColor" opacity="0.15"/>
      <rect x="18" y="154" width="25" height="24" rx="5" fill="currentColor" opacity="0.3"/>
      <path d="M52 159l-8 10h10l-8 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Scene4_Battery() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStage(1), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-bg-dark flex flex-col items-center justify-center overflow-hidden"
      style={{ padding: '5vmin 7vmin' }}
      {...sceneTransitions.splitHorizontal}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, var(--color-accent), transparent)', opacity: 0.08 }} />
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: staggerConfigs.slow } }}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center" style={{ gap: '2vmin', marginBottom: '2.5vmin' }}>
            <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
            <span className="text-accent font-bold uppercase" style={{ letterSpacing: '0.2em', fontSize: '2vmin' }}>Battery Storage</span>
            <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-center" style={{ fontSize: '7.5vmin', fontWeight: 700, lineHeight: 1.2, marginBottom: '4vmin' }}>
            Storage options <span className="text-gradient">included.</span>
          </motion.h2>
        </motion.div>

        <div className="flex items-center" style={{ gap: '5vmin' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.8 }}
            transition={springs.smooth}
            className="text-accent shrink-0"
            style={{ width: '18vmin', height: '30vmin' }}
          >
            <BatterySVG />
          </motion.div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3vmin' }}>
            {features.map(({ label, desc, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: stage >= 1 ? 1 : 0, x: stage >= 1 ? 0 : 20 }}
                transition={{ ...springs.bouncy, delay: 0.3 + i * 0.18 }}
                className="flex items-start"
                style={{ gap: '2.5vmin' }}
              >
                <div className="text-accent shrink-0" style={{ marginTop: '0.3vmin' }}>{icon}</div>
                <div>
                  <p className="font-semibold text-white" style={{ fontSize: '3vmin', marginBottom: '0.5vmin' }}>{label}</p>
                  <p className="text-text-muted" style={{ fontSize: '2.2vmin', lineHeight: 1.4 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
