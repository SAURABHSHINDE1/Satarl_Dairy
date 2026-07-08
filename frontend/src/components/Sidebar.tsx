import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FlaskConical,
  FileText,
  Users,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  Milk,
} from 'lucide-react';
import { useUIStore } from '../store/ui.store';
import { useAuthStore } from '../store/auth.store';
import { cn } from '../lib/utils';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tank-records', label: 'Tank Records', icon: FlaskConical },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/users', label: 'Users', icon: Users, roles: ['admin'] },
  { path: '/activity-logs', label: 'Activity Logs', icon: Activity, roles: ['admin'] },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();

  const filteredMenuItems = menuItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-700 shadow-soft z-50"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-secondary-200">
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Milk className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-text-primary">Satral ERP</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-text-secondary" />
            ) : (
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-text-secondary hover:bg-secondary-100 hover:text-text-primary'
                  )
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-secondary-200">
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-xs text-text-secondary"
              >
                <p>Logged in as:</p>
                <p className="font-medium text-text-primary">{user?.full_name}</p>
                <p className="capitalize">{user?.role?.replace('_', ' ')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
