'use client';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const typeColors = {
  'Headline':      'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  'Ad Caption':    'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'Email Subject': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'Tagline':       'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
};

export default function CopyCard({ type, copy, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.4, ease: 'easeOut' }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100
                 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[type] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
          {type}
        </span>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                     transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
          aria-label="Copy to clipboard"
        >
          {copied
            ? <Check size={16} className="text-green-500" />
            : <Copy size={16} />
          }
        </button>
      </div>
      <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-medium">
        {copy}
      </p>
    </motion.div>
  );
}
