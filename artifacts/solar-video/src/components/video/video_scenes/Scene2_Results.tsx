import { motion } from 'framer-motion';
import { sceneTransitions, springs } from '@/lib/video/animations';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface StatCardProps {
  label: string;
  prefix?: string;
  value: number;
  suffix: string;
  delay: number;
  accentColor: string;
  note: string;
}

function StatCard({ label, prefix, value, suffix, delay, accentColor, note }: StatCardProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!visible || !countRef.current) return;
    const obj = { val: 0 };
    const tl = gsap.timeline();
    tl.to(obj, {
      val: value,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = Math.round(obj.val).toString();
      },
    });
    return () => { tl.kill(); };
  }, [visible, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={springs.bouncy}
      className="bg-white/5 border border-white/10 flex flex-col justify-between relative overflow-hidden"
      style={{ borderRadius: '2vmin', padding: '3vmin' }}
    >
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top left, ${accentColor}22, transparent 70%)` }} />
      <p className="text-text-muted uppercase font-bold relative z-10" style={{ fontSize: '1.8vmin', letterSpacing: '0.12em', marginBottom: '2vmin' }}>{label}</p>
      <div className="flex items-baseline justify-center relative z-10" style={{ gap: '0.5vmin' }}>
        {prefix && <span style={{ fontSize: '5vmin', fontWeight: 700, color: accentColor }}>{prefix}</span>}
        <span ref={countRef} className="text-white font-bold tracking-tight" style={{ fontSize: '9vmin' }}>0</span>
        <span style={{ fontSize: '4vmin', fontWeight: 600, color: accentColor }}>{suffix}</span>
      </div>
      <p className="text-text-secondary text-center relative z-10" style={{ fontSize: '1.8vmin', lineHeight: 1.4, marginTop: '1.5vmin' }}>{note}</p>
    </motion.div>
  );
}

export function Scene2_Results() {
  return (
    <motion.div
      className="absolute inset-0 bg-bg-dark flex flex-col justify-center items-center overflow-hidden"
      style={{ padding: '4vmin 6vmin' }}
      {...sceneTransitions.morphExpand}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={`${import.meta.env.BASE_URL}images/roi.png`}
          className="w-full h-full object-cover mix-blend-luminosity"
          style={{ opacity: 0.08 }}
          animate={{ scale: [1.08, 1] }}
          transition={{ duration: 6, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 via-transparent to-bg-dark" />
      </div>

      <div className="relative z-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.smooth}
          className="text-center"
          style={{ marginBottom: '4vmin' }}
        >
          <div className="flex items-center justify-center" style={{ gap: '2vmin', marginBottom: '2vmin' }}>
            <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
            <span className="text-accent font-bold uppercase" style={{ letterSpacing: '0.2em', fontSize: '2vmin' }}>Typical Results</span>
            <div className="bg-accent" style={{ height: '1px', width: '6vmin' }} />
          </div>
          <h2 style={{ fontSize: '6.5vmin', fontWeight: 700, lineHeight: 1.2 }}>
            A genuine return,<br/>not just a green gesture.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3vmin' }}>
          <StatCard label="Payback Period" value={4} suffix="-6yr" delay={400} accentColor="var(--color-accent)" note="Typical payback on a solar project" />
          <StatCard label="Project Lifespan" value={30} suffix="+yr" delay={700} accentColor="var(--color-accent)" note="Typical operational lifespan" />
          <StatCard label="Annual Savings" prefix="£" value={85} suffix="k" delay={1000} accentColor="var(--color-accent-alt)" note="Average annual savings on 500kWp" />
          <StatCard label="Carbon Savings" value={62} suffix="t CO₂" delay={1300} accentColor="#34d399" note="Annual carbon savings on 500kWp" />
        </div>
      </div>
    </motion.div>
  );
}
