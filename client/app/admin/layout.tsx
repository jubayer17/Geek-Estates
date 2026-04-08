'use client';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Toaster } from 'sonner';

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
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "bg-gradient-to-r from-emerald-400 to-green-600 text-white font-semibold shadow-xl",
            duration: 4000, // 4 seconds
          }}
        />
      </div>
    </ProtectedRoute>
  );
}
