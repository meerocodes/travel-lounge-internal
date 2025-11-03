'use client';

import { X, Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/providers/LanguageProvider';

interface BookingPanelProps {
  chatId: string;
  onClose: () => void;
}

export function BookingPanel({ chatId, onClose }: BookingPanelProps) {
  const { t } = useLanguage();

  const mockBooking = {
    id: 'BK-2024-001',
    status: 'confirmed',
    service: 'Hair Cut & Styling',
    date: 'Jan 15, 2024',
    time: '2:00 PM',
    duration: '60 min',
    location: 'Downtown Salon',
    price: '$85.00',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
    },
  };

  return (
    <div className="w-96 border-l bg-background flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Booking Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {mockBooking.id}
                </CardTitle>
                <Badge variant="secondary">{mockBooking.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">{mockBooking.service}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{mockBooking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{mockBooking.time} ({mockBooking.duration})</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{mockBooking.location}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-semibold text-lg">{mockBooking.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{mockBooking.customer.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{mockBooking.customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{mockBooking.customer.phone}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              Reschedule Booking
            </Button>
            <Button className="w-full" variant="outline">
              Cancel Booking
            </Button>
            <Button className="w-full">
              View Full Details
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
