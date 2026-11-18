import React from 'react';
import { Menu, RotateCcw, Shield } from 'lucide-react';
import { NavigationPage } from '../types/playfair';

interface PageHeaderProps {
  currentPage: NavigationPage;
  onOpenMobile: () => void;
  onResetAll?: () => void;
  title: string;
  subtitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  onOpenMobile,
  onResetAll,
  title,
  subtitle,
}) => {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-border px-4 lg:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 text-slate-muted hover:text-navy-900 hover:bg-slate-light rounded-lg transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg lg:text-xl font-bold text-navy-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-muted hidden sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-light border border-slate-border text-xs text-slate-muted">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span>Educational Cipher</span>
        </div>

        {onResetAll && (
          <button
            onClick={onResetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-muted hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-lg shadow-subtle transition-colors"
            title="Reset to default example"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        )}
      </div>
    </header>
  );
};
