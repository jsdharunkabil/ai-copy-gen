'use client';

const tones = [
  { id: 'Professional', emoji: '💼', desc: 'Formal & trustworthy' },
  { id: 'Casual',       emoji: '😊', desc: 'Friendly & relaxed'  },
  { id: 'Bold',         emoji: '⚡', desc: 'Strong & energetic'  },
];

export default function ToneSelector({ selected, onChange }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {tones.map((tone) => (
        <button
          key={tone.id}
          type="button"
          onClick={() => onChange(tone.id)}
          className={`flex-1 min-w-[100px] p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer
            ${selected === tone.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
            }`}
        >
          <div className="text-xl mb-1">{tone.emoji}</div>
          <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{tone.id}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{tone.desc}</div>
        </button>
      ))}
    </div>
  );
}
