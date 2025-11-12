import {
  Anchor,
  Badge,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Indicator,
  Menu,
  Popover,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { ElectroLogo } from 'components';
import {
  Alarm,
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
import { useElementSize } from '@mantine/hooks';
import useAuthStore from 'stores/use-auth-store';
import NotifyUtils from 'utils/NotifyUtils';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import {
  EventInitiationResponse,
  NotificationResponse
} from 'models/Notification';
import MiscUtils from 'utils/MiscUtils';
import useClientSiteStore from 'stores/use-client-site-store';

const useStyles = createStyles((theme) => ({
  header: {
    boxShadow: theme.shadows.xs,
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
    marginBottom: theme.spacing.md * 2,
    backgroundColor: '#fafafa',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    gap: 0,
    flexDirection: 'row',
  },

  iconGroup: {
    backgroundColor: theme.white,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[2]}`,
    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      borderColor: theme.colors.gray[3],
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows.xs,
    },

    '&:active': {
      transform: 'translateY(0)',
    },
  },

  logo: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
  },
  group: {
    gap: theme.spacing.lg,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    maxWidth: 650,
    margin: `0 ${theme.spacing.xl}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActions: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
  },
  topRow: {
    padding: `${theme.spacing.md} 0`,
    width: '100%',
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  },
  bottomRow: {
    padding: 0,
    backgroundColor: '#fafafa',
    display: 'flex',
    width: '100%',
  },
  categorySection: {
    backgroundColor: '#D97706',
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
  },
  navSection: {
    backgroundColor: '#7F1D1D',
    flex: 1,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing.lg,
  },
  navLink: {
    color: theme.white,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
  navDivider: {
    width: 1,
    height: 20,
    backgroundColor: theme.white,
    opacity: 0.3,
  },
}));

function ClientHeader() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [openedCategoryMenu, setOpenedCategoryMenu] = useState(false);

  const { ref: refHeaderStack, width: widthHeaderStack } = useElementSize();

  const { user, resetAuthState, currentTotalCartItems,  } = useAuthStore();

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
    <header className={classes.header}>
      <Container size="xl">
        <Stack spacing={0} ref={refHeaderStack}>
          <Group
            className={`${classes.group} ${classes.topRow}`}
            noWrap
          >
            <Box component={Link} to="/" className={classes.logo}>
              <ElectroLogo width={120} />
            </Box>
            <Box className={classes.searchContainer}>
              <TextInput
                placeholder="Bạn cần tìm sản phẩm gì?"
                variant="filled"
                size="md"
                radius="md"
                icon={<Search size={16} />}
                rightSection={
                  <Button
                    size="sm"
                    color="red"
                    radius="md"
                    onClick={() => {
                      if (search.trim() !== '') {
                        navigate('/search?q=' + search.trim());
                      }
                    }}
                    sx={{ height: '90%', marginRight: 4 }}
                  >
                    <Search size={16} />
                  </Button>
                }
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                onKeyDown={handleSearchInput}
                styles={{
                  input: {
                    paddingRight: 60,
                    backgroundColor: theme.white,
                  },
                }}
              />
            </Box>
            <Group spacing="xs" className={classes.rightActions} noWrap>
              {user && (
                <>
                  <Tooltip label="Giỏ hàng" position="bottom">
                    <UnstyledButton component={Link} to="/cart">
                      <Group
                        spacing="xs"
                        px={theme.spacing.sm}
                        py={theme.spacing.xs}
                        className={classes.iconGroup}
                      >
                        <ShoppingCart strokeWidth={1} />
                        <Text weight={500} size="sm">
                          {currentTotalCartItems}
                        </Text>
                      </Group>
                    </UnstyledButton>
                  </Tooltip>

                  <Tooltip label="Đơn hàng" position="bottom">
                    <UnstyledButton component={Link} to="/order">
                      <Group
                        spacing="xs"
                        px={theme.spacing.sm}
                        py={theme.spacing.xs}
                        className={classes.iconGroup}
                      >
                        <FileBarcode strokeWidth={1} />
                      </Group>
                    </UnstyledButton>
                  </Tooltip>
                </>
              )}

              <Tooltip label="Thông báo" position="bottom">
                <UnstyledButton onClick={handleNotificationButton}>
                  <Indicator
                    size={14}
                    color="pink"
                    withBorder
                    disabled={disabledNotificationIndicator}
                  >
                    <Group
                      spacing="xs"
                      px={theme.spacing.sm}
                      py={theme.spacing.xs}
                      className={classes.iconGroup}
                    >
                      <Bell strokeWidth={1} />
                    </Group>
                  </Indicator>
                </UnstyledButton>
              </Tooltip>

              <Menu
                placement="end"
                control={
                  <Tooltip label='Tài khoản' position="bottom">
                    <UnstyledButton>
                      <Group
                        spacing="xs"
                        px={theme.spacing.sm}
                        py={theme.spacing.xs}
                        className={classes.iconGroup}
                        sx={{
                          color: user?theme.colors.blue[theme.colorScheme === 'dark' ? 4 : 7]
                            :'inherit',
                        }}
                      >
                        <UserCircle strokeWidth={1} />
                      </Group>
                    </UnstyledButton>
                  </Tooltip>
                }
              >
                {user && (
                  <>
                    <Menu.Item
                      icon={<User size={14} />}
                      component={Link}
                      to="/user"
                    >
                      Tài khoản
                    </Menu.Item>
                    <Menu.Item
                      icon={<Settings size={14} />}
                      component={Link}
                      to="/user/setting"
                    >
                      Thiết đặt
                    </Menu.Item>
                    <Menu.Item
                      icon={<Star size={14} />}
                      component={Link}
                      to="/user/review"
                    >
                      Đánh giá sản phẩm
                    </Menu.Item>
                    <Menu.Item
                      icon={<Heart size={14} />}
                      component={Link}
                      to="/user/wishlist"
                    >
                      Sản phẩm yêu thích
                    </Menu.Item>
                    <Menu.Item
                      icon={<Award size={14} />}
                      component={Link}
                      to="/user/reward"
                    >
                      Điểm thưởng
                    </Menu.Item>
                    {/* <Menu.Item
                      icon={<Alarm size={14} />}
                      component={Link}
                      to="/user/preorder"
                    >
                      Đặt trước sản phẩm
                    </Menu.Item> */}
                    <Menu.Item
                      icon={<MessageCircle size={14} />}
                      component={Link}
                      to="/user/chat"
                    >
                      Yêu cầu tư vấn
                    </Menu.Item>
                    <Menu.Label>Giao diện</Menu.Label>
                    <Box px="xs" py="xs">
                      <SegmentedControl
                        fullWidth
                        size="xs"
                        value={colorScheme}
                        onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
                        data={[
                          {
                            value: 'light',
                            label: (
                              <Center>
                                <Sun size={14} strokeWidth={1.5}/>
                                <Box ml={8}>Sáng</Box>
                              </Center>
                            ),
                          },
                          {
                            value: 'dark',
                            label: (
                              <Center>
                                <Moon size={14} strokeWidth={1.5}/>
                                <Box ml={8}>Tối</Box>
                              </Center>
                            ),
                          },
                        ]}
                      />
                    </Box>
                    <Menu.Item
                      color="pink"
                      icon={<Logout size={14} />}
                      onClick={handleSignoutMenu}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </>
                )}
                {!user && (
                  <>
                    <Menu.Item
                      icon={<Login size={14} />}
                      component={Link}
                      to="/signin"
                    >
                      Đăng nhập
                    </Menu.Item>
                    <Menu.Item
                      icon={<Fingerprint size={14} />}
                      component={Link}
                      to="/signup"
                    >
                      Đăng ký
                    </Menu.Item>
                  </>
                )}
              </Menu>
            </Group>
          </Group>
          <div className={classes.bottomRow}>
            <div className={classes.categorySection}>
              <Popover
                opened={openedCategoryMenu}
                onClose={() => setOpenedCategoryMenu(false)}
                target={
                  <Button
                    onClick={() => setOpenedCategoryMenu((o) => !o)}
                    leftIcon={<List size={18} />}
                    radius={0}
                    size="md"
                    variant="subtle"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      color: theme.white,
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    DANH MỤC SẢN PHẨM
                  </Button>
                }
                width={widthHeaderStack}
                position="bottom"
                placement="start"
                radius="md"
                shadow="md"
              >
                <CategoryMenu setOpenedCategoryMenu={setOpenedCategoryMenu} />
              </Popover>
            </div>
            <div className={classes.navSection}>
              <Anchor component={Link} to="/" className={classes.navLink}>
                TRANG CHỦ
              </Anchor>
              <div className={classes.navDivider} />
              <Anchor component={Link} to="/all-categories" className={classes.navLink}>
                SẢN PHẨM
              </Anchor>
              <div className={classes.navDivider} />
              <Anchor component={Link} to="/" className={classes.navLink}>
                BÀI VIẾT
              </Anchor>
              <div className={classes.navDivider} />
              <Anchor component={Link} to="/" className={classes.navLink}>
                VỀ CHÚNG TÔI
              </Anchor>
              <div className={classes.navDivider} />
              <Anchor component={Link} to="/" className={classes.navLink}>
                LIÊN HỆ
              </Anchor>
            </div>
          </div>
        </Stack>
      </Container>
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
