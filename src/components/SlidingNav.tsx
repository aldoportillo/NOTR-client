import { Link } from 'react-router-dom'

interface SlidingNavProps {
  navWidth: number;
}

const SlidingNav: React.FC<SlidingNavProps> = ({ navWidth }) => {
  return (
    <nav className='sliding-nav' style={{ width: `${navWidth}vw` }}>
      <Link to="/nutrition">Nutrition</Link>
      <Link to="/myBAC">My BAC</Link>
      <Link to="/dilution">Dilution</Link>
      <Link to="/cocktails">Cocktails</Link>
      {/* <Link to="/shop">Shop</Link> */}
      {/* <Link to="/drinks-consumed">Drinks</Link> */}
      <a href="https://pay.neatonthe.rocks" target='_blank' rel="noreferrer">Donate</a>
    </nav>
  );
}

export default SlidingNav;
