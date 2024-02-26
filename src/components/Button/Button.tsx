import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'; 
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
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

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) => {
  const styles = SIZES[size];

  let StyledButton;
  if (variant === "primary") {
    StyledButton = PrimaryButton;
  } else if (variant === "secondary") {
    StyledButton = SecondaryButton;
  } else if (variant === "success") {
    StyledButton = SuccessButton;
  } else if (variant === "danger") {
    StyledButton = DangerButton;
  } else {
    StyledButton = PrimaryButton;
  }

  return <StyledButton {...styles}>{children}</StyledButton>;
};

const ButtonBase = styled.button<{ borderRadius: string; fontSize: string; padding: string }>`
  height: 3em;
  border-radius: ${({ borderRadius }) => borderRadius};
  font-size: ${({ fontSize }) => fontSize};
  color: #ffffff;
  font-family: inherit;
  font-weight: 500;
  padding: ${({ padding }) => padding};
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: hsl(18,85%,70%);
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

export default Button;