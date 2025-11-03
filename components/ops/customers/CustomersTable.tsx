'use client';

import { MoreVertical, Mail, Phone, MapPin } from 'lucide-react';
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

interface CustomersTableProps {
  filters: any;
  searchQuery: string;
}

export function CustomersTable({ filters, searchQuery }: CustomersTableProps) {
  const { t } = useLanguage();

  const mockCustomers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      totalBookings: 24,
      totalSpent: '$2,450',
      segment: 'VIP',
      status: 'active',
      lastVisit: '2024-01-10',
    },
    {
      id: '2',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.r@example.com',
      phone: '+971 50 123 4567',
      location: 'Dubai, UAE',
      totalBookings: 12,
      totalSpent: '$1,200',
      segment: 'Regular',
      status: 'active',
      lastVisit: '2024-01-08',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      email: 'maria.g@example.com',
      phone: '+34 612 345 678',
      location: 'Madrid, Spain',
      totalBookings: 3,
      totalSpent: '$385',
      segment: 'New',
      status: 'active',
      lastVisit: '2024-01-05',
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {customer.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="truncate max-w-[180px]">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{customer.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium">{customer.totalBookings}</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold">{customer.totalSpent}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    customer.segment === 'VIP'
                      ? 'default'
                      : customer.segment === 'New'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {customer.segment}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {customer.lastVisit}
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
                    <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                    <DropdownMenuItem>View Bookings</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
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
