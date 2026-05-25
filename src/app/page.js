'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertCircle } from 'lucide-react';
import InputForm from '@/components/InputForm';
import CopyCard from '@/components/CopyCard';
import HistorySidebar from '@/components/HistorySidebar';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [form, setForm]       = useState({ product: '', audience: '', tone: 'Professional' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError]     = useState('');

  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      setResults(data);
      setHistory(h => [
        { ...form, results: data, time: new Date().toLocaleTimeString() },
        ...h.slice(0, 9),
      ]);

    } catch (err) {
      setError(err.message || 'Something went wrong. Check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleHistorySelect = (item) => {
    setForm({ product: item.product, audience: item.audience, tone: item.tone });
    setResults(item.results);
    setError('');
  };

  const handleClearHistory = () => setHistory([]);

  return (
    <div className="min-h-screen">

      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800
                         bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">CopyAI</span>
            <span className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 ml-1">
              by Dharun Kabil
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
        >
          AI Marketing Copy Generator
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
        >
          Generate headlines, ad captions, email subjects & taglines — powered by AI
        </motion.p>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">

          {/* Sidebar — history */}
          <div className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <HistorySidebar
                history={history}
                onSelect={handleHistorySelect}
                onClear={handleClearHistory}
              />
            </div>
          </div>

          {/* Main column */}
          <div className="order-1 lg:order-2">

            {/* Form card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100
                            dark:border-gray-700 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-5">
                Tell us about your product
              </h2>
              <InputForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-100
                             dark:border-red-900 text-red-600 dark:text-red-400
                             rounded-xl text-sm flex items-start gap-3"
                >
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading skeleton */}
            {loading && (
              <div className="mt-6">
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-4 animate-pulse">
                  Generating your copy...
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-28 animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            <AnimatePresence>
              {results.length > 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {results.length} variations generated
                    </p>
                    <span className="text-xs text-gray-400 dark:text-gray-600 bg-gray-100
                                     dark:bg-gray-800 px-3 py-1 rounded-full">
                      {form.tone} tone
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map((r, i) => (
                      <CopyCard key={i} type={r.type} copy={r.copy} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 dark:text-gray-600">
        Built by Dharun Kabil · Powered by Gemini AI
      </footer>

    </div>
  );
}
