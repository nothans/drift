import React from 'react';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      {/* Top Horizon Fade */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black via-black to-transparent z-10" />

      {/* The Grid Floor */}
      <div className="absolute bottom-[-50%] left-[-50%] right-[-50%] h-[100vh] w-[200vw] origin-top bg-[linear-gradient(rgba(0,243,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.3)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%)]" />

      {/* Ceiling Grid (Mirror) - Optional, simpler version */}
      <div className="absolute top-[-50%] left-[-50%] right-[-50%] h-[100vh] w-[200vw] origin-bottom bg-[linear-gradient(rgba(0,243,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30 animate-grid [mask-image:linear-gradient(to_top,transparent_0%,black_40%)]" />

      {/* Light Traces - Horizontal */}
      <div className="absolute top-[20%] left-0 h-[2px] w-[200px] bg-cyan-400 blur-[2px] animate-trace-h opacity-50 shadow-[0_0_10px_#00f3ff]" style={{ animationDuration: '4s', top: '15%' }} />
      <div className="absolute top-[60%] left-0 h-[1px] w-[300px] bg-blue-500 blur-[1px] animate-trace-h opacity-30" style={{ animationDuration: '7s', animationDelay: '1s' }} />
      <div className="absolute top-[85%] left-0 h-[2px] w-[150px] bg-white blur-[2px] animate-trace-h opacity-60 shadow-[0_0_15px_#ffffff]" style={{ animationDuration: '3s', animationDelay: '2s' }} />

      {/* Light Traces - Vertical */}
      <div className="absolute top-0 left-[20%] w-[1px] h-[200px] bg-cyan-500 blur-[2px] animate-trace-v opacity-40" style={{ animationDuration: '5s' }} />
      <div className="absolute top-0 right-[15%] w-[2px] h-[300px] bg-pink-500 blur-[2px] animate-trace-v opacity-40 shadow-[0_0_10px_#ff00ff]" style={{ animationDuration: '6s', animationDelay: '1.5s' }} />

      {/* Glow Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-cyan-500/5 blur-[100px] rounded-full" />
    </div>
  );
};

export default FluidBackground;