import React from 'react';
import { Bell, Browser, Icon, Logout, Messages, MoonStars, Search, Sun, User, Menu, Leaf, ChevronLeft, ChevronRight } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import useAppStore from 'stores/use-app-store';
import NotifyUtils from 'utils/NotifyUtils';
import useAdminAuthStore from 'stores/use-admin-auth-store';
import { useColorScheme } from 'hooks/use-color-scheme';

interface HeaderLink {
  link: string;
  label: string;
  icon: Icon;
  target?: string;
}

const headerLinks: HeaderLink[] = [
  {
    link: '/admin/account',
    label: 'Tài khoản',
    icon: User,
  },
  {
    link: '/admin/notification',
    label: 'Thông báo',
    icon: Bell,
  },
  {
    link: '/admin/chat',
    label: 'Tin nhắn',
    icon: Messages,
  },
  {
    link: '/',
    label: 'Website',
    icon: Browser,
    target: '_blank',
  },
];

export function DefaultHeader() {
  const { opened, toggleOpened, collapsed, toggleCollapsed } = useAppStore();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const { user, resetAdminAuthState } = useAdminAuthStore();

  const dark = colorScheme === 'dark';

  const headerLinksFragment = headerLinks.map((headerLink) => (
    <Link
      key={headerLink.label}
      to={headerLink.link}
      target={headerLink.target}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 no-underline hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-blue-50 dark:active:bg-blue-900/20 transition-all"
    >
      <headerLink.icon size={16} strokeWidth={1.5} />
      {headerLink.label}
    </Link>
  ));

  const handleSignoutButton = () => {
    if (user) {
      resetAdminAuthState();
      toggleColorScheme('light');
      NotifyUtils.simpleSuccess('Đăng xuất thành công');
    }
  };

  return (
    <header className="h-14 px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="h-full flex items-center justify-between max-w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleOpened}
            className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={toggleCollapsed}
            className="hidden md:flex p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Leaf size={20} className="text-green-600 dark:text-green-400" strokeWidth={2} />
            </div>
            {!collapsed && (
              <span className="hidden md:block text-lg font-semibold text-gray-800 dark:text-gray-200">Thất An Nhiên</span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1">
            {headerLinksFragment}
          </div>
          <div className="flex items-center gap-2">
            <button
              title="Tìm kiếm"
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              <Search size={18} strokeWidth={1.5}/>
            </button>
            <button
              onClick={() => toggleColorScheme()}
              title="Thay đổi chế độ màu"
              className={`p-2 border rounded-lg transition-all ${
                dark
                  ? 'border-yellow-300 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                  : 'border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            >
              {dark ? <Sun size={18} strokeWidth={1.5}/> : <MoonStars size={18} strokeWidth={1.5}/>}
            </button>
            <button
              onClick={handleSignoutButton}
              title="Đăng xuất"
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-all"
            >
              <Logout size={18} strokeWidth={1.5}/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
