import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata = {
  title: 'AI Copy Generator',
  description: 'Generate stunning marketing copy with AI — headlines, captions, taglines and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
