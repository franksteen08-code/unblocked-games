import React from 'react';

export const PanicOverlay = ({ isOpen, onExit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f9fa] text-[#202124] flex flex-col font-sans select-none overflow-hidden">
      {/* Google Classroom Top Bar */}
      <header className="h-16 border-b border-[#dadce0] bg-white px-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-[#5f6368]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
          <div className="flex items-center gap-2">
            <span className="text-xl font-normal text-[#5f6368]">Google</span>
            <span className="text-xl font-normal text-[#137333]">Classroom</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded transition-colors"
            title="Return (or press ESC)"
          >
            Esc to resume
          </button>
          <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-medium text-sm">
            S
          </div>
        </div>
      </header>

      {/* Classroom Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-medium text-[#202124]">Enrolled Classes</h1>
          <div className="text-xs text-[#5f6368]">Semester 1 · 2026-2027</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Class Card 1 */}
          <div className="bg-white border border-[#dadce0] rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="bg-[#1e8e3e] text-white p-4 h-28 relative">
              <h2 className="font-medium text-lg leading-snug">AP Computer Science A</h2>
              <p className="text-xs text-white/90">Period 3 · Room 204</p>
              <p className="text-xs text-white/80 mt-1">Mr. Reynolds</p>
            </div>
            <div className="p-4 min-h-[90px] text-xs text-[#5f6368]">
              Due tomorrow: Chapter 4 Recursion Lab Exercises
            </div>
          </div>

          {/* Class Card 2 */}
          <div className="bg-white border border-[#dadce0] rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="bg-[#1a73e8] text-white p-4 h-28 relative">
              <h2 className="font-medium text-lg leading-snug">World History II</h2>
              <p className="text-xs text-white/90">Period 5 · Room 112</p>
              <p className="text-xs text-white/80 mt-1">Mrs. Henderson</p>
            </div>
            <div className="p-4 min-h-[90px] text-xs text-[#5f6368]">
              Reading: Chapters 14-15 Industrial Era Primary Sources
            </div>
          </div>

          {/* Class Card 3 */}
          <div className="bg-white border border-[#dadce0] rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="bg-[#e37400] text-white p-4 h-28 relative">
              <h2 className="font-medium text-lg leading-snug">Pre-Calculus Honors</h2>
              <p className="text-xs text-white/90">Period 2 · Room 308</p>
              <p className="text-xs text-white/80 mt-1">Dr. Chen</p>
            </div>
            <div className="p-4 min-h-[90px] text-xs text-[#5f6368]">
              Unit Test Friday: Trigonometric Identities & Vector Math
            </div>
          </div>
        </div>
      </main>

      {/* Discrete bottom exit */}
      <footer className="p-4 text-center text-xs text-[#70757a]">
        Google Classroom · <button onClick={onExit} className="underline hover:text-black">Resume Session</button>
      </footer>
    </div>
  );
};
