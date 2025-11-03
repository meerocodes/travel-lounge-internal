'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TriangleAlert as AlertTriangle, Clock, CircleCheck as CheckCircle, Target } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const slaMetrics = [
  {
    name: 'firstResponse',
    target: '< 2 minutes',
    current: '1.2 minutes',
    percentage: 85,
    status: 'good',
    breaches: 2,
  },
  {
    name: 'resolution',
    target: '< 15 minutes',
    current: '12.5 minutes',
    percentage: 92,
    status: 'excellent',
    breaches: 0,
  },
  {
    name: 'customerSat',
    target: '> 90%',
    current: '94%',
    percentage: 94,
    status: 'excellent',
    breaches: 0,
  },
  {
    name: 'availability',
    target: '99.5%',
    current: '99.8%',
    percentage: 99,
    status: 'excellent',
    breaches: 0,
  },
];

export function SLAMonitor() {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-amber-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>{t('dashboard.sla.title')}</span>
        </CardTitle>
        <Badge variant="outline" className="text-green-600 border-green-300">
          {t('dashboard.sla.overall')}: 92%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {slaMetrics.map((metric) => (
            <div key={metric.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {metric.status === 'excellent' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {metric.status === 'good' && <Clock className="w-4 h-4 text-blue-600" />}
                    {metric.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    {metric.status === 'critical' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    <h4 className="font-medium text-gray-900">
                      {t(`dashboard.sla.metrics.${metric.name}`)}
                    </h4>
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {t(`dashboard.sla.status.${metric.status}`)}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {metric.breaches > 0 && (
                    <span className="text-red-600">
                      {metric.breaches} {t('dashboard.sla.breaches')}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>{t('dashboard.sla.target')}: {metric.target}</span>
                <span>{t('dashboard.sla.current')}: {metric.current}</span>
              </div>
              
              <Progress 
                value={metric.percentage} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}