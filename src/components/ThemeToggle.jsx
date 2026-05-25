'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-xl border border-gray-200 dark:border-gray-700
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'dark'
        ? <Sun size={18} className="text-amber-400" />
        : <Moon size={18} className="text-gray-500" />
      }
    </button>
  );
}
