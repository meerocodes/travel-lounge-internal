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

interface CustomerFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

export function CustomerFilters({ filters, onFiltersChange }: CustomerFiltersProps) {
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.segment || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, segment: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Segments</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="new">New</SelectItem>
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
