import React, { useState, useEffect, useRef } from 'react';
import samuraiBgJpg from '../assets/samurai-bg.jpg';
import flowchartPreviewImg from '../assets/flowchart_preview.png';

export default function Splash({ onSelectMode, onFadeComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hoveredMode, setHoveredMode] = useState(null); // 'dev', 'hacker', 'flowchart', or null
  
  const canvasRef = useRef(null);

  const handleSelectMode = (mode) => {
    onSelectMode(mode); // Set mode state immediately
    setIsFadingOut(true); // Trigger transition fade out overlay
    setTimeout(() => {
      onFadeComplete(); // Unmount Splash screen after fade finishes
    }, 500);
  };

  // Live Matrix Rain Effect for Hacker Mode Hover
  useEffect(() => {
    if (hoveredMode !== 'hacker') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const font = 14;
    const columns = Math.floor(canvas.width / font) + 1;
    const drops = Array(columns).fill(1);
    
    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}*#@$%&+=";
    
    const draw = () => {
      ctx.fillStyle = 'rgba(7, 11, 18, 0.06)'; // trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41'; // matrix green
      ctx.font = `${font}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * font;
        const y = drops[i] * font;
        
        ctx.fillText(char, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [hoveredMode]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b12] text-white overflow-y-auto overflow-x-hidden px-4 py-8 transition-all duration-500 ease-in-out ${isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141c2b_1px,transparent_1px),linear-gradient(to_bottom,#141c2b_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none z-0" />
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#04060a_100%)] pointer-events-none z-0" />

      {/* Dynamic Blurred Mode Previews (Hover Glimpses) */}
      
      {/* DEV MODE: Samurai Photo Background */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out pointer-events-none z-[1] filter blur-[2px] brightness-[0.28] scale-102 ${
          hoveredMode === 'dev' ? 'opacity-85' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${samuraiBgJpg})` }}
      />
      
      {/* HACKER MODE: Live Matrix Rain Canvas */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-in-out z-[1] ${
          hoveredMode === 'hacker' ? 'opacity-40' : 'opacity-0'
        }`}
      />
      
      {/* FLOWCHART MODE: 3D Node Graph Glimpse */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out pointer-events-none z-[1] filter blur-[12px] brightness-[0.22] scale-105 ${
          hoveredMode === 'flowchart' ? 'opacity-75' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${flowchartPreviewImg})` }}
      />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Futuristic System Header */}
        <header className="mb-10 animate-fade-in">
          <p className="font-mono text-xs tracking-[0.25em] text-[#00e5ff] uppercase mb-2">
            [ System Boot Sequence Complete ]
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider font-mono text-slate-100 uppercase">
            Select Entry Interface Protocol
          </h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent mx-auto mt-4" />
        </header>

        {/* Protocol Choice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-2">
          
          {/* DEV MODE CARD */}
          <button
            onClick={() => handleSelectMode('dev')}
            onMouseEnter={() => setHoveredMode('dev')}
            onMouseLeave={() => setHoveredMode(null)}
            className={`group relative flex flex-col items-center text-center p-6 bg-[#0c1322] border border-[#1b2a47] rounded-xl cursor-pointer transition-all duration-300 ${
              hoveredMode === 'dev' ? 'scale-[1.04] border-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.18)]' : 
              hoveredMode ? 'opacity-40 scale-[0.96] border-[#1b2a47]' : 'hover:scale-[1.04] hover:border-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,229,255,0.18)]'
            }`}
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-600 group-hover:border-[#00e5ff] transition-colors" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-600 group-hover:border-[#00e5ff] transition-colors" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-600 group-hover:border-[#00e5ff] transition-colors" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-600 group-hover:border-[#00e5ff] transition-colors" />

            <div className="font-mono text-[10px] tracking-widest text-[#00e5ff] uppercase bg-[rgba(0,229,255,0.08)] px-2 py-0.5 rounded border border-[rgba(0,229,255,0.2)] mb-4">
              DEV_COCKPIT.exe
            </div>
            
            <h2 className="text-xl font-bold font-mono tracking-wide mb-3 text-slate-200 group-hover:text-[#00e5ff] transition-colors">
              Developer Mode
            </h2>
            
            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
              Access the interactive UI/UX developer cockpit. Features clean visuals, responsive grids, detailed animations, and product builds.
            </p>

            <span className="mt-6 font-mono text-xs text-[#00e5ff] opacity-60 group-hover:opacity-100 transition-opacity">
              [ Initialize Entry &gt; ]
            </span>
          </button>

          {/* HACKER MODE CARD */}
          <button
            onClick={() => handleSelectMode('hacker')}
            onMouseEnter={() => setHoveredMode('hacker')}
            onMouseLeave={() => setHoveredMode(null)}
            className={`group relative flex flex-col items-center text-center p-6 bg-[#0c1322] border border-[#1b2a47] rounded-xl cursor-pointer transition-all duration-300 ${
              hoveredMode === 'hacker' ? 'scale-[1.04] border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.18)]' : 
              hoveredMode ? 'opacity-40 scale-[0.96] border-[#1b2a47]' : 'hover:scale-[1.04] hover:border-[#00ff41] hover:shadow-[0_0_30px_rgba(0,255,65,0.18)]'
            }`}
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-600 group-hover:border-[#00ff41] transition-colors" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-600 group-hover:border-[#00ff41] transition-colors" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-600 group-hover:border-[#00ff41] transition-colors" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-600 group-hover:border-[#00ff41] transition-colors" />

            <div className="font-mono text-[10px] tracking-widest text-[#00ff41] uppercase bg-[rgba(0,255,65,0.08)] px-2 py-0.5 rounded border border-[rgba(0,255,65,0.2)] mb-4">
              SEC_TERMINAL.bin
            </div>
            
            <h2 className="text-xl font-bold font-mono tracking-wide mb-3 text-slate-200 group-hover:text-[#00ff41] transition-colors">
              Hacker Mode
            </h2>
            
            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
              Access the terminal cockpit. Features matrix rain scripts, security diagnostics, CTF reports, and vulnerability tooling.
            </p>

            <span className="mt-6 font-mono text-xs text-[#00ff41] opacity-60 group-hover:opacity-100 transition-opacity">
              [ Initialize Entry &gt; ]
            </span>
          </button>

          {/* FLOWCHART MODE CARD */}
          <button
            onClick={() => handleSelectMode('flowchart')}
            onMouseEnter={() => setHoveredMode('flowchart')}
            onMouseLeave={() => setHoveredMode(null)}
            className={`group relative flex flex-col items-center text-center p-6 bg-[#0c1322] border border-[#1b2a47] rounded-xl cursor-pointer transition-all duration-300 ${
              hoveredMode === 'flowchart' ? 'scale-[1.04] border-[#ffe600] shadow-[0_0_30px_rgba(255,230,0,0.18)]' : 
              hoveredMode ? 'opacity-40 scale-[0.96] border-[#1b2a47]' : 'hover:scale-[1.04] hover:border-[#ffe600] hover:shadow-[0_0_30px_rgba(255,230,0,0.18)]'
            }`}
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-600 group-hover:border-[#ffe600] transition-colors" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-600 group-hover:border-[#ffe600] transition-colors" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-600 group-hover:border-[#ffe600] transition-colors" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-600 group-hover:border-[#ffe600] transition-colors" />

            <div className="font-mono text-[10px] tracking-widest text-[#ffe600] uppercase bg-[rgba(255,230,0,0.08)] px-2 py-0.5 rounded border border-[rgba(255,230,0,0.2)] mb-4">
              SYS_FLOWCHART.sys
            </div>
            
            <h2 className="text-xl font-bold font-mono tracking-wide mb-3 text-slate-200 group-hover:text-[#ffe600] transition-colors">
              Flowchart Mode
            </h2>
            
            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
              Interactive cyberpunk mind-map / node graph. Features a central personal hub connected radially to projects, blogs, skills, and contact sub-nodes.
            </p>

            <span className="mt-6 font-mono text-xs text-[#ffe600] opacity-60 group-hover:opacity-100 transition-opacity">
              [ Initialize Entry &gt; ]
            </span>
          </button>

        </div>

        {/* Footer info */}
        <footer className="mt-12 font-mono text-[10px] text-slate-500 tracking-wider">
          SYSTEM_VERSION: v1.0.8 // ENCRYPTION: AES-256
        </footer>
      </div>
    </div>
  );
}
