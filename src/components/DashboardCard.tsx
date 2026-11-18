import React from 'react';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  children,
  action,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-border p-5 sm:p-6 shadow-subtle hover:shadow-card transition-shadow ${className}`}
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-border">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="font-bold text-navy-900 text-base leading-tight">{title}</h3>
            {subtitle && <p className="text-xs text-slate-muted mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};
