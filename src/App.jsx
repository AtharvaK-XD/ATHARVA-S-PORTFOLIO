import React, { useState, useEffect, useRef } from 'react';
import { useMode } from './hooks/useMode';
import { content } from './content';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { InitialLoader, TransitionLoader } from './components/Loader';
import samuraiBg from './assets/samurai-bg.jpg';
import Splash from './components/Splash';
import FlowChart from './components/FlowChart';
import flowchartAvatar from './assets/flowchart-avatar.jpg';

import './styles/transitions.css';

export default function App() {
  const {
    mode,
    isTransitioning,
    contentVisible,
    scanlineActive,
    glitchActive,
    transitionTarget,
    transitionFadeOut,
    triggerModeSwitch,
    initializeMode
  } = useMode();

  const [initialLoading, setInitialLoading] = useState(true);
  const [loaderFadeOut, setLoaderFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [hasSelected, setHasSelected] = useState(false);

  const canvasRef = useRef(null);
  const data = content[mode] || content.dev;

  // Initial loading progress simulator
  useEffect(() => {
    if (!initialLoading) return;
    const duration = 1800; // 1.8 seconds
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setLoadingProgress(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Wait 400ms (showing 100%), then start fade-out
        setTimeout(() => {
          setLoaderFadeOut(true);
        }, 400);

        // Wait 900ms (400ms hold + 500ms transition), then unmount loader
        setTimeout(() => {
          setInitialLoading(false);
        }, 900);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // 1. Sync data-mode and cursor-crosshair class to document/body
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-mode', mode === 'hacker' ? 'hacker' : 'normal');
    document.body.classList.toggle('cursor-crosshair', mode === 'hacker');
  }, [mode]);

  // 2. Interactive Cursor Spotlight Effect
  useEffect(() => {
    let cursorTargetX = window.innerWidth * 0.5;
    let cursorTargetY = window.innerHeight * 0.2;
    let cursorCurrentX = cursorTargetX;
    let cursorCurrentY = cursorTargetY;
    let cursorAnimFrameId = null;

    const updateCursorTarget = (x, y) => {
      cursorTargetX = x;
      cursorTargetY = y;
      if (!cursorAnimFrameId) {
        cursorAnimFrameId = requestAnimationFrame(animateCursorSpotlight);
      }
    };

    const animateCursorSpotlight = () => {
      const smoothing = 0.14;
      cursorCurrentX += (cursorTargetX - cursorCurrentX) * smoothing;
      cursorCurrentY += (cursorTargetY - cursorCurrentY) * smoothing;

      const xPercent = (cursorCurrentX / window.innerWidth) * 100;
      const yPercent = (cursorCurrentY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--cursor-x", `${xPercent}%`);
      document.documentElement.style.setProperty("--cursor-y", `${yPercent}%`);

      // 3D parallax tilt on dev-mode background image
      const bgGridEl = document.querySelector('.bg-grid');
      if (bgGridEl && document.documentElement.getAttribute('data-mode') !== 'hacker') {
        const normX = (cursorCurrentX / window.innerWidth) - 0.5;
        const normY = (cursorCurrentY / window.innerHeight) - 0.5;
        bgGridEl.style.setProperty('--bg-rx', `${(normY * -12).toFixed(3)}deg`);
        bgGridEl.style.setProperty('--bg-ry', `${(normX * 12).toFixed(3)}deg`);
        bgGridEl.style.setProperty('--bg-tx', `${(normX * -75).toFixed(2)}px`);
        bgGridEl.style.setProperty('--bg-ty', `${(normY * -50).toFixed(2)}px`);
      }

      const dx = Math.abs(cursorTargetX - cursorCurrentX);
      const dy = Math.abs(cursorTargetY - cursorCurrentY);
      if (dx < 0.2 && dy < 0.2) {
        cursorAnimFrameId = null;
        return;
      }
      cursorAnimFrameId = requestAnimationFrame(animateCursorSpotlight);
    };

    const handleMouseMove = (e) => {
      updateCursorTarget(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        updateCursorTarget(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (cursorAnimFrameId) cancelAnimationFrame(cursorAnimFrameId);
    };
  }, []);

  // 3. Matrix Rain Background Canvas (runs on Hacker Mode)
  useEffect(() => {
    if (!canvasRef.current || !hasSelected) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let columns = [];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontSize = 16;
      const columnCount = Math.ceil(width / fontSize);
      columns = Array.from({ length: columnCount }, () => Math.random() * -100);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+=-/\\|?<>";
    const fontSize = 16;

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Original smooth trailer fade
      ctx.fillStyle = "rgba(1, 5, 4, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = columns[i];

        const isBoosted = document.body.classList.contains("matrix-boost");
        if (isBoosted) {
          ctx.fillStyle = i % 4 === 0 ? "rgba(220, 255, 230, 0.95)" : "rgba(24, 255, 140, 0.82)";
        } else {
          ctx.fillStyle = i % 6 === 0 ? "rgba(160, 255, 195, 0.75)" : "rgba(0, 255, 65, 0.42)";
        }

        ctx.fillText(char, x, y);

        // Standard speed is 10, boosted speed is 24
        const speed = isBoosted ? 24 : 10;
        columns[i] += speed;

        // Reset to top
        if (columns[i] > height && Math.random() > 0.982) {
          columns[i] = Math.random() * -80;
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    if (mode === 'hacker') {
      draw();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mode, hasSelected]);

  // 3b. Matrix Boost Effect on mode transitions
  useEffect(() => {
    if (mode === 'hacker') {
      document.body.classList.add('matrix-boost');
      const timer = setTimeout(() => {
        document.body.classList.remove('matrix-boost');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove('matrix-boost');
    }
  }, [mode]);

  // 4. 3D Scroll tilt & Focus/Defocus animations
  useEffect(() => {
    const updateOnScroll = () => {
      const sections = document.querySelectorAll(".section");
      const bgGradient = document.querySelector(".bg-gradient");
      const bgGrid = document.querySelector(".bg-grid");
      const bgNoise = document.querySelector(".bg-noise");

      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${Math.min(100, Math.max(0, progress))}%`);

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const offset = (window.innerHeight / 2 - centerY) / window.innerHeight;
        const shift = Math.max(-22, Math.min(22, offset * 32));
        const tilt = Math.max(-3.5, Math.min(3.5, offset * 5.5));
        section.style.setProperty("--scroll-shift", `${shift}px`);
        section.style.setProperty("--scroll-tilt", `${tilt}deg`);
        section.classList.add("scroll-3d");
      });



      if (bgGradient) {
        bgGradient.style.transform = `translateY(${scrollTop * -0.03}px)`;
      }
      if (bgGrid) {
        const isDevMode = document.documentElement.getAttribute('data-mode') !== 'hacker';
        if (isDevMode) {
          bgGrid.style.removeProperty('transform');
          bgGrid.style.removeProperty('--bg-scale');
          bgGrid.style.setProperty('--bg-parallax-y', '0px');
        } else {
          bgGrid.style.transform = `translateY(${scrollTop * -0.018}px)`;
        }
      }
      if (bgNoise) {
        bgNoise.style.transform = `translateY(${scrollTop * -0.012}px)`;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateOnScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // 5. IntersectionObserver Scroll Reveal animations
  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((el) => observer.observe(el));

    return () => {
      revealItems.forEach((el) => observer.unobserve(el));
    };
  }, [mode]);

  return (
    <>
      {/* Dynamic backgrounds */}
      {hasSelected && (
        <>
          <div className="bg-gradient" aria-hidden="true"></div>
          <div 
            className="bg-grid" 
            style={{ 
              backgroundImage: mode !== 'hacker' ? `radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.45) 100%), linear-gradient(rgba(11, 15, 23, 0.30), rgba(11, 15, 23, 0.40)), url(${samuraiBg})` : undefined 
            }} 
            aria-hidden="true"
          ></div>
          <div className="bg-scanlines" aria-hidden="true"></div>
          <div className="bg-noise" aria-hidden="true"></div>
          <canvas ref={canvasRef} id="matrixRain" className="matrix-rain" aria-hidden="true"></canvas>
        </>
      )}

      {/* Mode Switch Scanline Sweep Overlay */}
      {hasSelected && (
        <div className={`mode-transition-overlay ${isTransitioning ? 'show' : ''}`} aria-hidden="true">
          {scanlineActive && (
            <div className={`scanline-sweep-line scanline-sweep-active ${mode}`} />
          )}
        </div>
      )}

      {/* Mode Switch Transition Loader */}
      {hasSelected && isTransitioning && transitionTarget && (
        <TransitionLoader targetMode={transitionTarget} fadeOut={transitionFadeOut} />
      )}

      {/* Main Content wrapper with dynamic fade transition */}
      {hasSelected && (
        mode === 'flowchart' ? (
          <div className={`page-content-fade ${contentVisible ? 'visible' : ''}`}>
            <FlowChart photoUrl={flowchartAvatar} />
          </div>
        ) : (
          <div className={`page-content-fade ${contentVisible ? 'visible' : ''}`}>
            <Navbar mode={mode} data={data.navbar} />
            
            <main>
              <Hero mode={mode} data={data.hero} glitchActive={glitchActive} />
              <About mode={mode} text={data.about.text} contact={data.contact} />
              <Projects mode={mode} projects={data.projects} />
              <Blog mode={mode} blogs={data.blogs} emptyState={data.emptyState} />
              <Skills mode={mode} techSkills={data.techSkills} softSkills={data.softSkills} />
              <Contact mode={mode} contact={data.contact} />
            </main>
            
            <Footer mode={mode} contact={data.contact} />
          </div>
        )
      )}

      {/* Floating Back to Selection Button */}
      {hasSelected && (
        <button
          onClick={() => {
            setShowSplash(true);
            setHasSelected(false);
          }}
          className={`fixed bottom-8 right-8 z-[1000] flex items-center gap-2.5 px-5 py-3 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer font-semibold shadow-lg text-sm tracking-wide ${
            mode === 'flowchart' 
              ? 'bg-[rgba(255,230,0,0.1)] border-[rgba(255,230,0,0.3)] hover:border-[#ffe600] hover:shadow-[0_0_20px_rgba(255,230,0,0.25)] text-[#ffe600]' 
              : mode === 'hacker'
                ? 'bg-[rgba(3,31,23,0.85)] border-[#0f4f3d] hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.25)] text-[#00ff41] font-mono'
                : 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.18)] hover:border-[#00e5ff] hover:shadow-[0_0_20px_rgba(0,229,255,0.25)] text-[#00e5ff]'
          }`}
        >
          <span>[ Back to Selection ]</span>
        </button>
      )}

      {/* Splash Selection Screen */}
      {showSplash && (
        <Splash 
          onSelectMode={(selectedMode) => {
            initializeMode(selectedMode);
            setHasSelected(true);
          }} 
          onFadeComplete={() => {
            setShowSplash(false);
          }}
        />
      )}

      {/* Initial Page Loader overlay */}
      {initialLoading && (
        <InitialLoader mode={mode} progress={loadingProgress} fadeOut={loaderFadeOut} />
      )}
    </>
  );
}
