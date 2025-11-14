import React from 'react';

interface ElectroLogoProps {
  width?: number;
}

function ElectroLogo({ width = 100 }: ElectroLogoProps) {
  return (
    <img 
      src="/images/logo.png" 
      width={width} 
      alt="Thế Giới Trà Đạo Logo" 
      className="object-contain"
    />
  );
}

export default ElectroLogo;
