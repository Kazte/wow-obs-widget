import './../globals.css';

import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'WoW Progress Widget',
  description:
    'Generate a widget to display your World of Warcraft character progress'
};
export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark min-h-screen max-w-screen flex flex-col justify-between items-center`}
        style={{
          backgroundImage: 'url(/background.webp)',
          backgroundSize: 'cover'
        }}
      >
        <Toaster />
        <main>{children}</main>

        <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center min-h-12 w-full bg-background/90 backdrop-blur-lg border-t-[1px] border-border'>
          <p>
            Created by
            <Button asChild variant='link' className='px-0 font-bold text-md'>
              <a href='https://github.com/kazte'>kazte</a>
            </Button>
          </p>
        </footer>
      </body>
    </html>
  );
}
