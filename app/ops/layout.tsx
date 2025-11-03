import { OpsHeader } from '@/components/ops/OpsHeader';
import { OpsSidebar } from '@/components/ops/OpsSidebar';

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <OpsSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OpsHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}