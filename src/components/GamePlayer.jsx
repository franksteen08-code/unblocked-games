import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Maximize2, 
  RotateCw, 
  ExternalLink, 
  Heart, 
  Tv, 
  Star,
  Keyboard,
  Share2,
  Check
} from 'lucide-react';

export const GamePlayer = ({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showControlsDrawer, setShowControlsDrawer] = useState(false);
  const containerRef = useRef(null);

  // Extract the src from the iframe string or fallback to game.iframeSrc
  const getIframeSrc = () => {
    let src = game.iframeSrc;
    if (!src && game.iframe) {
      const match = game.iframe.match(/src=["']([^"']+)["']/i);
      src = match ? match[1] : '';
    }
    if (src && src.startsWith('/games/')) {
      const base = import.meta.env.BASE_URL || './';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;
      src = cleanBase + src.slice(1);
    }
    return src;
  };

  const iframeSrc = getIframeSrc();

  // Fullscreen trigger using standard Fullscreen API
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Exit fullscreen failed:', err);
      });
    }
  };

  // Open in an About:Blank window or clean popup
  const handleOpenAboutBlank = () => {
    try {
      const resolvedUrl = new URL(iframeSrc, window.location.href).href;
      const newWin = window.open('about:blank', '_blank');
      if (newWin) {
        newWin.document.title = game.title;
        newWin.document.body.style.margin = '0';
        newWin.document.body.style.height = '100vh';
        newWin.document.body.style.background = '#090d16';
        newWin.document.body.style.overflow = 'hidden';

        const iframe = newWin.document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.margin = '0';
        iframe.allow = 'fullscreen';
        iframe.src = resolvedUrl;
        newWin.document.body.appendChild(iframe);
      } else {
        window.open(resolvedUrl, '_blank');
      }
    } catch {
      window.open(iframeSrc, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 animate-in fade-in duration-200">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(game.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          {/* Theater mode */}
          <button
            onClick={() => setIsTheater(!isTheater)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              isTheater
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Toggle Theater Mode"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Theater</span>
          </button>

          {/* Reload iframe */}
          <button
            onClick={() => setReloadKey(k => k + 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Reload Game Frame"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reload</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleToggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>

          {/* About:Blank / New Tab */}
          <button
            onClick={handleOpenAboutBlank}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
            title="Open in stealth about:blank window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Stealth Window</span>
          </button>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className={`transition-all duration-300 ${isTheater ? 'w-full max-w-full' : 'max-w-5xl mx-auto'}`}>
        <div 
          ref={containerRef}
          className="relative w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col items-center justify-center"
          style={{ height: isTheater ? '82vh' : '620px', minHeight: '440px' }}
        >
          {iframeSrc ? (
            <iframe
              key={reloadKey}
              src={iframeSrc}
              title={game.title}
              className="w-full h-full border-0 rounded-xl"
              allow="fullscreen; accelerometer; gyroscope; gamepad"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
          ) : (
            <div className="text-center p-8">
              <p className="text-slate-400">Game iframe source not specified.</p>
            </div>
          )}
        </div>

        {/* Game Details & Controls Bar below player */}
        <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span className="text-indigo-400 font-semibold">{game.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {Number(game.rating).toFixed(1)}
                </span>
                <span aria-hidden="true">·</span>
                <span>{game.plays} plays</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {game.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>
              
              <button
                onClick={() => setShowControlsDrawer(!showControlsDrawer)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
              >
                <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
                <span>Controls Guide</span>
              </button>
            </div>
          </div>

          {/* Controls callout */}
          <div className="mt-3.5 flex items-start gap-3 p-3 bg-slate-950/70 rounded-lg border border-slate-800/80">
            <Keyboard className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-slate-200">How to play: </span>
              <span className="text-slate-300 font-mono text-[11px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 ml-1">
                {game.controls}
              </span>
            </div>
          </div>

          {/* Description & tags */}
          <div className="mt-3.5">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {game.description}
            </p>

            {game.tags && game.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                <span className="text-slate-400 font-medium">Tags:</span>
                {game.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    {i > 0 && <span aria-hidden="true" className="text-slate-600">·</span>}
                    <span className="hover:text-indigo-300 transition-colors cursor-default">
                      {tag}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
