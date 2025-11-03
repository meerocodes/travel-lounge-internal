'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/providers/LanguageProvider';

interface InboxSidebarProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

export function InboxSidebar({ selectedChat, onSelectChat }: InboxSidebarProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const mockChats = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      lastMessage: 'I need to reschedule my appointment',
      timestamp: '2 min ago',
      unread: 3,
      status: 'active',
    },
    {
      id: '2',
      customerName: 'Ahmed Al-Rashid',
      lastMessage: 'Thank you for your help!',
      timestamp: '15 min ago',
      unread: 0,
      status: 'resolved',
    },
    {
      id: '3',
      customerName: 'Maria Garcia',
      lastMessage: 'Can I add another service?',
      timestamp: '1 hour ago',
      unread: 1,
      status: 'pending',
    },
  ];

  return (
    <div className="w-80 border-r bg-background flex flex-col">
      <div className="p-4 border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                selectedChat === chat.id ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className="font-medium">{chat.customerName}</span>
                <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {chat.lastMessage}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant={chat.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                  {chat.status}
                </Badge>
                {chat.unread > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
