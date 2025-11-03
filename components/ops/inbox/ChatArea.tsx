'use client';

import { useState } from 'react';
import { Send, Paperclip, MoreVertical, PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/providers/LanguageProvider';

interface ChatAreaProps {
  selectedChat: string | null;
  onToggleBookingPanel: () => void;
}

export function ChatArea({ selectedChat, onToggleBookingPanel }: ChatAreaProps) {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
          <p className="text-sm text-muted-foreground">
            Choose a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  const mockMessages = [
    {
      id: '1',
      sender: 'customer',
      text: 'Hi, I need to reschedule my appointment for tomorrow',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      sender: 'agent',
      text: 'Hello! I can help you with that. What time would work better for you?',
      timestamp: '10:31 AM',
    },
    {
      id: '3',
      sender: 'customer',
      text: 'Would Thursday at 2 PM be available?',
      timestamp: '10:32 AM',
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Sarah Johnson</h3>
            <p className="text-sm text-muted-foreground">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleBookingPanel}>
            <PanelRight className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'agent'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'agent' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="min-h-[60px] max-h-[120px] resize-none"
          />
          <Button onClick={handleSend} size="icon" className="shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
