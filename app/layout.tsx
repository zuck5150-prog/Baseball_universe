import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baseball Universe',
  description: 'A living text-based baseball universe.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<nav style={{position:'fixed',right:12,bottom:12,zIndex:50}}><a href="/trade" style={{display:'inline-block',padding:'10px 14px',background:'#111',color:'#fff',textDecoration:'none',fontWeight:700}}>TRADE DESK →</a></nav></body></html>;
}
