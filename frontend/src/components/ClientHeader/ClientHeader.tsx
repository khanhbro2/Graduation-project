import React, { useEffect, useRef, useState } from 'react';
import { Menu as HeadlessMenu, Popover as HeadlessPopover } from '@headlessui/react';
import { ElectroLogo } from 'components';
import {
  Award,
  Bell,
  FileBarcode,
  Fingerprint,
  Heart,
  List,
  Login,
  Logout,
  MessageCircle,
  Moon,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Sun,
  User,
  UserCircle
} from 'tabler-icons-react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryMenu from 'components/ClientHeader/CategoryMenu';
import { useElementSize } from 'hooks/use-element-size';
import { useColorScheme } from 'hooks/use-color-scheme';
import useAuthStore from 'stores/use-auth-store';
import NotifyUtils from 'utils/NotifyUtils';
import { useQuery, useQueryClient } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import {
  EventInitiationResponse,
  NotificationResponse
} from 'models/Notification';
import MiscUtils from 'utils/MiscUtils';
import useClientSiteStore from 'stores/use-client-site-store';
import { ClientCartResponse, Empty } from 'types';

function ClientHeader() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [openedCategoryMenu, setOpenedCategoryMenu] = useState(false);
  const { ref: refHeaderStack, width: widthHeaderStack } = useElementSize();

  const { user, resetAuthState, currentTotalCartItems } = useAuthStore();
  const queryClient = useQueryClient();

  // Get cart total amount from database
  const { data: cartResponse } = useQuery<ClientCartResponse | Empty, ErrorMessage>(
    ['client-api', 'carts', 'getCart'],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_CART),
    {
      enabled: !!user,
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      staleTime: 0, // Always consider data stale to ensure fresh data
    }
  );

  const cartTotalAmount = React.useMemo(() => {
    if (!cartResponse || !Object.hasOwn(cartResponse, 'cartId')) {
      return 0;
    }
    const cart = cartResponse as ClientCartResponse;
    return cart.cartItems.reduce((total, item) => {
      const discountedPrice = MiscUtils.calculateDiscountedPrice(
        item.cartItemVariant.variantPrice,
        item.cartItemVariant.variantProduct.productPromotion
          ? item.cartItemVariant.variantProduct.productPromotion.promotionPercent
          : 0
      );
      return total + (item.cartItemQuantity * discountedPrice);
    }, 0);
  }, [cartResponse]);

  // Invalidate and refetch cart when total items change
  useEffect(() => {
    if (user) {
      queryClient.invalidateQueries(['client-api', 'carts', 'getCart']);
    }
  }, [user, currentTotalCartItems, queryClient]);

  // Search state & function
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useNotificationEvents();

  const { newNotifications } = useClientSiteStore();

  const [disabledNotificationIndicator, setDisabledNotificationIndicator] =
    useState(true);

  useEffect(() => {
    if (newNotifications.length > 0) {
      setDisabledNotificationIndicator(false);
    }
  }, [newNotifications.length]);

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search.trim() !== '') {
      navigate('/search?q=' + search.trim());
    }
  };

  const handleSignoutMenu = () => {
    if (user) {
      resetAuthState();
      NotifyUtils.simpleSuccess('Đăng xuất thành công');
    }
  };

  const handleNotificationButton = () => {
    if (user) {
      setDisabledNotificationIndicator(true);
      navigate('/user/notification');
    } else {
      NotifyUtils.simple('Vui lòng đăng nhập để sử dụng chức năng');
    }
  };

  return (
    <header className="shadow-sm border-b border-gray-200 dark:border-gray-700 mb-8 sticky top-0 z-10 bg-[#fafafa] dark:bg-gray-800">
      <div className="w-full">
        <div className="flex flex-col gap-0" ref={refHeaderStack as React.RefObject<HTMLDivElement>}>
          {/* Top Header Section - Light Gray Background */}
          <div className="bg-[#fafafa] dark:bg-gray-800 w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 sm:gap-6 w-full py-4">
                {/* Logo Section */}
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img 
                    src="/images/logo.png" 
                    alt="Thế Giới Trà Đạo Logo" 
                    className="h-16 w-auto sm:h-20 object-contain"
                  />
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-[600px] mx-auto flex items-center justify-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Bạn cần tìm sản phẩm gì?"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleSearchInput}
                      className="w-full pl-4 pr-14 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    />
                    <button
                      onClick={() => {
                        if (search.trim() !== '') {
                          navigate('/search?q=' + search.trim());
                        }
                      }}
                      className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-12 bg-[#8B4513] hover:bg-[#A0522D] text-white rounded-r-lg transition-colors"
                      type="button"
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
                  {user && (
                    <>
                      <Link
                        to="/cart"
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm font-medium whitespace-nowrap"
                      >
                        <ShoppingCart size={18} strokeWidth={2} />
                        <span className="text-xs sm:text-sm hidden sm:inline">Giỏ hàng / {MiscUtils.formatPrice(cartTotalAmount) + ' ₫'}</span>
                        <span className="text-xs sm:hidden">Giỏ hàng</span>
                      </Link>

                      <div className="group relative">
                        <Link
                          to="/order"
                          className="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                          title="Đơn hàng"
                        >
                          <FileBarcode size={18} strokeWidth={1.5} className="text-gray-700 dark:text-gray-300" />
                        </Link>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Đơn hàng
                        </div>
                      </div>
                    </>
                  )}

                  <div className="group relative">
                    <button
                      onClick={handleNotificationButton}
                      className="relative flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                      title="Thông báo"
                    >
                      {!disabledNotificationIndicator && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pink-500 border-2 border-white dark:border-gray-800 rounded-full" />
                      )}
                      <Bell size={18} strokeWidth={1.5} className="text-gray-700 dark:text-gray-300" />
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Thông báo
                    </div>
                  </div>

                  <HeadlessMenu as="div" className="relative">
                    {({ open }) => (
                      <>
                        <HeadlessMenu.Button className="group relative">
                          <div className={`flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm ${
                            user ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            <UserCircle size={18} strokeWidth={1.5} />
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Tài khoản
                          </div>
                        </HeadlessMenu.Button>
                    <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none z-50">
                      <div className="py-1">
                        {user && (
                          <>
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  to="/user"
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                >
                                  <User size={14} />
                                  Tài khoản
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  to="/user/setting"
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                >
                                  <Settings size={14} />
                                  Thiết đặt
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  to="/user/review"
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                >
                                  <Star size={14} />
                                  Đánh giá sản phẩm
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  to="/user/wishlist"
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                >
                                  <Heart size={14} />
                                  Sản phẩm yêu thích
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  to="/user/reward"
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                >
                                  <Award size={14} />
                                  Điểm thưởng
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  to="/user/chat"
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                >
                                  <MessageCircle size={14} />
                                  Yêu cầu tư vấn
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                              Giao diện
                            </div>
                            <div className="px-2 py-2">
                              <div className="flex rounded-md border border-gray-300 dark:border-gray-600 p-1">
                                <button
                                  onClick={() => toggleColorScheme('light')}
                                  className={`flex-1 flex items-center justify-center gap-2 px-2 py-1 text-xs rounded transition-colors ${
                                    colorScheme === 'light'
                                      ? 'bg-blue-600 text-white'
                                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  <Sun size={14} strokeWidth={1.5} />
                                  <span>Sáng</span>
                                </button>
                                <button
                                  onClick={() => toggleColorScheme('dark')}
                                  className={`flex-1 flex items-center justify-center gap-2 px-2 py-1 text-xs rounded transition-colors ${
                                    colorScheme === 'dark'
                                      ? 'bg-blue-600 text-white'
                                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  <Moon size={14} strokeWidth={1.5} />
                                  <span>Tối</span>
                                </button>
                              </div>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <button
                                  onClick={handleSignoutMenu}
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} w-full flex items-center gap-2 px-4 py-2 text-sm text-pink-600 dark:text-pink-400`}
                                >
                                  <Logout size={14} />
                                  Đăng xuất
                                </button>
                              )}
                            </HeadlessMenu.Item>
                          </>
                        )}
                        {!user && (
                          <>
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  to="/signin"
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                >
                                  <Login size={14} />
                                  Đăng nhập
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  to="/signup"
                                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                                >
                                  <Fingerprint size={14} />
                                  Đăng ký
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                          </>
                        )}
                      </div>
                    </HeadlessMenu.Items>
                  </>
                )}
              </HeadlessMenu>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Bar - Dark Reddish-Brown Background */}
          <div className="flex w-full bg-[#7F1D1D] dark:bg-[#5a1414]">
            <div className="container mx-auto px-4">
              <div className="flex w-full">
                {/* Product Categories Button - Orange-Brown */}
                <div className="bg-[#D97706] dark:bg-[#B8620A] px-6 py-3 flex-shrink-0 flex items-center">
                  <HeadlessPopover className="relative">
                    {({ open, close }) => (
                      <>
                        <HeadlessPopover.Button
                          onClick={() => setOpenedCategoryMenu(!openedCategoryMenu)}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white tracking-wide uppercase hover:bg-white/10 transition-colors"
                        >
                          <List size={18} />
                          DANH MỤC SẢN PHẨM
                        </HeadlessPopover.Button>
                        {open && (
                          <HeadlessPopover.Panel
                            static
                            className="absolute z-50 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700"
                            style={{ width: widthHeaderStack }}
                          >
                            <CategoryMenu setOpenedCategoryMenu={setOpenedCategoryMenu} />
                          </HeadlessPopover.Panel>
                        )}
                      </>
                    )}
                  </HeadlessPopover>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-3 flex items-center justify-end gap-6">
                  <Link to="/" className="text-white no-underline font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-80">
                    TRANG CHỦ
                  </Link>
                  <div className="w-px h-5 bg-white/30" />
                  <Link to="/all-categories" className="text-white no-underline font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-80">
                    SẢN PHẨM
                  </Link>
                  <div className="w-px h-5 bg-white/30" />
                  <Link to="/" className="text-white no-underline font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-80">
                    BÀI VIẾT
                  </Link>
                  <div className="w-px h-5 bg-white/30" />
                  <Link to="/" className="text-white no-underline font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-80">
                    VỀ CHÚNG TÔI
                  </Link>
                  <div className="w-px h-5 bg-white/30" />
                  <Link to="/contact" className="text-white no-underline font-semibold text-sm tracking-wide uppercase transition-opacity hover:opacity-80">
                    LIÊN HỆ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function useNotificationEvents() {
  const { user } = useAuthStore();

  const eventSourceRef = useRef<EventSource | null>(null);

  const { pushNewNotification } = useClientSiteStore();

  useQuery<EventInitiationResponse, ErrorMessage>(
    ['client-api', 'notifications/init-events', 'initNotificationEvents'],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_NOTIFICATION_INIT_EVENTS),
    {
      onSuccess: (response) => {
        const eventSource = new EventSource(
          `${ResourceURL.CLIENT_NOTIFICATION_EVENTS}?eventSourceUuid=${response.eventSourceUuid}`
        );

        eventSource.onopen = () =>
          MiscUtils.console.log('Opening EventSource of Notifications...');

        eventSource.onerror = () =>
          MiscUtils.console.error(
            'Encountered error with Notifications EventSource!'
          );

        eventSource.onmessage = (event) => {
          const notificationResponse = JSON.parse(
            event.data
          ) as NotificationResponse;
          pushNewNotification(notificationResponse);
        };

        eventSourceRef.current = eventSource;
      },
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled: !!user,
    }
  );

  useEffect(() => () => eventSourceRef.current?.close(), []);
}

export default React.memo(ClientHeader);
