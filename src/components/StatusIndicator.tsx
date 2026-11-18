import React from 'react';
import { ShieldCheck, AlertCircle, Info } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'ready' | 'warning' | 'error';
  label: string;
  details?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, details }) => {
  const config = {
    ready: {
      dot: 'bg-emerald-500',
      text: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: ShieldCheck,
    },
    warning: {
      dot: 'bg-amber',
      text: 'text-amber-800 bg-amber-50 border-amber-200',
      icon: AlertCircle,
    },
    error: {
      dot: 'bg-red-500',
      text: 'text-red-700 bg-red-50 border-red-200',
      icon: AlertCircle,
    },
  }[status];

  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${config.text}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      <span className="font-semibold">{label}</span>
      {details && <span className="opacity-80">({details})</span>}
    </div>
  );
};
