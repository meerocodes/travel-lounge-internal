'use client';

import { useState } from 'react';
import { BookingsHeader } from '@/components/ops/bookings/BookingsHeader';
import { BookingsTable } from '@/components/ops/bookings/BookingsTable';
import { BookingFilters } from '@/components/ops/bookings/BookingFilters';
import { useLanguage } from '@/providers/LanguageProvider';

export default function BookingsPage() {
  const { t, isRTL } = useLanguage();
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <BookingsHeader 
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />
      
      <BookingFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <BookingsTable 
        filters={filters}
        searchQuery={searchQuery}
      />
    </div>
  );
}