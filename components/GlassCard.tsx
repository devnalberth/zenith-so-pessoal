import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'glass' | 'frosted' | 'liquid';
  hover?: boolean;
  shimmer?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  variant = 'glass',
  hover = true,
  shimmer = false,
}) => {
  const variantClasses = {
    glass: 'glass-card',
    frosted: 'frosted-glass',
    liquid: 'liquid-glass',
  };

  const hoverClass = hover ? 'hover-lift' : '';
  const shimmerClass = shimmer ? 'shimmer' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      onClick={onClick} 
      className={`
        ${variantClasses[variant]} 
        ${hoverClass}
        ${shimmerClass}
        ${cursorClass}
        rounded-3xl 
        transition-smooth
        ${className}
      `}
    >
      {children}
    </div>
  );
};
