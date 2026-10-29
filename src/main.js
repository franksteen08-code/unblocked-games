/**
 * Nova Unblocked Games - Pure Vanilla JavaScript Engine
 * Runs natively in all browsers without build tools or JSX compilation.
 */

// Preset cloaking configurations
const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Nova Games (Default)',
    title: 'Nova Unblocked Games',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/></svg>"
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'><path d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'/></svg>"
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23eab308'><path d='M7.71 3.5L1.15 15l3.43 6h7.42l-6.86-12L7.71 3.5zm4.86 0l6.86 12 3.43-6-6.86-12h-3.43zm-4.14 14.5l3.43 6h13.71l-3.43-6H8.43z'/></svg>"
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2338bdf8'><path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/></svg>"
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'><circle cx='12' cy='12' r='10' stroke='%23ef4444' stroke-width='2' fill='none'/><circle cx='12' cy='12' r='4' fill='%23ef4444'/></svg>"
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'><text x='2' y='18' font-size='18' font-weight='bold' font-family='serif'>W</text></svg>"
  }
];

// Fallback games if games.json fails to fetch
const FALLBACK_GAMES = [
  {
    id: "slope-runner",
    title: "Slope Runner 3D",
    category: "Action",
    badge: "Hot",
    rating: 4.9,
    plays: "1.2M",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    description: "High-speed 3D tunnel runner. Steer your ball through an endless neon highway, dodge obstacles, and survive high-velocity drops.",
    controls: "A/D or Left/Right Arrow to steer",
    tags: ["3D", "Runner", "Fast-Paced", "Neon", "Arcade"],
    iframeSrc: "./games/slope.html"
  },
  {
    id: "2048-classic",
    title: "2048 Classic",
    category: "Puzzle",
    badge: "Popular",
    rating: 4.8,
    plays: "980K",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    description: "Join the numbers and get to the 2048 tile! Slide tiles across the grid, combine identical powers of two, and aim for the highest score.",
    controls: "Arrow keys or WASD or Swipe to slide tiles",
    tags: ["Numbers", "Brain", "Strategy", "Math"],
    iframeSrc: "./games/2048.html"
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    category: "Arcade",
    badge: "Classic",
    rating: 4.7,
    plays: "850K",
    thumbnail: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=600&q=80",
    description: "The timeless tap-to-fly arcade game. Guide your bird through treacherous green pipes without hitting the edges.",
    controls: "Space, Click, or Tap to flap wings",
    tags: ["Arcade", "One-Button", "Skill", "Addictive"],
    iframeSrc: "./games/flappy-bird.html"
  },
  {
    id: "tetris-classic",
    title: "Tetris Classic",
    category: "Puzzle",
    badge: "Top Rated",
    rating: 4.9,
    plays: "1.5M",
    thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    description: "Drop, rotate, and clear lines with falling tetromino blocks. Features SRS rotation, level scaling, and soft/hard drop.",
    controls: "Left/Right to move, Up to rotate, Down to soft drop, Space to hard drop",
    tags: ["Retro", "Puzzle", "Blocks", "Strategy"],
    iframeSrc: "./games/tetris.html"
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker Empire",
    category: "Casual",
    badge: "Addictive",
    rating: 4.9,
    plays: "2.1M",
    thumbnail: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
    description: "Bake millions of cookies! Hire grandmas, construct cookie farms, open factories, and ascend to cosmic confectionary greatness.",
    controls: "Click big cookie and purchase empire upgrades",
    tags: ["Idle", "Clicker", "Management", "Tycoon"],
    iframeSrc: "./games/cookie-clicker.html"
  },
  {
    id: "retro-snake",
    title: "Retro Snake",
    category: "Retro",
    badge: "Retro",
    rating: 4.6,
    plays: "640K",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    description: "Eat the glowing apples, grow your tail, and avoid crashing into walls or yourself in this polished nostalgic arcade staple.",
    controls: "Arrow keys or WASD to steer",
    tags: ["Retro", "Classic", "Arcade", "Nokia"],
    iframeSrc: "./games/snake.html"
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    category: "Action",
    badge: "Classic",
    rating: 4.7,
    plays: "520K",
    thumbnail: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80",
    description: "Defend humanity against waves of descending alien invaders. Dodge enemy projectile barrages and clear the orbital sector.",
    controls: "Arrow keys to move, Space to fire lasers",
    tags: ["Retro", "Shooter", "Space", "Arcade"],
    iframeSrc: "./games/space-invaders.html"
  },
  {
    id: "neon-breakout",
    title: "Neon Breakout",
    category: "Arcade",
    badge: "Featured",
    rating: 4.8,
    plays: "480K",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
    description: "Smash your way through vibrant neon brick formations. Control the paddle bounce angle to target stubborn upper rows.",
    controls: "Mouse or Left/Right arrows to control paddle",
    tags: ["Brick Breaker", "Arcade", "Physics", "Neon"],
    iframeSrc: "./games/breakout.html"
  },
  {
    id: "retro-pong",
    title: "Retro Pong",
    category: "Sports",
    badge: "2-Player",
    rating: 4.5,
    plays: "390K",
    thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
    description: "The arcade forefather of video games. Challenge the computer with three difficulty modes, or challenge a friend locally in 2P mode.",
    controls: "P1: W/S or Mouse | P2: Up/Down Arrows",
    tags: ["Sports", "2-Player", "Retro", "Paddle"],
    iframeSrc: "./games/pong.html"
  },
  {
    id: "hextris",
    title: "Hextris Hexagon",
    category: "Puzzle",
    badge: "Fast",
    rating: 4.8,
    plays: "730K",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    description: "Fast-paced hexagonal puzzle game inspired by Tetris. Rotate the hexagon to connect 3 or more blocks of the same color.",
    controls: "Left / Right arrow keys to rotate hexagon",
    tags: ["Puzzle", "Hexagon", "Fast", "Match-3"],
    iframeSrc: "https://hextris.io/"
  }
];

