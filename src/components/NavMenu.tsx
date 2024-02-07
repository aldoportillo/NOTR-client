import { Link } from 'react-router-dom'

export default function NavMenu() {
  return (
    <nav className='desktop-nav'>
                <Link to="/nutrition">Nutrition</Link>
                <Link to="/myBAC">My BAC</Link>
                <Link to="/dilution">Dilution</Link>
                <Link to="/cocktails">Cocktails</Link>
                {/* <Link to="/shop">Shop</Link>  */}
                <Link to="/drinks-consumed">Drinks</Link>
                <a href="https://pay.neatonthe.rocks" target='_blank' rel="noreferrer">Donate</a>
    </nav>
  )
}