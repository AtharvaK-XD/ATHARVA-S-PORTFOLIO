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
import ModeToggle from './components/ModeToggle';
import { InitialLoader, TransitionLoader } from './components/Loader';

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
    triggerModeSwitch
  } = useMode();

  const [initialLoading, setInitialLoading] = useState(true);
  const [loaderFadeOut, setLoaderFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const canvasRef = useRef(null);
  const data = content[mode];

  // Initial loading progress simulator
  useEffect(() => {
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
    if (!canvasRef.current) return;
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
      columns = Array.from({ length: columnCount }, () => Math.random() * -height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*@";
    const fontSize = 16;

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.fillStyle = "rgba(1, 7, 4, 0.16)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < columns.length; i++) {
        const x = i * fontSize;
        const y = columns[i];
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = i % 5 === 0 ? "rgba(110,255,180,0.95)" : "rgba(24,255,140,0.72)";
        ctx.fillText(char, x, y);
        columns[i] += fontSize;

        if (columns[i] > height + Math.random() * 260) {
          columns[i] = Math.random() * -240;
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
        const shift = Math.max(-14, Math.min(14, offset * 24));
        const tilt = Math.max(-2.2, Math.min(2.2, offset * 3.6));
        section.style.setProperty("--scroll-shift", `${shift}px`);
        section.style.setProperty("--scroll-tilt", `${tilt}deg`);
        section.classList.add("scroll-3d");
      });

      if (window.innerWidth > 700) {
        let focusedSection = null;
        let minDistance = Number.POSITIVE_INFINITY;
        const readLine = window.innerHeight * 0.35;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const relativeCenter = rect.top + (rect.height * 0.4);
          let distance = Math.abs(readLine - relativeCenter);

          if (section === sections[sections.length - 1]) {
            const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20;
            if (isAtBottom) distance -= window.innerHeight;
          }

          if (distance < minDistance) {
            minDistance = distance;
            focusedSection = section;
          }
        });

        sections.forEach((section) => {
          let isFocused = section === focusedSection;
          // Unblur both skill blocks together
          if (focusedSection && (focusedSection.id === "skills" || focusedSection.id === "soft-skills")) {
            if (section.id === "skills" || section.id === "soft-skills") {
              isFocused = true;
            }
          }
          section.classList.toggle("is-focused", isFocused);
          section.classList.toggle("is-defocused", !isFocused);
        });
      } else {
        sections.forEach((section) => {
          section.classList.remove("is-focused", "is-defocused");
        });
      }

      if (bgGradient) {
        bgGradient.style.transform = `translateY(${scrollTop * -0.03}px)`;
      }
      if (bgGrid) {
        bgGrid.style.transform = `translateY(${scrollTop * -0.018}px)`;
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
      <div className="bg-gradient" aria-hidden="true"></div>
      <div className="bg-grid" aria-hidden="true"></div>
      <div className="bg-scanlines" aria-hidden="true"></div>
      <div className="bg-noise" aria-hidden="true"></div>
      <canvas ref={canvasRef} id="matrixRain" className="matrix-rain" aria-hidden="true"></canvas>

      {/* Mode Switch Scanline Sweep Overlay */}
      <div className={`mode-transition-overlay ${isTransitioning ? 'show' : ''}`} aria-hidden="true">
        {scanlineActive && (
          <div className={`scanline-sweep-line scanline-sweep-active ${mode}`} />
        )}
      </div>

      {/* Mode Switch Transition Loader */}
      {isTransitioning && transitionTarget && (
        <TransitionLoader targetMode={transitionTarget} fadeOut={transitionFadeOut} />
      )}

      {/* Main Content wrapper with dynamic fade transition */}
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

      {/* Floating Identity Switcher */}
      <ModeToggle mode={mode} onToggle={triggerModeSwitch} />

      {/* Initial Page Loader overlay */}
      {initialLoading && (
        <InitialLoader mode={mode} progress={loadingProgress} fadeOut={loaderFadeOut} />
      )}
    </>
  );
}
