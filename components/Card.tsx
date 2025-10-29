import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'light' | 'strong' | 'liquid';
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, variant = 'default' }) => {
  const variantClasses = {
    default: 'glass-card',
    light: 'glass-light',
    strong: 'glass-strong',
    liquid: 'liquid-glass',
  };

  return (
    <div 
      onClick={onClick} 
      className={`${variantClasses[variant]} rounded-3xl transition-smooth hover-lift ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </div>
  );
};