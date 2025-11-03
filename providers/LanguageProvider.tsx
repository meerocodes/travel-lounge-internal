'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'navigation.dashboard': 'Dashboard',
    'navigation.inbox': 'Inbox',
    'navigation.bookings': 'Bookings',
    'navigation.customers': 'Customers',
    'navigation.suppliers': 'Suppliers',
    'navigation.payments': 'Payments',
    'navigation.analytics': 'Analytics',
    'navigation.settings': 'Settings',
    
    // Sidebar
    'sidebar.operations': 'Operations',
    
    // Header
    'header.searchPlaceholder': 'Search customers, bookings, or chat...',
    'header.profile': 'Profile',
    'header.settings': 'Settings',
    'header.logout': 'Logout',
    
    // Dashboard
    'dashboard.title': 'Operations Dashboard',
    'dashboard.lastUpdated': 'Last updated',
    
    // Dashboard Stats
    'dashboard.stats.activeChats': 'Active Chats',
    'dashboard.stats.todayBookings': 'Today\'s Bookings',
    'dashboard.stats.avgResponseTime': 'Avg Response Time',
    'dashboard.stats.completedTrips': 'Completed Trips',
    'dashboard.stats.revenueToday': 'Revenue Today',
    'dashboard.stats.slaBreaches': 'SLA Breaches',
    'dashboard.stats.fromYesterday': 'from yesterday',
    
    // Live Queue
    'dashboard.liveQueue.title': 'Live Queue',
    'dashboard.liveQueue.waiting': 'waiting',
    'dashboard.liveQueue.viewAll': 'View All',
    'dashboard.liveQueue.priority.urgent': 'Urgent',
    'dashboard.liveQueue.priority.high': 'High',
    'dashboard.liveQueue.priority.medium': 'Medium',
    'dashboard.liveQueue.priority.low': 'Low',
    'dashboard.liveQueue.assignedTo': 'Assigned to',
    'dashboard.liveQueue.unassigned': 'Unassigned',
    'dashboard.liveQueue.assign': 'Assign',
    'dashboard.liveQueue.respond': 'Respond',
    
    // Agent Status
    'dashboard.agents.title': 'Agent Status',
    'dashboard.agents.manage': 'Manage',
    'dashboard.agents.status.online': 'Online',
    'dashboard.agents.status.busy': 'Busy',
    'dashboard.agents.status.away': 'Away',
    'dashboard.agents.status.offline': 'Offline',
    
    // SLA Monitor
    'dashboard.sla.title': 'SLA Monitor',
    'dashboard.sla.overall': 'Overall',
    'dashboard.sla.target': 'Target',
    'dashboard.sla.current': 'Current',
    'dashboard.sla.breaches': 'breaches',
    'dashboard.sla.metrics.firstResponse': 'First Response',
    'dashboard.sla.metrics.resolution': 'Resolution Time',
    'dashboard.sla.metrics.customerSat': 'Customer Satisfaction',
    'dashboard.sla.metrics.availability': 'System Availability',
    'dashboard.sla.status.excellent': 'Excellent',
    'dashboard.sla.status.good': 'Good',
    'dashboard.sla.status.warning': 'Warning',
    'dashboard.sla.status.critical': 'Critical',
    
    // KPI Charts
    'dashboard.kpi.title': 'Performance Analytics',
    'dashboard.kpi.responseTime': 'Response Time',
    'dashboard.kpi.volume': 'Volume',
    'dashboard.kpi.channels': 'Channels',
    'dashboard.kpi.actualResponse': 'Actual Response',
    'dashboard.kpi.targetResponse': 'Target Response',
    
    // Recent Activity
    'dashboard.activity.title': 'Recent Activity',
    'dashboard.activity.live': 'Live',
  },
  ar: {
    // Navigation
    'navigation.dashboard': 'لوحة التحكم',
    'navigation.inbox': 'الرسائل',
    'navigation.bookings': 'الحجوزات',
    'navigation.customers': 'العملاء',
    'navigation.suppliers': 'الموردين',
    'navigation.payments': 'المدفوعات',
    'navigation.analytics': 'التحليلات',
    'navigation.settings': 'الإعدادات',
    
    // Sidebar
    'sidebar.operations': 'العمليات',
    
    // Header
    'header.searchPlaceholder': 'البحث عن العملاء أو الحجوزات أو المحادثات...',
    'header.profile': 'الملف الشخصي',
    'header.settings': 'الإعدادات',
    'header.logout': 'تسجيل الخروج',
    
    // Dashboard
    'dashboard.title': 'لوحة تحكم العمليات',
    'dashboard.lastUpdated': 'آخر تحديث',
    
    // Dashboard Stats
    'dashboard.stats.activeChats': 'المحادثات النشطة',
    'dashboard.stats.todayBookings': 'حجوزات اليوم',
    'dashboard.stats.avgResponseTime': 'متوسط وقت الاستجابة',
    'dashboard.stats.completedTrips': 'الرحلات المكتملة',
    'dashboard.stats.revenueToday': 'إيرادات اليوم',
    'dashboard.stats.slaBreaches': 'انتهاكات اتفاقية مستوى الخدمة',
    'dashboard.stats.fromYesterday': 'من أمس',
    
    // Live Queue
    'dashboard.liveQueue.title': 'قائمة الانتظار المباشرة',
    'dashboard.liveQueue.waiting': 'في الانتظار',
    'dashboard.liveQueue.viewAll': 'عرض الكل',
    'dashboard.liveQueue.priority.urgent': 'عاجل',
    'dashboard.liveQueue.priority.high': 'عالي',
    'dashboard.liveQueue.priority.medium': 'متوسط',
    'dashboard.liveQueue.priority.low': 'منخفض',
    'dashboard.liveQueue.assignedTo': 'مخصص لـ',
    'dashboard.liveQueue.unassigned': 'غير مخصص',
    'dashboard.liveQueue.assign': 'تخصيص',
    'dashboard.liveQueue.respond': 'الرد',
    
    // Agent Status
    'dashboard.agents.title': 'حالة الوكلاء',
    'dashboard.agents.manage': 'إدارة',
    'dashboard.agents.status.online': 'متصل',
    'dashboard.agents.status.busy': 'مشغول',
    'dashboard.agents.status.away': 'غائب',
    'dashboard.agents.status.offline': 'غير متصل',
    
    // SLA Monitor
    'dashboard.sla.title': 'مراقب اتفاقية مستوى الخدمة',
    'dashboard.sla.overall': 'إجمالي',
    'dashboard.sla.target': 'الهدف',
    'dashboard.sla.current': 'الحالي',
    'dashboard.sla.breaches': 'انتهاكات',
    'dashboard.sla.metrics.firstResponse': 'الاستجابة الأولى',
    'dashboard.sla.metrics.resolution': 'وقت الحل',
    'dashboard.sla.metrics.customerSat': 'رضا العملاء',
    'dashboard.sla.metrics.availability': 'توفر النظام',
    'dashboard.sla.status.excellent': 'ممتاز',
    'dashboard.sla.status.good': 'جيد',
    'dashboard.sla.status.warning': 'تحذير',
    'dashboard.sla.status.critical': 'حرج',
    
    // KPI Charts
    'dashboard.kpi.title': 'تحليلات الأداء',
    'dashboard.kpi.responseTime': 'وقت الاستجابة',
    'dashboard.kpi.volume': 'الحجم',
    'dashboard.kpi.channels': 'القنوات',
    'dashboard.kpi.actualResponse': 'الاستجابة الفعلية',
    'dashboard.kpi.targetResponse': 'الاستجابة المستهدفة',
    
    // Recent Activity
    'dashboard.activity.title': 'النشاط الحديث',
    'dashboard.activity.live': 'مباشر',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}