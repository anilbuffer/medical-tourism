import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  /**
   * - 'navbar': Uses app-logo-two.svg (White logo for dark/translucent navbar)
   * - 'footer': Uses app-logo-one.svg (Color/deep teal logo for light footer)
   */
  variant?: 'navbar' | 'footer';
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  className = '',
  style,
  priority = false,
}) => {
  // Logo 2 for navbar, Logo 1 for footer
  const logoSrc = variant === 'navbar' ? '/app-logo-two.svg' : '/app-logo-one.svg';

  return (
    <div
      style={style}
      className={`relative inline-flex items-center shrink-0 ${className}`}
    >
      <Image
        src={logoSrc}
        alt="Your Medicare Trip"
        width={1104}
        height={475}
        priority={priority}
        className="w-full h-auto object-contain block"
      />
    </div>
  );
};
