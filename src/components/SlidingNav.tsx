import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface SlidingNavProps {
  opennav: boolean;
}

const SlidingNav: React.FC<SlidingNavProps> = ({ opennav }) => {
  return (
    <Wrapper className='sliding-nav' opennav={opennav}>
      <Link to="/nutrition">Nutrition</Link>
      <Link to="/myBAC">My BAC</Link>
      <Link to="/dilution">Dilution</Link>
      <Link to="/cocktails">Cocktails</Link>
      {/* <Link to="/shop">Shop</Link> */}
      {/* <Link to="/drinks-consumed">Drinks</Link> */}
      <a href="https://pay.neatonthe.rocks" target='_blank' rel="noreferrer">Donate</a>
    </Wrapper>
  );
}

const Wrapper = styled.nav<{opennav: boolean}>`
position: fixed;
top: 0;
right: ${({ opennav }) => (opennav ? '0' : '-100%')};
width: 250px;
height: 100%;
background-color: var(--header);
transition: 0.5s; 
display: flex;
flex-direction: column;
padding: 20px;

/*oooo*/
  align-items: flex-end;
  font-size: 2rem;
  gap: 2vh;
  z-index: 1; 
  padding-top: 50px;
  overflow-x: hidden; /* Disable horizontal scroll */


  a{
  color: white;
  padding-right: 5vw;
}

 a:active{
  color: rgb(195, 195, 195);
}
`;

export default SlidingNav;
