'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, ChartBar as BarChart3, ChartPie as PieChartIcon } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const responseTimeData = [
  { time: '00:00', responseTime: 45, target: 120 },
  { time: '04:00', responseTime: 32, target: 120 },
  { time: '08:00', responseTime: 67, target: 120 },
  { time: '12:00', responseTime: 89, target: 120 },
  { time: '16:00', responseTime: 76, target: 120 },
  { time: '20:00', responseTime: 54, target: 120 },
];

const bookingVolumeData = [
  { hour: '6AM', bookings: 12 },
  { hour: '8AM', bookings: 28 },
  { hour: '10AM', bookings: 34 },
  { hour: '12PM', bookings: 45 },
  { hour: '2PM', bookings: 52 },
  { hour: '4PM', bookings: 38 },
  { hour: '6PM', bookings: 41 },
  { hour: '8PM', bookings: 29 },
];

const channelDistribution = [
  { name: 'WhatsApp', value: 65, color: '#25D366' },
  { name: 'Web Chat', value: 20, color: '#3B82F6' },
  { name: 'Phone', value: 10, color: '#F59E0B' },
  { name: 'Email', value: 5, color: '#EF4444' },
];

export function KPICharts() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>{t('dashboard.kpi.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="responseTime" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="responseTime" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>{t('dashboard.kpi.responseTime')}</span>
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>{t('dashboard.kpi.volume')}</span>
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center space-x-2">
              <PieChartIcon className="w-4 h-4" />
              <span>{t('dashboard.kpi.channels')}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="responseTime" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name={t('dashboard.kpi.actualResponse')}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name={t('dashboard.kpi.targetResponse')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="volume" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="channels" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {channelDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}