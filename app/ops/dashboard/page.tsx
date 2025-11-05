'use client';

import { useState, useEffect } from 'react';
import { DashboardStats } from '@/components/ops/dashboard/DashboardStats';
import { LiveQueue } from '@/components/ops/dashboard/LiveQueue';
import { AgentStatus } from '@/components/ops/dashboard/AgentStatus';
import { SLAMonitor } from '@/components/ops/dashboard/SLAMonitor';
import { KPICharts } from '@/components/ops/dashboard/KPICharts';
import { RecentActivity } from '@/components/ops/dashboard/RecentActivity';
import { useLanguage } from '@/providers/LanguageProvider';

export default function DashboardPage() {
  const { t, isRTL } = useLanguage();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());

    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
      setCurrentTime(new Date().toLocaleTimeString());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {t('dashboard.lastUpdated')}: {currentTime}
          </div>
        </div>
      </div>

      <DashboardStats key={`stats-${refreshKey}`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LiveQueue key={`queue-${refreshKey}`} />
          <KPICharts key={`kpi-${refreshKey}`} />
        </div>
        
        <div className="space-y-6">
          <AgentStatus key={`agents-${refreshKey}`} />
          <SLAMonitor key={`sla-${refreshKey}`} />
          <RecentActivity key={`activity-${refreshKey}`} />
        </div>
      </div>
    </div>
  );
}