// App State
let allGames = [];
let activeGame = null;
let activeCategory = 'all';
let searchQuery = '';
let sortOption = 'popular';
let favorites = JSON.parse(localStorage.getItem('nova_favorites') || '[]');
let recentIds = JSON.parse(localStorage.getItem('nova_recent') || '[]');
let currentPresetId = localStorage.getItem('nova_cloak_preset') || 'default';

// DOM Elements
const libraryView = document.getElementById('library-view');
const playerView = document.getElementById('player-view');
const heroSection = document.getElementById('hero-section');
const gamesGrid = document.getElementById('games-grid');
const searchInput = document.getElementById('search-input');
const searchClearBtn = document.getElementById('search-clear');
const sortSelect = document.getElementById('sort-select');
const gamesCountEl = document.getElementById('games-count');
const favoritesCountEl = document.getElementById('favorites-count');
const recentSection = document.getElementById('recent-section');
const recentRail = document.getElementById('recent-rail');

// Player DOM Elements
const playerIframe = document.getElementById('player-iframe');
const playerContainer = document.getElementById('player-frame-container');
const playerTitle = document.getElementById('player-title');
const playerCategory = document.getElementById('player-category');
const playerRating = document.getElementById('player-rating');
const playerPlays = document.getElementById('player-plays');
const playerDesc = document.getElementById('player-desc');
const playerControls = document.getElementById('player-controls');
const playerTags = document.getElementById('player-tags');
const playerFavBtn = document.getElementById('player-fav-btn');

// Modals
const cloakerModal = document.getElementById('cloaker-modal');
const addGameModal = document.getElementById('add-game-modal');
const panicScreen = document.getElementById('panic-screen');
const cloakPresetsList = document.getElementById('cloak-presets-list');

// Initialize Application
async function initApp() {
  restoreCloaker();
  setupEventListeners();

  try {
    const res = await fetch('./games.json');
    if (!res.ok) throw new Error('Fetch failed');
    const data = await res.json();
    const customGames = JSON.parse(localStorage.getItem('nova_custom_games') || '[]');
    allGames = [...customGames, ...data];
  } catch (err) {
    console.warn('Loading fallback games data:', err);
    const customGames = JSON.parse(localStorage.getItem('nova_custom_games') || '[]');
    allGames = [...customGames, ...FALLBACK_GAMES];
  }

  renderHero();
  renderRecent();
  renderGames();
  updateFavoritesCount();
}

