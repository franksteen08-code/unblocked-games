import React from 'react';
import { Play, Heart, Star } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onPlay,
}) => {
  return (
    <div 
      onClick={() => onPlay(game)}
      className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-950/20 transition-all duration-200 flex flex-col"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={game.thumbnail}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* Hover overlay play prompt */}
        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <span className="flex items-center gap-2 bg-indigo-600 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-lg group-hover:scale-105 transition-transform">
            <Play className="w-3.5 h-3.5 fill-white" />
            Play Now
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(e, game.id)}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg transition-colors z-10 ${
            isFavorite 
              ? 'bg-rose-500/90 text-white shadow-sm' 
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Badge indicator if present */}
        {game.badge && (
          <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-sm border border-slate-700/60 text-indigo-300 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded">
            {game.badge}
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line with typographic separators */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-1.5">
            <span className="text-indigo-400 font-semibold">{game.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              {Number(game.rating).toFixed(1)}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{game.plays} plays</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Controls hint */}
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate max-w-[200px]" title={game.controls}>
            {game.controls}
          </span>
          <span className="text-indigo-400 text-xs font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            Launch &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
