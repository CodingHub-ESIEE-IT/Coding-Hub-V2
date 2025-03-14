'use client';
import React from 'react';
import styled from 'styled-components';

const Button = ({
  buttonWidth = 'auto',
  text,
  onClick,
  margin = '0px',
}: {
  buttonWidth?: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  margin?: string;
}) => {
  return (
    <CustomButton $width={buttonWidth} onClick={onClick} $margin={margin}>
      {text}
    </CustomButton>
  );
};

const CustomButton = styled.button<{ $width: string; $margin: string }>`
  background-color: #717eff;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  margin: ${({ $margin }) => $margin};
  outline: none;
  border-radius: 8px;
  border: none;
  width: ${(props) => props.$width};

  &:hover {
    background-color: #5d5de4;
  }
`;

export default Button;
