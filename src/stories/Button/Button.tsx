//import React from 'react';
// import './button.css';
import styled from 'styled-components';
import { Success } from './Button.stories';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'; 
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

const STYLES = {
  primary: {
    backgroundColor: "#CF5D00" 
  },
  secondary: {
    backgroundColor: "#6c757d" 
  }
}

const SIZES = {
  small: {
    "--borderRadius": 2 + "px",
    "--fontSize": 16 / 16 + "rem",
    "--padding": "6px 12px"
  },
  medium: {
    "--borderRadius": 2 + "px",
    "--fontSize": 18 / 16 + "rem",
    "--padding": "14px 20px"
  },
  large: {
    "--borderRadius": 4 + "px",
    "--fontSize": 21 / 16 + "rem",
    "--padding": "18px 32px"
  }
};

export const Button = ({
  variant = 'primary',
  size = 'medium',
  label,
  ...props
}: ButtonProps) => {

  const styles = SIZES[size];

  let Component;
  if (variant === "primary") {
    Component = PrimaryButton;
  } else if (variant === "secondary") {
    Component = SecondaryButton;
  } else if (variant === "success") {
    Component = SuccessButton;
  } else if (variant === "danger") {
    Component = DangerButton;
  } else {
    Component = PrimaryButton;
  }

  return <Component style={styles}>{label}</Component>;
  
};

const ButtonBase = styled.button`
  height: 3em;
  border-radius: 1vh;
  font-size: 17px;
  color: #ffffff;
  font-family: inherit;
  font-weight: 500;

  background-color: var(--background-color)
  }}
`

const PrimaryButton = styled(ButtonBase)`
  background-color: #CF5D00;
`

const SecondaryButton = styled(ButtonBase)`
  background-color: #6c757d;
`

const SuccessButton = styled(ButtonBase)`
  background-color: #198754;
`

const DangerButton = styled(ButtonBase)` 
  background-color: #dc3545;
`

