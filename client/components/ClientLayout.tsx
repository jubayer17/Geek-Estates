'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isAdmin && <Footer />}
    </div>
  );
}
