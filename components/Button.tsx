import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-8 transition-all duration-300 font-medium tracking-widest text-sm uppercase flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#d4af37] text-black hover:bg-white hover:text-black",
    secondary: "bg-white text-black hover:bg-[#d4af37]",
    outline: "border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
