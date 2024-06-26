import React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  to?: LinkProps['to'];
}

const SIZES = {
  small: {
    borderRadius: '2px',
    fontSize: '1rem',
    padding: '6px 12px'
  },
  medium: {
    borderRadius: '4px',
    fontSize: '1.125rem',
    padding: '14px 20px'
  },
  large: {
    borderRadius: '8px',
    fontSize: '1.3125rem',
    padding: '18px 32px'
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  to
}) => {
  const styles = SIZES[size];

  let Component = PrimaryButton;
  if (variant === 'secondary') {
    Component = SecondaryButton;
  } else if (variant === 'success') {
    Component = SuccessButton;
  } else if (variant === 'danger') {
    Component = DangerButton;
  }

  if (to) {
    if (variant === 'primary') {
      return <PrimaryStyledLink to={to} {...styles}>{children}</PrimaryStyledLink>;
    } else {
      return <SecondaryStyledLink to={to} {...styles}>{children}</SecondaryStyledLink>;
    }
  }

  return <Component onClick={onClick} {...styles}>{children}</Component>;
};

const ButtonBase = styled.button<{ borderRadius: string; fontSize: string; padding: string }>`
  height: 3em;
  border-radius: ${({ borderRadius }) => borderRadius};
  font-size: ${({ fontSize }) => fontSize};
  color: #ffffff;
  font-family: inherit;
  font-weight: 500;
  padding: ${({ padding }) => padding};
  cursor: pointer;
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: hsl(18,85%,70%);
  color: #333333;
`;

const SecondaryButton = styled(ButtonBase)`
  background-color: #6c757d;
`;

const SuccessButton = styled(ButtonBase)`
  background-color: #198754;
`;

const DangerButton = styled(ButtonBase)`
  background-color: #dc3545;
`;

const PrimaryStyledLink = styled(PrimaryButton).attrs({ as: Link })`
  text-decoration: none;
  &:hover, &:focus {
    text-decoration: underline;s
  }
`;

const SecondaryStyledLink = styled(SecondaryButton).attrs({ as: Link })`
`;

export default Button;
