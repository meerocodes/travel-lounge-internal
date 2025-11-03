import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/providers/AuthProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { RealtimeProvider } from '@/providers/RealtimeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travel Lounge Canada - Operations Platform',
  description: 'Internal operations platform for managing bookings, agents, and customer communications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <RealtimeProvider>
              {children}
            </RealtimeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}