'use client';
import React from 'react';
import './Button.css';

type ButtonProps = {
  buttonWidth?: string;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize?: string;
  margin?: string;
  padding?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  buttonWidth = 'fit-content',
  text,
  onClick = () => { },
  fontSize = '1rem',
  margin = '0px',
  padding = '16px 32px',
  type = 'button',
  disabled = false,
  textAlign = 'center',
  children,
}) => {
  return (
    <button
      className="custom-button"
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        width: buttonWidth,
        margin: margin,
        fontSize: fontSize,
        padding: padding,
        textAlign: textAlign,
      }}
    >
      {text ?? children}
    </button>
  );
};

export default Button;
