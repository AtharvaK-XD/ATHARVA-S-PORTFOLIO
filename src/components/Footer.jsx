import React from 'react';

export default function Footer({ mode, contact }) {
  const { email, github, linkedin, tryhackme } = contact;
  const isHacker = mode === 'hacker';
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="text-sm">
          &copy; {year} Atharva Kulkarni. All rights reserved.
        </p>
        <div className="footer-links">
          <a href={`mailto:${email}`}>Email</a>
          <a href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          {tryhackme && (
            <a href={tryhackme} target="_blank" rel="noopener noreferrer">
              TryHackMe
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
