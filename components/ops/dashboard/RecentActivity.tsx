'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Activity, MessageCircle, Calendar, User, CreditCard, Truck, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const activities = [
  {
    id: '1',
    type: 'booking_created',
    user: 'Sarah Ahmed',
    message: 'Created new booking #B-2024-001',
    timestamp: '2 minutes ago',
    icon: Calendar,
    color: 'bg-blue-500',
  },
  {
    id: '2',
    type: 'payment_received',
    user: 'System',
    message: 'Payment confirmed for booking #B-2024-001',
    timestamp: '5 minutes ago',
    icon: CreditCard,
    color: 'bg-green-500',
  },
  {
    id: '3',
    type: 'message_sent',
    user: 'Ahmed Hassan',
    message: 'Responded to محمد علي via WhatsApp',
    timestamp: '8 minutes ago',
    icon: MessageCircle,
    color: 'bg-purple-500',
  },
  {
    id: '4',
    type: 'trip_completed',
    user: 'Driver Ali',
    message: 'Completed trip for booking #B-2024-000',
    timestamp: '12 minutes ago',
    icon: CheckCircle,
    color: 'bg-emerald-500',
  },
  {
    id: '5',
    type: 'customer_registered',
    user: 'Emma Johnson',
    message: 'New customer registration',
    timestamp: '15 minutes ago',
    icon: User,
    color: 'bg-indigo-500',
  },
  {
    id: '6',
    type: 'supplier_notified',
    user: 'System',
    message: 'ABC Transport notified of new booking',
    timestamp: '18 minutes ago',
    icon: Truck,
    color: 'bg-amber-500',
  },
];

export function RecentActivity() {
  const { t, isRTL } = useLanguage();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>{t('dashboard.activity.title')}</span>
        </CardTitle>
        <Badge variant="outline">
          {t('dashboard.activity.live')}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${activity.color} flex-shrink-0`}>
                <activity.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.timestamp}
                  </p>
                </div>
                <p className={`text-sm text-gray-600 ${isRTL && activity.message.includes('محمد علي') ? 'text-right' : ''}`}>
                  {activity.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}