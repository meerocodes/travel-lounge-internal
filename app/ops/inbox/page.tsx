'use client';

import { useState } from 'react';
import { InboxSidebar } from '@/components/ops/inbox/InboxSidebar';
import { ChatArea } from '@/components/ops/inbox/ChatArea';
import { BookingPanel } from '@/components/ops/inbox/BookingPanel';
import { useLanguage } from '@/providers/LanguageProvider';

export default function InboxPage() {
  const { t, isRTL } = useLanguage();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showBookingPanel, setShowBookingPanel] = useState(true);

  return (
    <div className={`h-full flex ${isRTL ? 'rtl' : 'ltr'}`}>
      <InboxSidebar 
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      
      <div className="flex-1 flex">
        <div className={`flex-1 ${showBookingPanel ? 'w-2/3' : 'w-full'}`}>
          <ChatArea 
            selectedChat={selectedChat}
            onToggleBookingPanel={() => setShowBookingPanel(!showBookingPanel)}
          />
        </div>
        
        {showBookingPanel && selectedChat && (
          <BookingPanel 
            chatId={selectedChat}
            onClose={() => setShowBookingPanel(false)}
          />
        )}
      </div>
    </div>
  );
}