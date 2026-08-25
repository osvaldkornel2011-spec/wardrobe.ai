import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';
import { WardrobeProvider } from '@/components/state';

export const metadata: Metadata = {
  title: 'WardrobeAI — a te okos gardróbod',
  description: 'Személyes AI stylist és virtuális tükör.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body>
        <WardrobeProvider>
          <AppShell>{children}</AppShell>
        </WardrobeProvider>
      </body>
    </html>
  );
}
