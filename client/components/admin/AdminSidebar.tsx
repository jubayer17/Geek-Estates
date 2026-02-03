'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutDashboard, Briefcase, Building, ChevronDown, ChevronRight, CreditCard, MousePointerClick, Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type MenuItem = {
  name: string;
  icon: any;
  href: string;
  children?: { name: string; href: string; view?: string; icon?: any }[];
};

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { 
    name: 'Projects', 
    icon: Building, 
    href: '/admin/projects',
    children: [
      { name: 'All Projects', href: '/admin/projects', icon: Building },
      { name: 'Hero Banner', href: '/admin/projects?view=hero', view: 'hero', icon: CreditCard },
      { name: 'CTA Section', href: '/admin/projects?view=cta', view: 'cta', icon: MousePointerClick },
    ]
  },
  { 
    name: 'Career Page', 
    icon: Briefcase, 
    href: '/admin/career',
    children: [
      { name: 'All Jobs', href: '/admin/career', icon: Briefcase },
      { name: 'Hero Section', href: '/admin/career?view=hero', view: 'hero', icon: CreditCard },
      { name: 'Values Section', href: '/admin/career?view=values', view: 'values', icon: Heart },
      { name: 'Perks Section', href: '/admin/career?view=perks', view: 'perks', icon: Star },
      { name: 'Jobs Content', href: '/admin/career?view=jobs-content', view: 'jobs-content', icon: MousePointerClick },
    ]
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view');
  
  // State to track expanded items
  const [expandedItems, setExpandedItems] = useState<string[]>(['Projects', 'Career Page']);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  // Automatically expand if child is active
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => {
           if (child.view) return pathname === child.href.split('?')[0] && currentView === child.view;
           return pathname === child.href && !currentView;
        });
        if (hasActiveChild && !expandedItems.includes(item.name)) {
          setExpandedItems(prev => [...prev, item.name]);
        }
      }
    });
  }, [pathname, currentView]);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col z-50 overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#E7C873]">Admin Panel</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isParentActive = pathname === item.href || (item.children && pathname.startsWith(item.href));
          const isExpanded = expandedItems.includes(item.name);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.name} className="space-y-1">
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(item.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all",
                    isParentActive
                      ? 'text-[#E7C873]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    pathname === item.href
                      ? 'bg-[#E7C873]/10 text-[#E7C873] border border-[#E7C873]/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              )}

              {/* Render Children */}
              {hasChildren && isExpanded && (
                <div className="ml-4 pl-4 border-l border-zinc-800 space-y-1">
                  {item.children!.map((child) => {
                    const ChildIcon = child.icon || ChevronRight;
                    // Check if this specific child is active
                    const isChildActive = child.view 
                      ? (pathname === child.href.split('?')[0] && currentView === child.view)
                      : (pathname === child.href && !currentView);

                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-all",
                          isChildActive
                            ? 'bg-[#E7C873]/10 text-[#E7C873]'
                            : 'text-zinc-500 hover:text-white hover:bg-zinc-800'
                        )}
                      >
                        {child.icon && <ChildIcon size={16} />}
                        <span>{child.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 text-center">Geek Real Estate Admin</p>
      </div>
    </aside>
  );
}
