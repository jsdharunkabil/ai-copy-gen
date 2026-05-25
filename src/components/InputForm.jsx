'use client';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import ToneSelector from './ToneSelector';

export default function InputForm({ form, onChange, onSubmit, loading }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product or Service
        </label>
        <input
          type="text"
          value={form.product}
          onChange={e => onChange('product', e.target.value)}
          placeholder="e.g. AI-powered fitness app for busy professionals"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Target Audience
        </label>
        <input
          type="text"
          value={form.audience}
          onChange={e => onChange('audience', e.target.value)}
          placeholder="e.g. Working parents aged 30–45"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tone
        </label>
        <ToneSelector selected={form.tone} onChange={v => onChange('tone', v)} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        <Sparkles size={18} />
        {loading ? 'Generating...' : 'Generate Copy'}
      </button>
    </form>
  );
}
