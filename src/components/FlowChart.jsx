import React from 'react';

export default function FlowChart() {
  return (
    <div className="w-full h-screen bg-[#020914] overflow-hidden relative">
      <iframe
        src="./galaxy-v3.html?v=3"
        className="w-full h-full border-none block bg-[#020914]"
        title="3D Flowchart Portfolio"
      />
    </div>
  );
}
