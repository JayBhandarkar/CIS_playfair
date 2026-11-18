import React from 'react';
import {
  LayoutDashboard,
  Grid3x3,
  Lock,
  Unlock,
  Eye,
  Calculator,
  GraduationCap,
  ShieldAlert,
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { NavigationPage } from '../types/playfair';

interface SidebarProps {
  currentPage: NavigationPage;
  onSelectPage: (page: NavigationPage) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItemConfig {
  id: NavigationPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'keysquare', label: 'Key Square Generator', icon: Grid3x3 },
  { id: 'encryption', label: 'Encryption', icon: Lock },
  { id: 'decryption', label: 'Decryption', icon: Unlock },
  { id: 'visualizer', label: 'Cipher Visualizer', icon: Eye, badge: 'Interactive' },
  { id: 'mathematics', label: 'Algorithm & Math', icon: Calculator },
  { id: 'examples', label: 'Examples & Practice', icon: GraduationCap },
  { id: 'security', label: 'Security Analysis', icon: ShieldAlert },
  { id: 'about', label: 'About Project', icon: Info },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const handleNavClick = (page: NavigationPage) => {
    onSelectPage(page);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-border select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-border h-16">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-subtle flex-shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h.01" />
              <path d="M12 7h.01" />
              <path d="M17 7h.01" />
              <path d="M7 12h.01" />
              <path d="M12 12h.01" />
              <path d="M17 12h.01" />
              <path d="M7 17h.01" />
              <path d="M12 17h.01" />
              <path d="M17 17h.01" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-bold text-navy-900 tracking-tight text-base leading-tight">
                PLAYFAIR LAB
              </span>
              <span className="text-[11px] font-medium text-slate-muted uppercase tracking-wider">
                Classical Cryptography
              </span>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-slate-muted hover:text-navy-900 hover:bg-slate-light rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                isActive
                  ? 'bg-primary-light text-primary font-semibold shadow-subtle'
                  : 'text-slate-muted hover:text-navy-800 hover:bg-slate-light'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-muted group-hover:text-navy-800'
                }`}
              />
              {!isCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-teal-light text-teal flex-shrink-0">
                  {item.badge}
                </span>
              )}
              {/* Active left pill indicator */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Environment Status */}
      <div className="p-3 border-t border-slate-border">
        {!isCollapsed ? (
          <div className="bg-slate-light rounded-xl p-3 flex items-center justify-between text-xs text-slate-muted">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="font-semibold text-navy-800">Browser Engine</p>
                <p className="text-[11px]">100% Client-Side Local</p>
              </div>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
        ) : (
          <div className="flex justify-center" title="Browser Engine: 100% Client-Side Local">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:flex items-center justify-end mt-2">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 text-slate-muted hover:text-navy-900 hover:bg-slate-light rounded-lg transition-colors text-xs"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs">Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky/Fixed Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-navy-900/40 backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Slide-in Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};
