'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Circle, MessageCircle, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const agents = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    status: 'online',
    activeChats: 5,
    maxCapacity: 8,
    avgResponseTime: '45s',
    language: 'Arabic/English',
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    status: 'online',
    activeChats: 3,
    maxCapacity: 6,
    avgResponseTime: '32s',
    language: 'English',
  },
  {
    id: '3',
    name: 'Omar Al-Rashid',
    status: 'busy',
    activeChats: 7,
    maxCapacity: 7,
    avgResponseTime: '1m 12s',
    language: 'Arabic/English',
  },
  {
    id: '4',
    name: 'Lisa Chen',
    status: 'away',
    activeChats: 0,
    maxCapacity: 5,
    avgResponseTime: '-',
    language: 'English',
  },
];

export function AgentStatus() {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600';
      case 'busy':
        return 'text-amber-600';
      case 'away':
        return 'text-gray-500';
      case 'offline':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'busy':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'away':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>{t('dashboard.agents.title')}</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          {t('dashboard.agents.manage')}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" alt={agent.name} />
                    <AvatarFallback>
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Circle 
                    className={`absolute -bottom-1 -right-1 w-4 h-4 fill-current ${getStatusColor(agent.status)}`}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{agent.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{agent.language}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <Badge className={getStatusBadge(agent.status)}>
                  {t(`dashboard.agents.status.${agent.status}`)}
                </Badge>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{agent.activeChats}/{agent.maxCapacity}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{agent.avgResponseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}