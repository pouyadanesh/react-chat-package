import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface MaintenanceBannerProps {
  message: string;
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({ message }) => {
  return (
    <div className="bg-status-maintenance/10 border-l-4 border-status-maintenance p-3 m-4 rounded">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-status-maintenance flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-status-maintenance">Maintenance Mode</p>
          <p className="text-xs text-muted-foreground mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};