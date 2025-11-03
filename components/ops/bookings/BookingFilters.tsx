'use client';

import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/providers/LanguageProvider';

interface BookingFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export function BookingFilters({ filters, onFiltersChange }: BookingFiltersProps) {
  const { t } = useLanguage();

  const hasFilters = Object.keys(filters).length > 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 flex-1">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>

        <Select
          value={filters.status || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, status: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.date || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, date: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.service || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, service: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="haircut">Haircut</SelectItem>
            <SelectItem value="coloring">Coloring</SelectItem>
            <SelectItem value="styling">Styling</SelectItem>
            <SelectItem value="treatment">Treatment</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange({})}
            className="h-8"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {hasFilters && (
        <div className="flex items-center gap-2">
          {Object.entries(filters).map(([key, value]) => (
            <Badge key={key} variant="secondary">
              {key}: {String(value)}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
