'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Calendar, Users, TrendingUp, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, DollarSign } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const stats = [
  {
    title: 'activeChats',
    value: '23',
    change: '+12%',
    trend: 'up',
    icon: MessageCircle,
    color: 'bg-blue-500',
  },
  {
    title: 'todayBookings',
    value: '47',
    change: '+8%',
    trend: 'up',
    icon: Calendar,
    color: 'bg-green-500',
  },
  {
    title: 'avgResponseTime',
    value: '1.2m',
    change: '-15%',
    trend: 'down',
    icon: Clock,
    color: 'bg-amber-500',
  },
  {
    title: 'completedTrips',
    value: '156',
    change: '+22%',
    trend: 'up',
    icon: CheckCircle,
    color: 'bg-emerald-500',
  },
  {
    title: 'revenueToday',
    value: '$12,450',
    change: '+18%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-purple-500',
  },
  {
    title: 'slaBreaches',
    value: '2',
    change: '-40%',
    trend: 'down',
    icon: AlertTriangle,
    color: 'bg-red-500',
  },
];

export function DashboardStats() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t(`dashboard.stats.${stat.title}`)}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center mt-2">
              <TrendingUp 
                className={`w-4 h-4 mr-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                } ${stat.trend === 'down' ? 'rotate-180' : ''}`} 
              />
              <span 
                className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                {t('dashboard.stats.fromYesterday')}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}