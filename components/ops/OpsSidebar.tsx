'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageCircle, Calendar, Users, Settings, ChartBar as BarChart3, Truck, CreditCard } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'dashboard', href: '/ops/dashboard', icon: LayoutDashboard },
  { name: 'inbox', href: '/ops/inbox', icon: MessageCircle },
  { name: 'bookings', href: '/ops/bookings', icon: Calendar },
  { name: 'customers', href: '/ops/customers', icon: Users },
  { name: 'suppliers', href: '/ops/suppliers', icon: Truck },
  { name: 'payments', href: '/ops/payments', icon: CreditCard },
  { name: 'analytics', href: '/ops/analytics', icon: BarChart3 },
  { name: 'settings', href: '/ops/settings', icon: Settings },
];

export function OpsSidebar() {
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();

  return (
    <div className={`bg-gray-900 text-white w-64 flex-shrink-0 ${isRTL ? 'order-2' : 'order-1'}`}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Travel Lounge</h2>
            <p className="text-gray-400 text-sm">{t('sidebar.operations')}</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {t(`navigation.${item.name}`)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}