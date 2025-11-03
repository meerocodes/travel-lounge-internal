'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface RealtimeContextType {
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
  subscribe: (channel: string, callback: (data: any) => void) => void;
  unsubscribe: (channel: string) => void;
  emit: (event: string, data: any) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [subscriptions, setSubscriptions] = useState<Map<string, (data: any) => void>>(new Map());

  useEffect(() => {
    // Simulate WebSocket connection
    const connectWebSocket = () => {
      setConnectionStatus('connecting');
      
      // Mock connection delay
      setTimeout(() => {
        setIsConnected(true);
        setConnectionStatus('connected');
        
        // Start receiving mock real-time updates
        const interval = setInterval(() => {
          // Simulate incoming real-time data
          subscriptions.forEach((callback, channel) => {
            if (channel === 'queue_updates') {
              callback({
                type: 'queue_update',
                data: {
                  queueLength: Math.floor(Math.random() * 10) + 1,
                  timestamp: new Date().toISOString()
                }
              });
            } else if (channel === 'agent_status') {
              callback({
                type: 'agent_status_change',
                data: {
                  agentId: 'agent_' + Math.floor(Math.random() * 4) + 1,
                  status: ['online', 'busy', 'away'][Math.floor(Math.random() * 3)],
                  timestamp: new Date().toISOString()
                }
              });
            }
          });
        }, 5000);

        return () => clearInterval(interval);
      }, 1000);
    };

    connectWebSocket();
  }, [subscriptions]);

  const subscribe = (channel: string, callback: (data: any) => void) => {
    setSubscriptions(prev => new Map(prev).set(channel, callback));
  };

  const unsubscribe = (channel: string) => {
    setSubscriptions(prev => {
      const newMap = new Map(prev);
      newMap.delete(channel);
      return newMap;
    });
  };

  const emit = (event: string, data: any) => {
    // Mock emit functionality
    console.log('Emitting event:', event, data);
  };

  return (
    <RealtimeContext.Provider value={{ 
      isConnected, 
      connectionStatus, 
      subscribe, 
      unsubscribe, 
      emit 
    }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}