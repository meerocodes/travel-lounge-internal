'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Plane, Download, MessageCircle, Car, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Circle as XCircle } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const upcomingBookings = [
  {
    id: 'B-2024-001',
    date: '2024-01-15',
    time: '14:30',
    pickupLocation: 'Downtown Hotel',
    dropoffLocation: 'YYZ Airport',
    flightNumber: 'AC 1234',
    status: 'confirmed',
    vehicleType: 'Sedan',
    driver: 'Ahmed Hassan',
    price: '$65.00',
  },
  {
    id: 'B-2024-002',
    date: '2024-01-22',
    time: '09:15',
    pickupLocation: 'YYZ Airport',
    dropoffLocation: 'Business District',
    flightNumber: 'WS 567',
    status: 'pending',
    vehicleType: 'SUV',
    driver: null,
    price: '$75.00',
  },
];

const pastBookings = [
  {
    id: 'B-2024-000',
    date: '2024-01-10',
    time: '16:45',
    pickupLocation: 'Home Address',
    dropoffLocation: 'YYZ Airport',
    flightNumber: 'AC 789',
    status: 'completed',
    vehicleType: 'Sedan',
    driver: 'Omar Al-Rashid',
    price: '$70.00',
    rating: 5,
  },
  {
    id: 'B-2023-999',
    date: '2023-12-20',
    time: '11:30',
    pickupLocation: 'YYZ Airport',
    dropoffLocation: 'Hotel',
    flightNumber: 'BA 456',
    status: 'completed',
    vehicleType: 'SUV',
    driver: 'Sarah Mitchell',
    price: '$80.00',
    rating: 4,
  },
];

export function CustomerDashboard() {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('upcoming');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {t('customer.welcome')}, Sarah!
        </h1>
        <p className="text-blue-100 mb-6">
          {t('customer.welcomeMessage')}
        </p>
        <div className="flex items-center space-x-6 text-blue-100">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{t('customer.totalBookings')}: 12</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-5 h-5" />
            <span>{t('customer.completedTrips')}: 10</span>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{t('customer.myBookings')}</span>
            </div>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              {t('customer.contactSupport')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">
                {t('customer.upcomingBookings')}
                <Badge variant="secondary" className="ml-2">
                  {upcomingBookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="past">
                {t('customer.pastBookings')}
                <Badge variant="secondary" className="ml-2">
                  {pastBookings.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(booking.status)}
                          <div>
                            <h3 className="font-semibold text-lg">
                              {t('customer.booking')} #{booking.id}
                            </h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {t(`customer.status.${booking.status}`)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {booking.price}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.vehicleType}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{booking.date} at {booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Plane className="w-4 h-4 text-gray-500" />
                            <span>{t('customer.flight')}: {booking.flightNumber}</span>
                          </div>
                          {booking.driver && (
                            <div className="flex items-center space-x-3">
                              <Car className="w-4 h-4 text-gray-500" />
                              <span>{t('customer.driver')}: {booking.driver}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-green-600 mt-1" />
                            <div>
                              <div className="font-medium text-green-600">
                                {t('customer.pickup')}
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.pickupLocation}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-red-600 mt-1" />
                            <div>
                              <div className="font-medium text-red-600">
                                {t('customer.dropoff')}
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.dropoffLocation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t">
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            {t('customer.downloadVoucher')}
                          </Button>
                          <Button variant="outline" size="sm">
                            {t('customer.modify')}
                          </Button>
                        </div>
                        <Button size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {t('customer.chat')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <Card key={booking.id} className="border-l-4 border-l-gray-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(booking.status)}
                          <div>
                            <h3 className="font-semibold text-lg">
                              {t('customer.booking')} #{booking.id}
                            </h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {t(`customer.status.${booking.status}`)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-600">
                            {booking.price}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.vehicleType}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{booking.date} at {booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Plane className="w-4 h-4 text-gray-500" />
                            <span>{t('customer.flight')}: {booking.flightNumber}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Car className="w-4 h-4 text-gray-500" />
                            <span>{t('customer.driver')}: {booking.driver}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-green-600 mt-1" />
                            <div>
                              <div className="font-medium text-green-600">
                                {t('customer.pickup')}
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.pickupLocation}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-red-600 mt-1" />
                            <div>
                              <div className="font-medium text-red-600">
                                {t('customer.dropoff')}
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.dropoffLocation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          {booking.rating && (
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-600">
                                {t('customer.rating')}:
                              </span>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <div
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= booking.rating
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  >
                                    ★
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            {t('customer.downloadReceipt')}
                          </Button>
                          <Button variant="outline" size="sm">
                            {t('customer.bookAgain')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}