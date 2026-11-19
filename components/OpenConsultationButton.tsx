'use client';

import React from 'react';
import { useConsultation } from '@/components/providers/ConsultationProvider';

interface OpenConsultationButtonProps {
  children: React.ReactNode;
  treatmentTitle?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const OpenConsultationButton: React.FC<OpenConsultationButtonProps> = ({
  children,
  treatmentTitle,
  className = '',
  style,
  onClick,
}) => {
  const { setOpen } = useConsultation();

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    setOpen(true, treatmentTitle);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
};
