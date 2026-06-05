import React from 'react';

function SkillChip({ skill, mode }) {
  const isHacker = mode === 'hacker';

  const handleMouseMove = (e) => {
    const chip = e.currentTarget;
    const rect = chip.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const highlightColor = isHacker 
      ? 'rgba(0, 255, 65, 0.24)' 
      : 'rgba(79, 242, 255, 0.18)';

    chip.style.background = `radial-gradient(circle at ${x}% ${y}%, ${highlightColor}, transparent 55%), var(--surface)`;
    if (isHacker) {
      chip.style.borderColor = 'var(--accent)';
      chip.style.boxShadow = '0 0 12px rgba(0, 255, 65, 0.25)';
    }
  };

  const handleMouseLeave = (e) => {
    const chip = e.currentTarget;
    chip.style.background = 'var(--surface)';
    if (isHacker) {
      chip.style.borderColor = 'var(--border)';
      chip.style.boxShadow = 'none';
    }
  };

  return (
    <button
      className="skill-chip"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHacker ? 'inset 0 0 0 1px rgba(0, 255, 65, 0.1), 0 0 15px rgba(0, 255, 65, 0.08)' : 'var(--shadow)',
      }}
    >
      {skill}
    </button>
  );
}

export default function Skills({ mode, techSkills, softSkills }) {
  const isHacker = mode === 'hacker';

  return (
    <>
      <section id="skills" className="section reveal show">
        <div className="container">
          <p 
            className="eyebrow" 
            data-hacker-label={isHacker ? "[ system capabilities ]" : "[ technology stack ]"}
          >
            {isHacker ? "Capabilities" : "Skills"}
          </p>
          <h2 style={{ textShadow: isHacker ? '0 0 13px rgba(0, 255, 65, 0.45)' : 'none' }}>
            Technical Skills
          </h2>
          <div className="skills-wrap">
            {techSkills.map((skill) => (
              <SkillChip key={skill} skill={skill} mode={mode} />
            ))}
          </div>
        </div>
      </section>

      <section id="soft-skills" className="section reveal show">
        <div className="container">
          <p 
            className="eyebrow" 
            data-hacker-label={isHacker ? "[ cognitive profiling ]" : "[ professional traits ]"}
          >
            {isHacker ? "Profiling" : "Soft Skills"}
          </p>
          <h2 style={{ textShadow: isHacker ? '0 0 13px rgba(0, 255, 65, 0.45)' : 'none' }}>
            Non-Technical Skills
          </h2>
          <div className="skills-wrap">
            {softSkills.map((skill) => (
              <SkillChip key={skill} skill={skill} mode={mode} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
