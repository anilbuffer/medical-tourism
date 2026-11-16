'use client';

import React from 'react';
import { useConsultation } from '@/components/providers/AppProviders';

interface OpenConsultationButtonProps {
  children: React.ReactNode;
  treatmentTitle?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const OpenConsultationButton: React.FC<OpenConsultationButtonProps> = ({
  children,
  treatmentTitle,
  className = '',
  style,
}) => {
  const { openConsultation } = useConsultation();

  return (
    <button
      type="button"
      onClick={() => openConsultation(treatmentTitle)}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
};

