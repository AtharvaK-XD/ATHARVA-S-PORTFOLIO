import { useState } from 'react';

export function useMode() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('portfolioMode') || 'dev';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [scanlineActive, setScanlineActive] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState(null);
  const [transitionFadeOut, setTransitionFadeOut] = useState(false);

  const triggerModeSwitch = () => {
    if (isTransitioning) return;

    const nextMode = mode === 'dev' ? 'hacker' : 'dev';
    setTransitionTarget(nextMode);
    setIsTransitioning(true);
    setScanlineActive(true);
    setTransitionFadeOut(false);

    setContentVisible(false);

    // After content is hidden, perform the switch in background but keep loader active
    setTimeout(() => {
      setMode(nextMode);
      localStorage.setItem('portfolioMode', nextMode);
      window.scrollTo(0, 0);
    }, 500);

    // Let the loader run for some time, then fade the new content in and start fading out loader (1000ms)
    setTimeout(() => {
      setContentVisible(true);
      setGlitchActive(true);
      setTransitionFadeOut(true);
    }, 1000);

    // Disable scanline sweep after it completes (1100ms).
    setTimeout(() => {
      setScanlineActive(false);
    }, 1100);

    // End transition (1400ms). Fade out overlay and reset target.
    setTimeout(() => {
      setGlitchActive(false);
      setIsTransitioning(false);
      setTransitionTarget(null);
      setTransitionFadeOut(false);
    }, 1400);
  };

  return {
    mode,
    isTransitioning,
    contentVisible,
    scanlineActive,
    glitchActive,
    transitionTarget,
    transitionFadeOut,
    triggerModeSwitch
  };
}
