import React from 'react';
import { 
  Gamepad2, 
  Search, 
  Heart, 
  ShieldAlert, 
  Plus, 
  Eye, 
  X
} from 'lucide-react';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  favoritesCount,
  onOpenCloaker,
  onOpenAddGame,
  onPanic,
  currentCloakTitle,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                NOVA
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                GAMES
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">
              Fast & Unblocked Web Arcade
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, retro classics, categories..."
              className="w-full bg-slate-900 border border-slate-700/80 focus:border-indigo-500 rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Favorites Filter button */}
          <button
            onClick={() => setActiveCategory(activeCategory === 'favorites' ? 'all' : 'favorites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              activeCategory === 'favorites'
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                : 'bg-slate-900 border-slate-700/70 text-slate-300 hover:text-white hover:border-slate-600'
            }`}
            title="View starred favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${activeCategory === 'favorites' ? 'fill-rose-400 text-rose-400' : ''}`} />
            <span className="hidden md:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="text-[11px] font-bold text-rose-400">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Add Game button */}
          <button
            onClick={onOpenAddGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700/70 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
            title="Add your own custom game iframe"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          {/* Tab Cloaker Disguise */}
          <button
            onClick={onOpenCloaker}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700/70 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
            title="Tab Cloaker: disguise tab as Google Classroom or Docs"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Cloaker</span>
          </button>

          {/* Panic Emergency Button */}
          <button
            onClick={onPanic}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900/60 transition-all"
            title="Emergency Panic Key: press ']' to hide instantly"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span className="font-mono text-[11px] hidden sm:inline">Panic [ ]</span>
          </button>
        </div>
      </div>
    </header>
  );
};
