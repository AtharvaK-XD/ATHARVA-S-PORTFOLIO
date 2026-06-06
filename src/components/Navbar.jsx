import React from 'react';
import { Download } from 'lucide-react';

export default function Navbar({ mode, data }) {
  const { logo, links, badge } = data;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="flex items-center gap-3 md:gap-4">
          <a className="brand" href="#hero">{logo}</a>
          <span 
            className="hidden sm:inline-block font-mono text-xs border border-[var(--border)] px-2.5 py-1 rounded-md select-none"
            style={{
              background: 'color-mix(in srgb, var(--surface-strong) 80%, transparent)',
              color: 'var(--muted)',
            }}
          >
            {badge}
            {mode === 'hacker' && <span className="cursor-blink text-[var(--accent)] font-bold">|</span>}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="nav">
            {links.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="text-sm font-semibold hover:text-[var(--accent)] transition-colors duration-200"
                style={{
                  fontFamily: mode === 'hacker' ? 'var(--mono)' : 'inherit'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a 
            href="/Atharva_Kulkarni_Resume.pdf" 
            download="Atharva_Kulkarni_Resume.pdf"
            className="resume-btn"
            style={{
              fontFamily: mode === 'hacker' ? 'var(--mono)' : 'inherit'
            }}
          >
            <Download size={14} className="mr-1.5" />
            <span>{mode === 'hacker' ? 'resume.sh' : 'Resume'}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

