'use client';
import { useState, useEffect } from 'react';
import { Clock, ChevronRight, Trash2 } from 'lucide-react';

export default function HistorySidebar({ history, onSelect, onClear }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 text-center">
        <Clock size={24} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
        <p className="text-xs text-gray-400 dark:text-gray-500">No history yet.</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">Generate copy to see it here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Clock size={14} />
          <span className="text-xs font-semibold uppercase tracking-wide">History</span>
        </div>
        <button
          onClick={onClear}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
          aria-label="Clear history"
        >
          <Trash2 size={13} />
        </button>
      </div>
      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {history.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {item.product}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {item.tone} · {item.audience}
                </p>
              </div>
              <ChevronRight size={13} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 ml-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
