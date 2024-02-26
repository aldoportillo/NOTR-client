import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

type ButtonProps = {
    variant: 'primary' | 'secondary' | 'success' | 'danger';
    children: React.ReactNode;
    size: 'small' | 'medium' | 'large';
    href: any
};

const Button: React.FC<ButtonProps> = ({ variant, children, size, href}) => {

    return (
        <Wrapper to={href} as={href ? Link : 'button'}>
            {children}
        </Wrapper>
    );
};

const Wrapper = styled.button`
  height: 3em;
  border-radius: 1vh;
  font-size: 17px;
  color: #ffffff;
  font-family: inherit;
  font-weight: 500;

  background-color: ${props => props.variant === "primary" ? "#f49a73da" : "black"};

`



export default Button;