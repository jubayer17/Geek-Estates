'use client';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes('/login') || pathname.includes('/sign-up');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <AdminSidebar />
        <main className="ml-64 p-8 min-h-screen bg-black">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
