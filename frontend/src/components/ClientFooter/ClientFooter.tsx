import React from 'react';
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Container,
  createStyles,
  Grid,
  Group,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
  BrandPinterest,
  BrandTwitter,
  BrandYoutube
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: theme.spacing.xl * 2,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: '#A48B77', // Dark brown
  },

  columnTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    color: theme.white,
    marginBottom: theme.spacing.sm,
    position: 'relative',
    paddingBottom: theme.spacing.xs,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 40,
      height: 3,
      background: `linear-gradient(90deg, ${theme.colors.blue[4]}, ${theme.colors.cyan[4]})`,
      borderRadius: theme.radius.sm,
    },
  },

  link: {
    color: theme.colors.gray[3],
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: theme.colors.cyan[4],
      transform: 'translateX(4px)',
      fontWeight: 500,
    },
  },

  companyName: {
    fontSize: theme.fontSizes.md,
    fontWeight: 700,
    color: theme.white,
    marginBottom: theme.spacing.xs,
  },

  contactText: {
    color: theme.colors.gray[3],
    lineHeight: 1.6,
  },

  socialIcon: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-3px) scale(1.1)',
    },
  },

  regulatoryBadge: {
    background: `linear-gradient(135deg, ${theme.colors.blue[6]}, ${theme.colors.cyan[6]})`,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.md,
    fontWeight: 600,
    boxShadow: theme.shadows.sm,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows.md,
    },
  },

  footerLinks: {
    [theme.fn.smallerThan('md')]: {
      marginTop: theme.spacing.xl,
    },
  },

  afterFooter: {
    marginTop: theme.spacing.xl * 2,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    // backgroundColor: '#3D2817', // Darker brown for copyright section
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },

  copyright: {
    color: theme.colors.gray[4],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },

  copyrightLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    maxWidth: 200,
  },
}));

