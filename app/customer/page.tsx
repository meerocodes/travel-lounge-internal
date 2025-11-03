import { CustomerDashboard } from '@/components/customer/CustomerDashboard';
import { CustomerLayout } from '@/components/customer/CustomerLayout';

export default function CustomerPage() {
  return (
    <CustomerLayout>
      <CustomerDashboard />
    </CustomerLayout>
  );
}