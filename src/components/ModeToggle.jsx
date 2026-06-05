import React from 'react';
import { Terminal, Shield } from 'lucide-react';

export default function ModeToggle({ mode, onToggle }) {
  const isDev = mode === 'dev';

  return (
    <button
      onClick={onToggle}
      className="fixed bottom-8 right-8 z-[1000] flex items-center gap-2.5 px-5 py-3 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer font-semibold shadow-lg text-sm tracking-wide"
      style={{
        background: isDev 
          ? 'rgba(255, 255, 255, 0.85)' 
          : 'rgba(3, 31, 23, 0.85)',
        borderColor: 'var(--border)',
        color: 'var(--text)',
        fontFamily: isDev ? 'inherit' : 'var(--mono)',
        boxShadow: isDev ? 'var(--shadow)' : '0 0 20px rgba(0, 255, 65, 0.25)',
      }}
      aria-label={isDev ? "Switch to Hacker Mode" : "Switch to Dev Mode"}
    >
      {isDev ? (
        <>
          <Terminal size={18} className="text-[#3861fb]" />
          <span className="font-semibold text-xs md:text-sm">Switch to Hacker Mode</span>
        </>
      ) : (
        <>
          <Shield size={18} className="text-[#00ff41] animate-pulse" />
          <span className="font-semibold text-xs md:text-sm">Switch to Dev Mode</span>
        </>
      )}
    </button>
  );
}
