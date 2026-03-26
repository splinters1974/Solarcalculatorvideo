import { motion } from 'framer-motion';
import { sceneTransitions, springs } from '@/lib/video/animations';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Scene3_Carbon() {
  const [stage, setStage] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (stage < 2 || !counterRef.current) return;
    const obj = { val: 0 };
    const tl = gsap.timeline();
    tl.to(obj, {
      val: 62,
      duration: 1.6,
      ease: 'power3.out',
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.round(obj.val).toString();
      },
    });
    return () => { tl.kill(); };
  }, [stage]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-bg-dark overflow-hidden text-center"
      style={{ padding: '5vmin 7vmin' }}
      {...sceneTransitions.clipCircle}
    >
      <div className="absolute inset-0 z-0">
        <video src={`${import.meta.env.BASE_URL}videos/energy-flow.mp4`} autoPlay muted loop className="w-full h-full object-cover mix-blend-screen" style={{ opacity: 0.3 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-bg-dark/40 to-bg-dark/90" />
      </div>

      <div className="relative z-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : -15 }}
          transition={springs.snappy}
          className="flex items-center justify-center"
          style={{ gap: '2vmin', marginBottom: '3vmin' }}
        >
          <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
          <span className="text-accent font-bold uppercase" style={{ letterSpacing: '0.2em', fontSize: '2vmin' }}>ESG Goals</span>
          <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.95 }}
          transition={springs.smooth}
          style={{ fontSize: '7.5vmin', fontWeight: 700, lineHeight: 1.2, marginBottom: '5vmin' }}
        >
          Carbon savings <span className="text-gradient">clearly shown.</span>
        </motion.h2>

        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: stage >= 1 ? 1 : 0, rotate: stage >= 1 ? 0 : -90 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="relative mx-auto flex items-center justify-center"
          style={{ width: '42vmin', height: '42vmin' }}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-accent/20"
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 1, ease: 'easeOut' }}
            />
          ))}
          <div className="absolute inset-0 rounded-full border-2 border-accent/40 flex flex-col items-center justify-center bg-bg-dark/80 backdrop-blur-sm" style={{ boxShadow: '0 0 40px rgba(16,185,129,0.15)' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 10 }}
              transition={springs.snappy}
              className="flex items-baseline"
              style={{ gap: '1vmin' }}
            >
              <span ref={counterRef} className="text-white font-bold" style={{ fontSize: '14vmin' }}>0</span>
              <span className="text-accent font-bold" style={{ fontSize: '7vmin' }}>t</span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 2 ? 1 : 0 }}
              transition={{ delay: 0.4 }}
              className="text-text-secondary uppercase font-bold"
              style={{ fontSize: '2vmin', letterSpacing: '0.1em' }}
            >
              CO₂/yr
            </motion.span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-text-secondary"
          style={{ fontSize: '2.4vmin', marginTop: '4vmin', lineHeight: 1.5 }}
        >
          Annual carbon offset on a 500 kWp system<br/>30-yr offset: up to 5,300 tonnes
        </motion.p>
      </div>
    </motion.div>
  );
}