function ClientFooter() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container size="xl">
        <Grid>
          {/* Cột 1: Giới thiệu */}
          <Grid.Col md={3}>
            <Stack spacing={theme.spacing.md}>
              <Text className={classes.columnTitle}>GIỚI THIỆU</Text>
              <Stack spacing={theme.spacing.sm}>
                <Text size="sm" className={classes.contactText} style={{ lineHeight: 1.7 }}>
                  Thế Giới Trà Đạo chuyên cung cấp ấm tử sa Nghi Hưng chính hãng và các trà cụ cao cấp, 
                  được tuyển chọn kỹ lưỡng để nâng tầm trải nghiệm thưởng trà của bạn.
                </Text>
                <Text size="sm" className={classes.contactText} style={{ lineHeight: 1.7 }}>
                  Mua sắm tại <Anchor href="https://phucanhduong.com" target="_blank" style={{ color: theme.colors.cyan[4], fontWeight: 600 }}>thegioitradao.com</Anchor>. Chúng tôi cam kết chất lượng, giao hàng tận nơi, 
                  cho phép kiểm tra hàng trước khi thanh toán và miễn phí đổi trả.
                </Text>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Cột 2: Danh mục sản phẩm */}
          <Grid.Col md={3}>
            <Stack spacing={theme.spacing.md}>
              <Text className={classes.columnTitle}>DANH MỤC SẢN PHẨM</Text>
              <Stack spacing={theme.spacing.xs}>
                <Anchor component={Link} to="/category/am-tu-sa-nghi-hung" size="sm" className={classes.link}>
                  Ấm tử sa Nghi Hưng
                </Anchor>
                <Anchor component={Link} to="/category/khay-tra-thuyen-tra" size="sm" className={classes.link}>
                  Khay trà, thuyền trà
                </Anchor>
                <Anchor component={Link} to="/category/chen-uong-tra" size="sm" className={classes.link}>
                  Chén uống trà
                </Anchor>
                <Anchor component={Link} to="/category/bo-am-tra" size="sm" className={classes.link}>
                  Bộ ấm trà
                </Anchor>
                <Anchor component={Link} to="/category/dung-cu-pha-tra" size="sm" className={classes.link}>
                  Dụng cụ pha trà
                </Anchor>
                <Anchor component={Link} to="/category/hu-dung-tra" size="sm" className={classes.link}>
                  Hũ đựng trà
                </Anchor>
                <Anchor component={Link} to="/category/trang-tri-ban-tra" size="sm" className={classes.link}>
                  Trang trí bàn trà
                </Anchor>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Cột 3: Quy định & Chính sách */}
          <Grid.Col md={3}>
            <Stack spacing={theme.spacing.md}>
              <Text className={classes.columnTitle}>QUY ĐỊNH & CHÍNH SÁCH</Text>
              <Stack spacing={theme.spacing.xs}>
                <Anchor component={Link} to="/" size="sm" className={classes.link}>
                  Điều khoản và quy định chung
                </Anchor>
                <Anchor component={Link} to="/" size="sm" className={classes.link}>
                  Chính sách bảo mật thông tin
                </Anchor>
                <Anchor component={Link} to="/" size="sm" className={classes.link}>
                  Phương thức thanh toán
                </Anchor>
                <Anchor component={Link} to="/" size="sm" className={classes.link}>
                  Chính sách vận chuyển và kiểm hàng
                </Anchor>
                <Anchor component={Link} to="/" size="sm" className={classes.link}>
                  Chính sách bảo hành và đổi trả
                </Anchor>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Cột 4: Về chúng tôi */}
          <Grid.Col md={3}>
            <Stack spacing={theme.spacing.md}>
              <Text className={classes.columnTitle}>VỀ CHÚNG TÔI</Text>
              <Stack spacing={theme.spacing.sm}>
                <Text className={classes.companyName}>THẾ GIỚI TRÀ ĐẠO</Text>
                <Stack spacing={theme.spacing.xs}>
                  <Text size="sm" className={classes.contactText}>
                    <strong>Địa chỉ:</strong> Số 5 ngõ 50 Lê Hiến Phủ, Phường Tứ Minh, TP Hải Phòng
                  </Text>
                  <Anchor 
                    href="https://maps.google.com" 
                    target="_blank" 
                    size="sm" 
                    style={{ color: theme.colors.cyan[4], fontWeight: 500, textDecoration: 'underline' }}
                  >
                    (Chỉ đường)
                  </Anchor>
                  <Text size="sm" className={classes.contactText}>
                    <strong>Email:</strong> <Anchor href="mailto:lienhe@phucanhduong.com" style={{ color: theme.colors.cyan[4] }}>lienhe@thegioitradao.com</Anchor>
                  </Text>
                  <Text size="sm" className={classes.contactText}>
                    <strong>Điện thoại/Zalo:</strong> <span style={{ color: theme.colors.cyan[4], fontWeight: 600 }}>0988.043.899 - 0889.018.999</span>
                  </Text>
                </Stack>
                <Group spacing="sm" mt="md">
                  <ActionIcon 
                    size="lg" 
                    radius="xl" 
                    variant="filled"
                    className={classes.socialIcon}
                    sx={{ 
                      backgroundColor: '#1877F2',
                      color: theme.white,
                      '&:hover': { 
                        backgroundColor: '#166FE5',
                        transform: 'translateY(-3px) scale(1.1)',
                      } 
                    }}
                  >
                    <BrandFacebook strokeWidth={1.5}/>
                  </ActionIcon>
                  <ActionIcon 
                    size="lg" 
                    radius="xl" 
                    variant="filled"
                    className={classes.socialIcon}
                    sx={{ 
                      background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                      color: theme.white,
                      '&:hover': { 
                        transform: 'translateY(-3px) scale(1.1)',
                      } 
                    }}
                  >
                    <BrandInstagram strokeWidth={1.5}/>
                  </ActionIcon>
                  <ActionIcon 
                    size="lg" 
                    radius="xl" 
                    variant="filled"
                    className={classes.socialIcon}
                    sx={{ 
                      backgroundColor: '#1DA1F2',
                      color: theme.white,
                      '&:hover': { 
                        backgroundColor: '#1a91da',
                        transform: 'translateY(-3px) scale(1.1)',
                      } 
                    }}
                  >
                    <BrandTwitter strokeWidth={1.5}/>
                  </ActionIcon>
                  <ActionIcon 
                    size="lg" 
                    radius="xl" 
                    variant="filled"
                    className={classes.socialIcon}
                    sx={{ 
                      backgroundColor: '#BD081C',
                      color: theme.white,
                      '&:hover': { 
                        backgroundColor: '#a00716',
                        transform: 'translateY(-3px) scale(1.1)',
                      } 
                    }}
                  >
                    <BrandPinterest strokeWidth={1.5}/>
                  </ActionIcon>
                  <ActionIcon 
                    size="lg" 
                    radius="xl" 
                    variant="filled"
                    className={classes.socialIcon}
                    sx={{ 
                      backgroundColor: '#0077B5',
                      color: theme.white,
                      '&:hover': { 
                        backgroundColor: '#006399',
                        transform: 'translateY(-3px) scale(1.1)',
                      } 
                    }}
                  >
                    <BrandLinkedin strokeWidth={1.5}/>
                  </ActionIcon>
                  <ActionIcon 
                    size="lg" 
                    radius="xl" 
                    variant="filled"
                    className={classes.socialIcon}
                    sx={{ 
                      backgroundColor: '#FF0000',
                      color: theme.white,
                      '&:hover': { 
                        backgroundColor: '#e60000',
                        transform: 'translateY(-3px) scale(1.1)',
                      } 
                    }}
                  >
                    <BrandYoutube strokeWidth={1.5}/>
                  </ActionIcon>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
        <Box className={classes.afterFooter}>
          <Box className={classes.copyrightLine} />
          <Text className={classes.copyright}>
            Bản quyền 2025 © Phucanhduong.com
          </Text>
          <Box className={classes.copyrightLine} />
        </Box>
      </Container>
    </footer>
  );
}

export default React.memo(ClientFooter);
