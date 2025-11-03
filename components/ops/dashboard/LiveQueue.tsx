'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, MessageCircle, Phone, Users } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const queueItems = [
  {
    id: '1',
    customer: 'Sarah Ahmed',
    phone: '+1234567890',
    waitTime: '2m 15s',
    priority: 'high',
    lastMessage: 'I need to change my pickup location for tomorrow',
    agent: null,
    language: 'en',
  },
  {
    id: '2',
    customer: 'محمد علي',
    phone: '+9665551234',
    waitTime: '5m 42s',
    priority: 'medium',
    lastMessage: 'أريد تأكيد حجز الرحلة إلى المطار',
    agent: 'Ahmed Hassan',
    language: 'ar',
  },
  {
    id: '3',
    customer: 'Emma Johnson',
    phone: '+1987654321',
    waitTime: '1m 08s',
    priority: 'urgent',
    lastMessage: 'My flight is delayed, can you update pickup time?',
    agent: null,
    language: 'en',
  },
];

export function LiveQueue() {
  const { t, isRTL } = useLanguage();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>{t('dashboard.liveQueue.title')}</span>
          <Badge variant="secondary" className="ml-2">
            {queueItems.length} {t('dashboard.liveQueue.waiting')}
          </Badge>
        </CardTitle>
        <Button variant="outline" size="sm">
          {t('dashboard.liveQueue.viewAll')}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {queueItems.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 border rounded-lg hover:shadow-sm transition-shadow ${
                item.priority === 'urgent' ? 'border-red-200 bg-red-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" alt={item.customer} />
                    <AvatarFallback>
                      {item.customer.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.customer}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4" />
                      <span>{item.phone}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.language.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getPriorityColor(item.priority)}>
                    {t(`dashboard.liveQueue.priority.${item.priority}`)}
                  </Badge>
                  <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{item.waitTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className={`text-sm ${item.language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <MessageCircle className="w-4 h-4 inline mr-1" />
                  {item.lastMessage}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {item.agent ? (
                    <span>{t('dashboard.liveQueue.assignedTo')}: {item.agent}</span>
                  ) : (
                    <span className="text-amber-600">{t('dashboard.liveQueue.unassigned')}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    {t('dashboard.liveQueue.assign')}
                  </Button>
                  <Button size="sm">
                    {t('dashboard.liveQueue.respond')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}