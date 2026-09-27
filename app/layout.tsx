import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baseball Universe',
  description: 'A living text-based baseball universe.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
