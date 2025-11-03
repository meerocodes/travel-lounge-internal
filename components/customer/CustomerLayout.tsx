'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, Calendar, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/providers/LanguageProvider';

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Travel Lounge Canada
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/customer" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                {t('customer.nav.myBookings')}
              </Link>
              <Link 
                href="/customer/support" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                {t('customer.nav.support')}
              </Link>
            </nav>

            {/* User Menu & Language Toggle */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-sm"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Sarah Ahmed
                </span>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/customer" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600"
              >
                {t('customer.nav.myBookings')}
              </Link>
              <Link 
                href="/customer/support" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600"
              >
                {t('customer.nav.support')}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Support FAB */}
      <div className="fixed bottom-6 right-6">
        <Button 
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-green-700"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}