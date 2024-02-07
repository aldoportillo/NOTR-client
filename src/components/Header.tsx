import { Link } from 'react-router-dom'
import NavMenu from './NavMenu'
import { Spin as Hamburger } from 'hamburger-react'
import React from 'react'
import Logo from "../assets/logo.png"

interface HeaderProps {
    setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
    setNavWidth: (width: number) => void;
    openNav: boolean;
    windowSize: number;
}

const Header: React.FC<HeaderProps> = ({ setOpenNav, openNav, windowSize }) => {
    return (
        <div className='header'>
            <div className='top-nav'>
            <div className='title'>
                <img src={Logo} alt="logo"/> 
                <Link to="/"><h1>Neat on the Rocks</h1></Link>
            </div>

            {windowSize > 1025 ? <NavMenu /> : <div className='hamburger'><Hamburger toggled={openNav} toggle={setOpenNav} size={25} direction="left" duration={0.4} color="white" easing="ease-in"/></div>}
            </div>
        </div>
    )
}

export default Header