import { useState } from 'react';

export function useMode() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('portfolioMode') || 'dev';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [scanlineActive, setScanlineActive] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const triggerModeSwitch = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setScanlineActive(true);

    // Overlay fades in (150ms). After it's fully faded in, we start fading out the content.
    setTimeout(() => {
      setContentVisible(false);
    }, 150);

    // After content has faded out completely (300ms total from start), we update the mode,
    // fade the new content in, and trigger the hero title glitch animation.
    setTimeout(() => {
      const nextMode = mode === 'dev' ? 'hacker' : 'dev';
      setMode(nextMode);
      localStorage.setItem('portfolioMode', nextMode);
      setContentVisible(true);
      setGlitchActive(true);
    }, 300);

    // Disable scanline sweep after it completes (400ms).
    setTimeout(() => {
      setScanlineActive(false);
    }, 400);

    // Jitter animation finishes after 300ms (600ms total since click). Fade out overlay and end transition.
    setTimeout(() => {
      setGlitchActive(false);
      setIsTransitioning(false);
    }, 600);
  };

  return {
    mode,
    isTransitioning,
    contentVisible,
    scanlineActive,
    glitchActive,
    triggerModeSwitch
  };
}
