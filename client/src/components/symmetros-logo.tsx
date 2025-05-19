import React from 'react';

interface SymmetrosLogoProps {
  className?: string;
  size?: number;
}

export const SymmetrosLogo: React.FC<SymmetrosLogoProps> = ({ className, size = 40 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="8" fill="url(#symmetros_gradient)" />
      <path
        d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 12C24.418 12 28 15.582 28 20C28 24.418 24.418 28 20 28C15.582 28 12 24.418 12 20C12 15.582 15.582 12 20 12Z"
        fill="white"
      />
      <path
        d="M20 13C16.134 13 13 16.134 13 20C13 23.866 16.134 27 20 27C23.866 27 27 23.866 27 20C27 16.134 23.866 13 20 13ZM19 18C17.895 18 17 18.895 17 20C17 21.105 17.895 22 19 22C20.105 22 21 21.105 21 20C21 18.895 20.105 18 19 18ZM23 15C21.895 15 21 15.895 21 17C21 18.105 21.895 19 23 19C24.105 19 25 18.105 25 17C25 15.895 24.105 15 23 15Z"
        fill="#5CEBDF"
      />
      <defs>
        <linearGradient id="symmetros_gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#9333EA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SymmetrosLogo; 