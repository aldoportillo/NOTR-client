import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

interface SlidingNavProps {
  opennav: boolean;
}

const SlidingNav: React.FC<SlidingNavProps> = ({ opennav }) => {

  const { auth } = useAuth();
  const isLoggedIn = auth.token !== null;

  return (
    <Wrapper opennav={opennav}>
      <StyledNavLink to="/cocktails">Cocktails</StyledNavLink>
      <StyledNavLink to="/nutrition">Nutrition</StyledNavLink>
      <StyledNavLink to="/dilution">Dilution</StyledNavLink>
      <ExternalLink href="https://pay.neatonthe.rocks" target='_blank' rel="noreferrer">Donate</ExternalLink>
      {!isLoggedIn && <StyledNavLink to="/auth">Log In</StyledNavLink>}
      {isLoggedIn && <StyledNavLink to="/profile">Profile</StyledNavLink>}
    </Wrapper>
  );
}

const Wrapper = styled.nav<{ opennav: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ opennav }) => (opennav ? '0' : '-100%')};
  width: 250px;
  height: 100%;
  background-color: var(--header);
  transition: right 0.5s; 
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: flex-start;
  font-size: 2rem;
  gap: 2vh;
  z-index:15; 
  padding-top: 50px;
  overflow-x: hidden; /* Disable horizontal scroll */
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  transition: color 0.3s;

  &.active {
    color: var(--accent);
  }

  &:hover {
    color: var(--accent);
  }
`;

const ExternalLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  transition: color 0.3s;

  &:hover {
    color: var(--accent);
  }

  &:active {
    color: rgb(195, 195, 195);
  }
`;

export default SlidingNav;
