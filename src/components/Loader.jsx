import React, { useState, useEffect } from 'react';

export function InitialLoader({ mode, progress, fadeOut }) {
  const isHacker = mode === 'hacker';
  const [terminalLines, setTerminalLines] = useState([]);

  useEffect(() => {
    if (!isHacker) return;
    
    const lines = [
      { prg: 0, text: "root@atharva:~# init --secure" },
      { prg: 15, text: "MOUNTING SECURED FILESYSTEMS... OK" },
      { prg: 35, text: "DECRYPTING CTF ARCHIVES... OK" },
      { prg: 60, text: "LOADING SHELL ENVIRONMENTS... OK" },
      { prg: 80, text: "SYNCHRONIZING SECURE SHELL... OK" },
      { prg: 100, text: "SYSTEM DECRYPTED. BOOTING PORTFOLIO." }
    ];

    const activeLines = lines.filter(line => progress >= line.prg);
    setTerminalLines(activeLines.map(l => `[  ${String(l.prg).padStart(3, ' ')}% ] ${l.text}`));
  }, [progress, isHacker]);

  return (
    <div className={`initial-loader-overlay ${isHacker ? 'hacker-loader' : 'dev-loader'} ${fadeOut ? 'fade-out' : ''}`}>
      {isHacker ? (
        <div className="terminal-loader-box">
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="term-title">system_boot.sh</span>
          </div>
          <div className="terminal-content">
            {terminalLines.map((line, idx) => (
              <div key={idx} className="term-line">{line}</div>
            ))}
            <div className="progress-bar-container mt-6 flex items-center justify-between">
              <span className="mr-4 font-mono text-sm">{progress}%</span>
              <span className="progress-bar-track flex-grow">
                <span className="progress-bar-fill" style={{ width: `${progress}%` }}></span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="dev-loader-box">
          <div className="spinner-wrap mb-6">
            <div className="spinner-ring"></div>
            <div className="spinner-core"></div>
          </div>
          <h1 className="dev-title font-sans">ATHARVA KULKARNI</h1>
          <p className="dev-subtitle uppercase tracking-widest text-[10px] opacity-65 mt-2">BUILDER &amp; CYBERSECURITY ENTHUSIAST</p>
          <div className="dev-progress-container mt-8">
            <div className="flex justify-between text-[11px] mb-2 opacity-80 font-mono">
              <span>INITIALIZING WORKSPACE</span>
              <span>{progress}%</span>
            </div>
            <div className="dev-progress-track">
              <div className="dev-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TransitionLoader({ targetMode, fadeOut }) {
  const isHacker = targetMode === 'hacker';
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`transition-loader-overlay ${isHacker ? 'to-hacker' : 'to-dev'} ${fadeOut ? 'fade-out' : ''}`}>
      <div className="transition-box">
        {isHacker ? (
          <>
            <div className="warning-icon mb-4">⚠</div>
            <h2 className="terminal-title text-xl font-mono text-[var(--accent)] tracking-wider">
              SWEEPING ENVIRONMENT
            </h2>
            <p className="terminal-subtitle font-mono text-sm opacity-80 mt-2">
              DECRYPTING SECURITY SECTOR{dots}
            </p>
            <div className="terminal-scanner mt-6">
              <div className="scanner-line"></div>
            </div>
          </>
        ) : (
          <>
            <div className="dev-cube-spinner mb-6">
              <div className="cube"></div>
            </div>
            <h2 className="dev-title text-xl font-sans font-bold tracking-wide">
              REBUILDING PORTFOLIO
            </h2>
            <p className="dev-subtitle text-[10px] tracking-widest opacity-60 mt-2 uppercase">
              COMPILING COMPONENTS{dots}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