// Restore saved Cloaker
function restoreCloaker() {
  const preset = CLOAK_PRESETS.find(p => p.id === currentPresetId) || CLOAK_PRESETS[0];
  applyCloakPreset(preset);
}

function applyCloakPreset(preset) {
  currentPresetId = preset.id;
  localStorage.setItem('nova_cloak_preset', preset.id);
  document.title = preset.title;
  const fav = document.getElementById('app-favicon');
  if (fav) fav.href = preset.icon;
}

// Resolve Iframe URL (handles relative paths on GitHub Pages)
function resolveGameUrl(game) {
  let src = game.iframeSrc;
  if (!src && game.iframe) {
    const m = game.iframe.match(/src=["']([^"']+)["']/i);
    src = m ? m[1] : '';
  }
  if (!src) return '';
  return new URL(src, window.location.href).href;
}

// Render Featured Hero
function renderHero() {
  const featured = allGames.find(g => g.id === 'slope-runner') || allGames[0];
  if (!featured) return;

  const heroCard = document.getElementById('hero-card');
  if (!heroCard) return;

  heroCard.innerHTML = `
    <div class="hero-info">
      <div class="hero-kicker">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
        <span>Featured Arcade Hit · ${featured.category}</span>
      </div>
      <h1 class="hero-title">${featured.title}</h1>
      <p class="hero-desc">${featured.description}</p>
      <div class="hero-buttons">
        <button class="btn-primary" onclick="launchGame('${featured.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Play Now
        </button>
        <button class="btn-secondary" onclick="playRandomGame()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
          Random Game
        </button>
      </div>
    </div>
    <div class="hero-thumbnail" onclick="launchGame('${featured.id}')">
      <img src="${featured.thumbnail}" alt="${featured.title}" />
      <div class="hero-play-overlay">
        <div class="hero-play-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
    </div>
  `;
}

