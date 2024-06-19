import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

export default function DesktopNav() {

  const { auth } = useAuth();
  const isLoggedIn = auth.token !== null;

  return (
    <Wrapper>
      <StyledNavLink to="/cocktails">Cocktails</StyledNavLink>
      <StyledNavLink to="/nutrition">Nutrition</StyledNavLink>
      <ExternalLink href="https://pay.neatonthe.rocks" target='_blank' rel="noopener noreferrer">Donate</ExternalLink>
      {!isLoggedIn && <StyledNavLink to="/auth">Log In</StyledNavLink>}
      {isLoggedIn && <StyledNavLink to="/profile">Profile</StyledNavLink>}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  align-items: center;
  background-color: var(--header);
  padding: 10px 0;
`;

const StyledNavLink = styled(NavLink)`
  color: antiquewhite;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  transition: color 0.3s, background-color 0.3s;

  &.active {
    color: var(--background);
    background-color: var(--accent);
  }

  &:hover {
    color: var(--accent);
    background-color: var(--overlay);
  }
`;

const ExternalLink = styled.a`
  color: antiquewhite;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: var(--accent);
    background-color: var(--overlay);
  }
`;
