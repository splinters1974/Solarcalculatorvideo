import { motion } from 'framer-motion';
import { sceneTransitions, springs } from '@/lib/video/animations';

export function Scene6_CTA() {
  return (
    <motion.div
      className="absolute inset-0 bg-white flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ padding: '6vmin' }}
      {...sceneTransitions.zoomThrough}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/10"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4vmin' }}>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-bg-dark/50 font-medium uppercase"
          style={{ letterSpacing: '0.2em', fontSize: '3vmin' }}
        >
          To find out more, visit
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springs.bouncy}
          style={{ width: '100%' }}
        >
          <h1 className="text-bg-dark font-bold tracking-tight" style={{ fontSize: '5.2vmin', lineHeight: 1.2, whiteSpace: 'nowrap', textAlign: 'center' }}>
            www.uksolarcalculator<span className="text-accent">.co.uk</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...springs.snappy }}
        >
          <div
            className="bg-bg-dark text-white font-bold shadow-xl flex items-center"
            style={{ padding: '2.5vmin 5vmin', borderRadius: '10vmin', fontSize: '3vmin', gap: '2vmin' }}
          >
            <span>Calculate Your Potential</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
