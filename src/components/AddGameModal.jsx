import React, { useState } from 'react';
import { X, Plus, Download, Check } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
  allGames,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [iframeInput, setIframeInput] = useState('');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeInput.trim()) {
      setError('Please provide an iframe embed or URL.');
      return;
    }

    let src = iframeInput.trim();
    let iframeTag = iframeInput.trim();

    // Check if user entered <iframe ... src="..."> or just a URL
    if (iframeInput.includes('<iframe')) {
      const match = iframeInput.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        src = match[1];
      }
    } else {
      iframeTag = `<iframe src="${src}" title="${title}" allowfullscreen frameborder="0"></iframe>`;
    }

    const newGame = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category: category.trim() || 'Arcade',
      badge: 'Custom',
      rating: 5.0,
      plays: '1',
      thumbnail: thumbnail.trim() || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      description: description.trim() || 'Custom game loaded via iframe.',
      controls: controls.trim() || 'Keyboard or Mouse',
      tags: ['Custom', category],
      iframe: iframeTag,
      iframeSrc: src,
      isCustom: true,
    };

    onAddGame(newGame);
    onClose();
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allGames, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "games.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add Custom Game Iframe</h2>
              <p className="text-xs text-slate-400">Embed any HTML5 game or iframe snippet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 overflow-y-auto pr-1 flex-1">
          {error && (
            <div className="p-2.5 bg-red-950/50 border border-red-800/80 text-red-300 text-xs rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Game Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Retro Space Blaster"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Action">Action</option>
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Retro">Retro</option>
                <option value="Sports">Sports</option>
                <option value="Casual">Casual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Controls Hint
              </label>
              <input
                type="text"
                value={controls}
                onChange={(e) => setControls(e.target.value)}
                placeholder="e.g. WASD / Space"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Iframe Code or Web URL *
            </label>
            <textarea
              required
              rows={3}
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              placeholder='<iframe src="https://..." allowfullscreen></iframe> OR https://example.com/game'
              className="w-full font-mono bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Thumbnail Image URL (Optional)
            </label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short summary of gameplay..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Download games.json with all games included"
            >
              {exported ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{exported ? 'Downloaded JSON!' : 'Export games.json'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-colors"
              >
                Save & Play
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
