'use client';

import { useState } from 'react';
import { CustomersHeader } from '@/components/ops/customers/CustomersHeader';
import { CustomersTable } from '@/components/ops/customers/CustomersTable';
import { CustomerFilters } from '@/components/ops/customers/CustomerFilters';
import { useLanguage } from '@/providers/LanguageProvider';

export default function CustomersPage() {
  const { t, isRTL } = useLanguage();
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <CustomersHeader 
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />
      
      <CustomerFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <CustomersTable 
        filters={filters}
        searchQuery={searchQuery}
      />
    </div>
  );
}