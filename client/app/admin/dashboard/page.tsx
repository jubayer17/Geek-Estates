'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('admin_user');
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch (e) {
                console.error('Failed to parse user data');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        toast.success('Logged out successfully');
        router.push('/admin/login');
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-black text-white p-8">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-[#E7C873]">Admin Dashboard</h1>
                            <p className="text-zinc-400 mt-1">Welcome back, {user?.name || 'Admin'}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-zinc-900 border border-zinc-800 hover:border-[#E7C873] text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2"
                        >
                            <span>Logout</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Total Properties', value: '12', icon: '🏠' },
                            { title: 'New Enquiries', value: '24', icon: '📩' },
                            { title: 'Active Users', value: '156', icon: '👥' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 rounded-xl hover:border-[#E7C873]/50 transition-colors group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-[#E7C873]/20 transition-colors">
                                        <span className="text-2xl">{stat.icon}</span>
                                    </div>
                                    <span className="text-xs font-medium bg-[#E7C873]/10 text-[#E7C873] px-2 py-1 rounded">+2.5%</span>
                                </div>
                                <h3 className="text-zinc-400 text-sm mb-1">{stat.title}</h3>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {['Add Property', 'View Enquiries', 'Manage Users', 'Settings'].map((action, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-left hover:border-[#E7C873] transition-colors"
                                >
                                    <span className="font-medium text-zinc-300">{action}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