// Render Games Grid
function renderGames() {
  const q = searchQuery.toLowerCase().trim();

  let filtered = allGames.filter(game => {
    if (activeCategory === 'favorites') {
      if (!favorites.includes(game.id)) return false;
    } else if (activeCategory !== 'all') {
      if (game.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
    }
    if (q) {
      const matchTitle = game.title.toLowerCase().includes(q);
      const matchDesc = game.description.toLowerCase().includes(q);
      const matchCat = game.category.toLowerCase().includes(q);
      const matchTag = game.tags?.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCat || matchTag;
    }
    return true;
  });

  if (sortOption === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === 'az') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  gamesCountEl.textContent = `${filtered.length} games`;

  // Toggle hero visibility
  if (heroSection) {
    heroSection.style.display = (activeCategory === 'all' && !q) ? 'block' : 'none';
  }

  if (filtered.length === 0) {
    gamesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #0f172a; border-radius: 12px; border: 1px solid var(--border-color);">
        <p style="font-size: 15px; font-weight: 600; color: #fff;">No games found</p>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Try another search term or click "All Games".</p>
        <button class="btn-primary" style="margin-top: 16px;" onclick="resetFilter()">View All Games</button>
      </div>
    `;
    return;
  }

  gamesGrid.innerHTML = filtered.map(game => {
    const isFav = favorites.includes(game.id);
    return `
      <div class="game-card" onclick="launchGame('${game.id}')">
        <div class="game-thumb-wrap">
          <img class="game-thumb" src="${game.thumbnail}" alt="${game.title}" loading="lazy" onerror="this.style.display='none'" />
          <button class="game-fav-btn ${isFav ? 'is-fav' : ''}" onclick="event.stopPropagation(); toggleFavorite('${game.id}')" title="Favorite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          ${game.badge ? `<span class="game-badge">${game.badge}</span>` : ''}
        </div>
        <div class="game-info">
          <div>
            <div class="game-meta">
              <span class="cat-name">${game.category}</span>
              <span>·</span>
              <span class="rating">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ${Number(game.rating).toFixed(1)}
              </span>
              <span>·</span>
              <span>${game.plays}</span>
            </div>
            <div class="game-title">${game.title}</div>
            <div class="game-desc">${game.description}</div>
          </div>
          <div class="game-footer">
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width: 140px;" title="${game.controls}">${game.controls}</span>
            <span class="game-launch">Play &rarr;</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Recently Played Rail
function renderRecent() {
  if (!recentSection || !recentRail) return;
  const recentGames = recentIds
    .map(id => allGames.find(g => g.id === id))
    .filter(Boolean);

  if (recentGames.length === 0 || searchQuery) {
    recentSection.style.display = 'none';
    return;
  }

  recentSection.style.display = 'block';
  recentRail.innerHTML = recentGames.map(game => `
    <div style="flex-shrink:0; width:170px; background:#0f172a; border:1px solid var(--border-color); border-radius:10px; padding:8px; cursor:pointer;" onclick="launchGame('${game.id}')">
      <div style="aspect-ratio:16/10; border-radius:6px; overflow:hidden; background:#000; margin-bottom:6px;">
        <img src="${game.thumbnail}" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div style="font-size:12px; font-weight:700; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${game.title}</div>
      <div style="font-size:10px; color:var(--text-muted);">${game.category}</div>
    </div>
  `).join('');
}

// Launch Game Player
window.launchGame = function(id) {
  const game = allGames.find(g => g.id === id);
  if (!game) return;
  activeGame = game;

  // Add to recents
  recentIds = [game.id, ...recentIds.filter(x => x !== game.id)].slice(0, 8);
  localStorage.setItem('nova_recent', JSON.stringify(recentIds));

  // Populate Player
  const finalUrl = resolveGameUrl(game);
  playerIframe.src = finalUrl;
  playerTitle.textContent = game.title;
  playerCategory.textContent = game.category;
  playerRating.textContent = Number(game.rating).toFixed(1);
  playerPlays.textContent = `${game.plays} plays`;
  playerDesc.textContent = game.description;
  playerControls.textContent = game.controls;

  // Tags
  if (game.tags && game.tags.length > 0) {
    playerTags.innerHTML = game.tags.map((t, idx) => `
      ${idx > 0 ? `<span style="color:#475569">·</span>` : ''}
      <span>${t}</span>
    `).join(' ');
  } else {
    playerTags.innerHTML = '';
  }

  updatePlayerFavBtn();

  // Switch View
  libraryView.style.display = 'none';
  playerView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Return to Library
window.closePlayer = function() {
  activeGame = null;
  playerIframe.src = 'about:blank';
  playerView.classList.remove('active');
  libraryView.style.display = 'block';
  renderRecent();
  renderGames();
};

// Favorites handling
window.toggleFavorite = function(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('nova_favorites', JSON.stringify(favorites));
  updateFavoritesCount();
  renderGames();
  if (activeGame && activeGame.id === id) {
    updatePlayerFavBtn();
  }
};

function updateFavoritesCount() {
  if (favoritesCountEl) {
    favoritesCountEl.textContent = favorites.length;
  }
}

function updatePlayerFavBtn() {
  if (!activeGame || !playerFavBtn) return;
  const isFav = favorites.includes(activeGame.id);
  playerFavBtn.style.color = isFav ? '#f43f5e' : '#cbd5e1';
  playerFavBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    <span>${isFav ? 'Favorited' : 'Favorite'}</span>
  `;
}

// Player Action Toolbar
window.toggleFullscreen = function() {
  if (!playerContainer) return;
  if (!document.fullscreenElement) {
    playerContainer.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen().catch(err => console.error(err));
  }
};

window.toggleTheater = function() {
  playerContainer.classList.toggle('theater');
};

window.reloadGameFrame = function() {
  if (activeGame) {
    const url = resolveGameUrl(activeGame);
    playerIframe.src = url;
  }
};

window.openAboutBlank = function() {
  if (!activeGame) return;
  const finalUrl = resolveGameUrl(activeGame);
  try {
    const newWin = window.open('about:blank', '_blank');
    if (newWin) {
      newWin.document.title = activeGame.title;
      newWin.document.body.style.margin = '0';
      newWin.document.body.style.height = '100vh';
      newWin.document.body.style.background = '#020617';
      newWin.document.body.style.overflow = 'hidden';

      const iframe = newWin.document.createElement('iframe');
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.allow = 'fullscreen';
      iframe.src = finalUrl;
      newWin.document.body.appendChild(iframe);
    } else {
      window.open(finalUrl, '_blank');
    }
  } catch {
    window.open(finalUrl, '_blank');
  }
};

window.shareGame = function() {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied to clipboard!');
};

window.playRandomGame = function() {
  if (allGames.length === 0) return;
  const rand = allGames[Math.floor(Math.random() * allGames.length)];
  launchGame(rand.id);
};

window.resetFilter = function() {
  searchQuery = '';
  searchInput.value = '';
  searchClearBtn.classList.remove('visible');
  activeCategory = 'all';
  updateCategoryTabs();
  renderGames();
};

function updateCategoryTabs() {
  document.querySelectorAll('.cat-tab').forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    if (cat === activeCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Panic Mode
window.togglePanic = function() {
  panicScreen.classList.toggle('active');
};

// Event Listeners
function setupEventListeners() {
  // Panic keyboard trigger
  window.addEventListener('keydown', (e) => {
    if (e.key === ']' || (panicScreen.classList.contains('active') && e.key === 'Escape')) {
      togglePanic();
    }
  });

  // Search input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    searchClearBtn.classList.toggle('visible', Boolean(searchQuery));
    renderGames();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClearBtn.classList.remove('visible');
    renderGames();
  });

  // Sort
  sortSelect.addEventListener('change', (e) => {
    sortOption = e.target.value;
    renderGames();
  });

  // Category buttons
  document.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-cat');
      updateCategoryTabs();
      renderGames();
    });
  });

  // Cloaker Modal setup
  cloakPresetsList.innerHTML = CLOAK_PRESETS.map(p => `
    <div class="cloak-item ${p.id === currentPresetId ? 'selected' : ''}" onclick="selectCloakPreset('${p.id}')">
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${p.icon}" style="width:24px; height:24px;" />
        <div>
          <div style="font-size:13px; font-weight:700; color:#fff;">${p.name}</div>
          <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">${p.title}</div>
        </div>
      </div>
    </div>
  `).join('');

  // Add Custom Game Form
  const addForm = document.getElementById('add-game-form');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-game-title').value.trim();
      const category = document.getElementById('new-game-category').value;
      const iframeRaw = document.getElementById('new-game-iframe').value.trim();
      const controls = document.getElementById('new-game-controls').value.trim() || 'Keyboard or Mouse';
      const desc = document.getElementById('new-game-desc').value.trim() || 'Custom game loaded via iframe.';

      let src = iframeRaw;
      if (iframeRaw.includes('<iframe')) {
        const m = iframeRaw.match(/src=["']([^"']+)["']/i);
        if (m) src = m[1];
      }

      const newGame = {
        id: `custom-${Date.now()}`,
        title,
        category,
        badge: 'Custom',
        rating: 5.0,
        plays: '1',
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
        description: desc,
        controls: controls,
        tags: ['Custom', category],
        iframeSrc: src
      };

      const customGames = JSON.parse(localStorage.getItem('nova_custom_games') || '[]');
      customGames.unshift(newGame);
      localStorage.setItem('nova_custom_games', JSON.stringify(customGames));
      allGames.unshift(newGame);

      closeModal('add-game-modal');
      addForm.reset();
      launchGame(newGame.id);
    });
  }
}

// Modal helpers
window.openModal = function(id) {
  document.getElementById(id).classList.add('active');
};

window.closeModal = function(id) {
  document.getElementById(id).classList.remove('active');
};

window.selectCloakPreset = function(id) {
  const p = CLOAK_PRESETS.find(x => x.id === id);
  if (p) {
    applyCloakPreset(p);
    document.querySelectorAll('.cloak-item').forEach(el => el.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    closeModal('cloaker-modal');
  }
};

window.exportGamesJson = function() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allGames, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", "games.json");
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// Kick off
document.addEventListener('DOMContentLoaded', initApp);
