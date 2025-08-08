import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { Message } from './ChatWidget';

interface ChatMessageProps {
  message: Message;
  avatarUrl?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, avatarUrl }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex gap-3 animate-chat-fade-in ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        {!isUser && avatarUrl ? (
          <img src={avatarUrl} alt="Support avatar" className="w-full h-full object-cover" />
        ) : (
          <AvatarFallback className={isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-3 py-2 rounded-2xl ${
            isUser
              ? 'bg-chat-bubble-user text-chat-bubble-user-foreground rounded-br-md'
              : 'bg-chat-bubble-bot text-chat-bubble-bot-foreground rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};