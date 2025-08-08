import React from 'react';

interface StatusIndicatorProps {
  isOnline: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isOnline }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div 
        className={`w-2 h-2 rounded-full ${
          isOnline ? 'bg-status-online' : 'bg-status-offline'
        }`} 
      />
      <span className="text-xs opacity-90">
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};