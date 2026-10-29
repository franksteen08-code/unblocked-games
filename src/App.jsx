import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flame, 
  Gamepad2, 
  Clock, 
  Shuffle, 
  Heart,
} from 'lucide-react';
import { DEFAULT_GAMES } from './data/games.js';
import { Navbar } from './components/Navbar.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { TabCloakerModal, CLOAK_PRESETS } from './components/TabCloakerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { PanicOverlay } from './components/PanicOverlay.jsx';

export default function App() {
  const [games, setGames] = useState(DEFAULT_GAMES);
  const [activeGame, setActiveGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  
  // Modals & Panic states
  const [isCloakerOpen, setIsCloakerOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [currentPresetId, setCurrentPresetId] = useState('default');

  // Persistence: Favorites & Recently Played
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nova_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const [recentlyPlayedIds, setRecentlyPlayedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nova_recent') || '[]');
    } catch {
      return [];
    }
  });

  // Fetch games from /games.json on mount
  useEffect(() => {
    fetch('/games.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch games.json');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const customGames = JSON.parse(localStorage.getItem('nova_custom_games') || '[]');
          setGames([...customGames, ...data]);
        }
      })
      .catch((err) => {
        console.warn('Using bundled default games:', err);
        const customGames = JSON.parse(localStorage.getItem('nova_custom_games') || '[]');
        setGames([...customGames, ...DEFAULT_GAMES]);
      });
  }, []);

  // Restore saved tab cloaker preset
  useEffect(() => {
    const savedPresetId = localStorage.getItem('nova_cloak_preset');
    if (savedPresetId) {
      const preset = CLOAK_PRESETS.find(p => p.id === savedPresetId);
      if (preset) {
        applyCloakPreset(preset);
      }
    }
  }, []);

  // Global Panic Key shortcut listener (Press ']' or ESC to toggle)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ']' || (isPanicOpen && e.key === 'Escape')) {
        setIsPanicOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanicOpen]);

  const applyCloakPreset = (preset) => {
    setCurrentPresetId(preset.id);
    localStorage.setItem('nova_cloak_preset', preset.id);
    document.title = preset.title;

    const favicon = document.getElementById('app-favicon');
    if (favicon) {
      favicon.href = preset.iconSvg;
    }
  };

  const handleToggleFavorite = (e, id) => {
    const gameId = typeof e === 'string' ? e : id;
    if (typeof e !== 'string' && e?.stopPropagation) {
      e.stopPropagation();
    }
    setFavorites(prev => {
      const updated = prev.includes(gameId)
        ? prev.filter(item => item !== gameId)
        : [...prev, gameId];
      localStorage.setItem('nova_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const handlePlayGame = (game) => {
    setActiveGame(game);
    // Add to recently played
    setRecentlyPlayedIds(prev => {
      const filtered = prev.filter(id => id !== game.id);
      const updated = [game.id, ...filtered].slice(0, 8);
      localStorage.setItem('nova_recent', JSON.stringify(updated));
      return updated;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCustomGame = (newGame) => {
    const customGames = JSON.parse(localStorage.getItem('nova_custom_games') || '[]');
    const updated = [newGame, ...customGames];
    localStorage.setItem('nova_custom_games', JSON.stringify(updated));
    setGames(prev => [newGame, ...prev]);
    handlePlayGame(newGame);
  };

  const handlePlayRandom = () => {
    if (games.length === 0) return;
    const randomIndex = Math.floor(Math.random() * games.length);
    handlePlayGame(games[randomIndex]);
  };

  // Filtered and sorted games
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Category filter
        if (activeCategory === 'favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (activeCategory !== 'all') {
          if (game.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchDesc = game.description.toLowerCase().includes(q);
          const matchCategory = game.category.toLowerCase().includes(q);
          const matchTag = game.tags?.some(t => t.toLowerCase().includes(q));
          return matchTitle || matchDesc || matchCategory || matchTag;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'rating') return b.rating - a.rating;
        if (sortOption === 'az') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [games, activeCategory, searchQuery, favorites, sortOption]);

  // Recently played game objects
  const recentlyPlayedGames = useMemo(() => {
    return recentlyPlayedIds
      .map(id => games.find(g => g.id === id))
      .filter(Boolean);
  }, [recentlyPlayedIds, games]);

  // Featured game for spotlight banner
  const featuredGame = useMemo(() => {
    return games.find(g => g.id === 'slope-runner') || games[0];
  }, [games]);

  const categories = ['all', 'Action', 'Arcade', 'Puzzle', 'Retro', 'Sports', 'Casual'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Panic Cloak Overlay */}
      <PanicOverlay isOpen={isPanicOpen} onExit={() => setIsPanicOpen(false)} />

      {/* Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        favoritesCount={favorites.length}
        onOpenCloaker={() => setIsCloakerOpen(true)}
        onOpenAddGame={() => setIsAddGameOpen(true)}
        onPanic={() => setIsPanicOpen(true)}
        currentCloakTitle={CLOAK_PRESETS.find(p => p.id === currentPresetId)?.name || 'Nova Games'}
      />

      {/* Main Content View */}
      <main className="flex-1 pb-16">
        {activeGame ? (
          <GamePlayer
            game={activeGame}
            onBack={() => setActiveGame(null)}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={(id) => handleToggleFavorite(id)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            {/* Hero / Spotlight Banner */}
            {activeCategory === 'all' && !searchQuery && featuredGame && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 mb-8 shadow-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>FEATURED ARCADE HIT</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">{featuredGame.category}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      {featuredGame.title}
                    </h1>

                    <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                      {featuredGame.description}
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                      <button
                        onClick={() => handlePlayGame(featuredGame)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-102"
                      >
                        <Gamepad2 className="w-4 h-4" />
                        <span>Play Now</span>
                      </button>

                      <button
                        onClick={handlePlayRandom}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-medium text-xs sm:text-sm transition-colors"
                      >
                        <Shuffle className="w-4 h-4 text-indigo-400" />
                        <span>Random Game</span>
                      </button>
                    </div>
                  </div>

                  {/* Hero Preview Thumbnail */}
                  <div 
                    onClick={() => handlePlayGame(featuredGame)}
                    className="relative w-full md:w-80 aspect-[16/10] rounded-xl overflow-hidden border border-slate-700/70 shadow-2xl cursor-pointer group flex-shrink-0"
                  >
                    <img
                      src={featuredGame.thumbnail}
                      alt={featuredGame.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Gamepad2 className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recently Played Quick Rail */}
            {recentlyPlayedGames.length > 0 && !searchQuery && (
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Continue Playing</span>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {recentlyPlayedGames.map(game => (
                    <div
                      key={`recent-${game.id}`}
                      onClick={() => handlePlayGame(game)}
                      className="flex-shrink-0 w-44 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-2.5 cursor-pointer group transition-all"
                    >
                      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 mb-2">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 truncate">
                        {game.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {game.category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filter and Category Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {cat === 'all' ? 'All Games' : cat}
                    </button>
                  );
                })}

                <button
                  onClick={() => setActiveCategory('favorites')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === 'favorites'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Heart className="w-3 h-3" />
                  <span>Favorites ({favorites.length})</span>
                </button>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                <span className="text-xs text-slate-400">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="az">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Games Grid Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-slate-400">
                Showing <span className="font-semibold text-slate-200">{filteredGames.length}</span> games
                {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
              </div>

              <button
                onClick={handlePlayRandom}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle Play</span>
              </button>
            </div>

            {/* Game Cards Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={(e) => handleToggleFavorite(e, game.id)}
                    onPlay={handlePlayGame}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-12 text-center my-6 max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-white">No games found</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {searchQuery 
                    ? `No matches for "${searchQuery}". Try a different keyword.` 
                    : 'You haven\'t added any favorites yet! Click the heart on any game card.'}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-4 px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
                >
                  View All Games
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">NOVA GAMES</span>
            <span>·</span>
            <span>Clean unblocked HTML5 arcade &bull; Zero AI slop</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddGameOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Add Custom Iframe
            </button>
            <span>·</span>
            <button 
              onClick={() => setIsCloakerOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Tab Cloaker
            </button>
            <span>·</span>
            <span className="font-mono text-[11px] text-slate-600">
              Panic Key: [ ]
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TabCloakerModal
        isOpen={isCloakerOpen}
        onClose={() => setIsCloakerOpen(false)}
        currentPresetId={currentPresetId}
        onSelectPreset={applyCloakPreset}
      />

      <AddGameModal
        isOpen={isAddGameOpen}
        onClose={() => setIsAddGameOpen(false)}
        onAddGame={handleAddCustomGame}
        allGames={games}
      />
    </div>
  );
}
