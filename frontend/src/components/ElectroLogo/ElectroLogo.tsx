import React from 'react';
// import { useMantineTheme } from '@mantine/core';

interface ElectroLogoProps {
  width?: number;
}

function ElectroLogo({ width = 100 }: ElectroLogoProps) {
  const imageUrl =
    'https://static.vecteezy.com/system/resources/previews/043/212/792/non_2x/a-logo-featuring-a-house-in-the-center-representing-a-tea-shop-with-a-classic-and-elegant-design-an-elegant-and-timeless-symbol-representing-high-quality-home-goods-free-vector.jpg';

  return <img src={imageUrl} width={width} alt='PhucAnhDuong Logo' style={{ marginTop: '50px' }} />;
}

export default ElectroLogo;
