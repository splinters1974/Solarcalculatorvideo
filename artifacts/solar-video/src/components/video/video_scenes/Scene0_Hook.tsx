import { motion } from 'framer-motion';
import { sceneTransitions, springs } from '@/lib/video/animations';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const locations = [
  {
    label: 'Roofs',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '8vmin', height: '8vmin' }}>
        <path d="M6 24L24 6L42 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 24V40H38V24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="18" y="28" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
        <line x1="16" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="13" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Ground',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '8vmin', height: '8vmin' }}>
        <rect x="6" y="14" width="36" height="20" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="6" y1="34" x2="42" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="10" y1="39" x2="38" y2="39" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="14" x2="18" y2="34" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="14" x2="30" y2="34" stroke="currentColor" strokeWidth="2"/>
        <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    label: 'Car Parks',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '8vmin', height: '8vmin' }}>
        <path d="M8 30L12 16H36L40 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="6" y="30" width="36" height="8" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="14" cy="38" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="34" cy="38" r="3" stroke="currentColor" strokeWidth="2"/>
        <line x1="6" y1="10" x2="42" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="6" y1="6" x2="42" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
      </svg>
    ),
  },
];

export function Scene0_Hook() {
  const [stage, setStage] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (stage >= 1 && lineRef.current) {
      gsap.fromTo(lineRef.current, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
    }
  }, [stage]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black overflow-hidden"
      {...sceneTransitions.scaleFade}
    >
      <div className="absolute inset-0 z-0">
        <video src={`${import.meta.env.BASE_URL}videos/warehouse-roof.mp4`} autoPlay muted loop className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-transparent to-bg-dark/80" />
      </div>

      <motion.div className="absolute inset-0 z-10 pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, var(--color-accent), transparent)' }}
        animate={{ scale: stage >= 1 ? 1.4 : 1, opacity: stage >= 1 ? 0.3 : 0.15 }}
        transition={{ duration: 3, ease: 'easeOut' }}
      />

      <div className="relative z-20 w-full" style={{ padding: '0 6vmin' }}>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : -15 }}
          transition={springs.snappy}
          className="flex items-center justify-center"
          style={{ marginBottom: '4vmin', gap: '2vmin' }}
        >
          <div ref={lineRef} className="bg-accent" style={{ height: '1px', width: '6vmin', scaleX: 0 }} />
          <span className="text-accent font-bold uppercase" style={{ letterSpacing: '0.2em', fontSize: '2vmin' }}>The Hidden Asset</span>
          <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
          transition={{ ...springs.smooth, delay: 0.1 }}
          style={{ fontSize: '7.5vmin', lineHeight: 1.15, marginBottom: '1.5vmin', fontWeight: 700 }}
        >
          Most UK businesses are sitting on
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
          transition={{ ...springs.smooth, delay: 0.2 }}
          className="text-gradient"
          style={{ fontSize: '7.5vmin', lineHeight: 1.15, marginBottom: '6vmin', fontWeight: 700 }}
        >
          untapped solar potential
        </motion.h1>

        <div className="flex justify-center" style={{ gap: '3vmin' }}>
          {locations.map(({ label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: stage >= 2 ? 1 : 0, scale: stage >= 2 ? 1 : 0.8, y: stage >= 2 ? 0 : 20 }}
              transition={{ ...springs.bouncy, delay: i * 0.15 }}
              className="flex flex-col items-center border border-white/20 bg-white/5 backdrop-blur-md"
              style={{ padding: '3vmin 4vmin', borderRadius: '2vmin', gap: '1.5vmin' }}
            >
              <span className="text-accent">{icon}</span>
              <span className="font-semibold text-white/90" style={{ fontSize: '2.5vmin' }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
