import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';

import { Scene0_Hook } from './video_scenes/Scene0_Hook';
import { Scene1_Calculator } from './video_scenes/Scene1_Calculator';
import { Scene1_Easy as Scene2_Easy } from './video_scenes/Scene1_Easy';
import { Scene2_Results as Scene3_Results } from './video_scenes/Scene2_Results';
import { Scene3_Carbon as Scene4_Carbon } from './video_scenes/Scene3_Carbon';
import { Scene4_Battery as Scene5_Battery } from './video_scenes/Scene4_Battery';
import { Scene5_Funding } from './video_scenes/Scene5_Funding';
import { Scene6_CTA } from './video_scenes/Scene6_CTA';

const SCENE_DURATIONS = {
  hook: 6500,
  calculator: 7000,
  easy: 6500,
  results: 7500,
  carbon: 6500,
  battery: 6500,
  funding: 8000,
  cta: 7000,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div
      className="w-full h-full overflow-hidden relative font-sans"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      <AnimatePresence mode="popLayout">
        {currentScene === 0 && <Scene0_Hook key="hook" />}
        {currentScene === 1 && <Scene1_Calculator key="calculator" />}
        {currentScene === 2 && <Scene2_Easy key="easy" />}
        {currentScene === 3 && <Scene3_Results key="results" />}
        {currentScene === 4 && <Scene4_Carbon key="carbon" />}
        {currentScene === 5 && <Scene5_Battery key="battery" />}
        {currentScene === 6 && <Scene5_Funding key="funding" />}
        {currentScene === 7 && <Scene6_CTA key="cta" />}
      </AnimatePresence>
    </div>
  );
}
