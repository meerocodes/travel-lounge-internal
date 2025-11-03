'use client';

import { MoreVertical, Calendar, Clock, User, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/providers/LanguageProvider';

interface BookingsTableProps {
  filters: any;
  searchQuery: string;
}

export function BookingsTable({ filters, searchQuery }: BookingsTableProps) {
  const { t } = useLanguage();

  const mockBookings = [
    {
      id: 'BK-2024-001',
      customer: 'Sarah Johnson',
      service: 'Hair Cut & Styling',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '60 min',
      status: 'confirmed',
      price: '$85.00',
      location: 'Downtown Salon',
    },
    {
      id: 'BK-2024-002',
      customer: 'Ahmed Al-Rashid',
      service: 'Hair Coloring',
      date: '2024-01-15',
      time: '3:30 PM',
      duration: '120 min',
      status: 'confirmed',
      price: '$150.00',
      location: 'Mall Branch',
    },
    {
      id: 'BK-2024-003',
      customer: 'Maria Garcia',
      service: 'Hair Treatment',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '90 min',
      status: 'pending',
      price: '$120.00',
      location: 'Downtown Salon',
    },
    {
      id: 'BK-2024-004',
      customer: 'John Smith',
      service: 'Beard Trim',
      date: '2024-01-14',
      time: '4:00 PM',
      duration: '30 min',
      status: 'completed',
      price: '$35.00',
      location: 'Mall Branch',
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(booking.customer)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{booking.customer}</span>
                </div>
              </TableCell>
              <TableCell>{booking.service}</TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm">{booking.duration}</TableCell>
              <TableCell className="text-sm">{booking.location}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 font-semibold">
                  <DollarSign className="h-3 w-3" />
                  <span>{booking.price.replace('$', '')}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusColor(booking.status) as any}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
                    <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
