import React from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';

export const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Nova Games (Default)',
    title: 'Nova Unblocked Games',
    iconSvg: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/></svg>"
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes',
    iconSvg: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'><path d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'/></svg>"
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    iconSvg: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23eab308'><path d='M7.71 3.5L1.15 15l3.43 6h7.42l-6.86-12L7.71 3.5zm4.86 0l6.86 12 3.43-6-6.86-12h-3.43zm-4.14 14.5l3.43 6h13.71l-3.43-6H8.43z'/></svg>"
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    iconSvg: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2338bdf8'><path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/></svg>"
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas',
    iconSvg: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'><circle cx='12' cy='12' r='10' stroke='%23ef4444' stroke-width='2' fill='none'/><circle cx='12' cy='12' r='4' fill='%23ef4444'/></svg>"
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    iconSvg: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'><text x='2' y='18' font-size='18' font-weight='bold' font-family='serif'>W</text></svg>"
  }
];

export const TabCloakerModal = ({
  isOpen,
  onClose,
  currentPresetId,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Tab Cloaker Disguise</h2>
              <p className="text-xs text-slate-400">Change tab name and icon to disguise your screen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {CLOAK_PRESETS.map((preset) => {
            const isSelected = currentPresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500/80 text-white'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center overflow-hidden p-1 flex-shrink-0">
                    <img src={preset.iconSvg} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold">{preset.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate max-w-[220px]">
                      {preset.title}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
          <span className="font-semibold text-slate-300">Quick tip:</span>
          <span>Tab cloaking persists in your browser and survives page refreshes.</span>
        </div>
      </div>
    </div>
  );
};
