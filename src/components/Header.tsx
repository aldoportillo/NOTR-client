import { Link } from 'react-router-dom'
import NavMenu from './NavMenu'
import { Spin as Hamburger } from 'hamburger-react'

export default function Header ({setOpenNav, openNav, windowSize}) {
    return (
        <div className='header'>
            <div className='top-nav'>
            <div className='title'>
                <img require src={require('../assets/logo.png')} alt=""/> 
                <Link to="/"><h1>Neat on the Rocks</h1></Link>
            </div>

            {windowSize > 1025 ? <NavMenu /> : <div className='hamburger'><Hamburger toggled={openNav} toggle={setOpenNav} size={25} direction="left" duration={0.4} color="white" easing="ease-in"/></div>}
            </div>
            {/* <div className='dropdown-nav'>
                {openNav && windowSize < 1025 && <NavMenu />}
            </div> */}
        </div>
        
        

        
    )
}