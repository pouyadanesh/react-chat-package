import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { StatusIndicator } from './StatusIndicator';
import { MaintenanceBanner } from './MaintenanceBanner';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatWidgetProps {
  /** Widget position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Custom brand color (hex, rgb, or hsl format) */
  brandColor?: string;
  /** Custom greeting message */
  greetingMessage?: string;
  /** Widget title */
  title?: string;
  /** Online status indicator */
  isOnline?: boolean;
  /** Enable maintenance mode */
  isMaintenanceMode?: boolean;
  /** Message shown during maintenance */
  maintenanceMessage?: string;
  /** Custom avatar URL for bot messages */
  avatarUrl?: string;
  /** API endpoint for sending messages */
  apiEndpoint?: string;
  /** Additional CSS classes */
  className?: string;
  /** Start widget in open state */
  defaultOpen?: boolean;
  /** Save messages to localStorage */
  persistMessages?: boolean;
  /** Maximum number of messages to store */
  maxMessages?: number;
  /** Callback fired when widget opens/closes */
  onToggle?: (isOpen: boolean) => void;
  /** Callback fired when user sends a message */
  onMessageSent?: (message: string) => void;
  /** Custom handler for processing messages */
  onCustomMessageHandler?: (message: string) => Promise<string>;
}

const DEFAULT_GREETING = "Hi! How can I help you today?";
const STORAGE_KEY = 'eloquent-chat-messages';

export const ChatWidget: React.FC<ChatWidgetProps> = (props) => {
  const {
    position = 'bottom-right',
    brandColor,
    greetingMessage = DEFAULT_GREETING,
    title = "Chat Support",
    isOnline = true,
    isMaintenanceMode = false,
    maintenanceMessage = "We're currently performing maintenance. Please try again later.",
    avatarUrl,
    apiEndpoint,
    className = '',
    defaultOpen = false,
    persistMessages = true,
    maxMessages = 100,
    onToggle,
    onMessageSent,
    onCustomMessageHandler
  } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load persisted messages on mount
  useEffect(() => {
    if (persistMessages) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsedMessages = JSON.parse(stored).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(parsedMessages);
          return; // Exit early if we have stored messages
        } catch (error) {
          console.warn('Failed to parse stored messages:', error);
        }
      }
    }

    // Add initial greeting if no stored messages
    const greetingMsg: Message = {
      id: 'greeting',
      content: greetingMessage,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([greetingMsg]);
  }, [persistMessages]);

  // Update greeting message when prop changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length > 0 && prev[0].id === 'greeting') {
        return [
          { ...prev[0], content: greetingMessage },
          ...prev.slice(1)
        ];
      }
      return prev;
    });
  }, [greetingMessage]);

  // Persist messages to localStorage
  useEffect(() => {
    if (persistMessages && messages.length > 0) {
      const toStore = messages.slice(-maxMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    }
  }, [messages, persistMessages, maxMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleWidget = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isMaintenanceMode) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    onMessageSent?.(userMessage.content);

    try {
      let botResponse = '';
      
      if (onCustomMessageHandler) {
        botResponse = await onCustomMessageHandler(userMessage.content);
      } else if (apiEndpoint) {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage.content })
        });
        const data = await response.json();
        botResponse = data.response || data.message || 'Sorry, I couldn\'t process that.';
      } else {
        // Mock response for demo
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        botResponse = generateMockResponse(userMessage.content);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I\'m having trouble responding right now. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateMockResponse = (userMessage: string): string => {
    const responses = [
      "Thanks for your message! I'm here to help you with any questions.",
      "I understand you're asking about that. Let me provide you with some information.",
      "That's a great question! Here's what I can tell you about that.",
      "I appreciate you reaching out. Let me assist you with that.",
      "Thanks for contacting us! I'll be happy to help you with your inquiry."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const customStyles = brandColor ? {
    '--primary': brandColor,
    '--primary-foreground': 'hsl(0 0% 98%)',
    '--accent': brandColor,
    '--gradient-chat': `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
  } as React.CSSProperties : {};

  return (
    <div 
      className={`fixed ${getPositionClasses()} z-50 ${className}`}
      style={customStyles}
    >
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 md:fixed md:inset-0 md:w-full md:h-full md:mb-0 md:rounded-none bg-background border border-border rounded-2xl md:border-none shadow-float animate-chat-slide-up overflow-hidden md:z-[60]">
          {/* Header */}
          <div className="bg-gradient-chat p-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <StatusIndicator isOnline={isOnline} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Desktop minimize button (hidden on mobile) */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleWidget}
                  className="hidden sm:flex text-primary-foreground hover:bg-white/20 w-8 h-8 p-0"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleWidget}
                  className="text-primary-foreground hover:bg-white/20 w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Maintenance Banner */}
          {isMaintenanceMode && (
            <MaintenanceBanner message={maintenanceMessage} />
          )}

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="h-80 md:h-[calc(100vh-200px)] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  avatarUrl={avatarUrl}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-background">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isMaintenanceMode ? "Chat unavailable during maintenance" : "Type your message..."}
                disabled={isMaintenanceMode}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isMaintenanceMode}
                className="bg-gradient-chat hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button - Hidden on mobile when chat is open */}
      <Button
        onClick={toggleWidget}
        className={`w-14 h-14 rounded-full bg-gradient-chat shadow-chat hover:shadow-float transition-all duration-300 ${
          isOpen ? 'scale-90 md:hidden' : 'scale-100 animate-pulse-glow'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </Button>
    </div>
  );
};