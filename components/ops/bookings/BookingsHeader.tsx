'use client';

import { Search, Plus, Download, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/providers/LanguageProvider';

interface BookingsHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function BookingsHeader({ onSearch, searchQuery }: BookingsHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage appointments and reservations</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Calendar View
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>
    </div>
  );
}
