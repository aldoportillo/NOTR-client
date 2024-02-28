import { Link } from 'react-router-dom'
import DesktopNav from '../DesktopNav'
import { Spin as Hamburger } from 'hamburger-react'
import React from 'react'
import Logo from "../../assets/notr-logo-medium-transparent.png"
import styled from 'styled-components'

interface HeaderProps {
    setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
    openNav: boolean;
    windowSize: number;
}

const Header: React.FC<HeaderProps> = ({ setOpenNav, openNav, windowSize }) => {
    return (
        <Wrapper>
            <div className='top-nav'>
              <div className='title'>
                  <img src={Logo} alt="logo"/> 
                  <Link to="/"><h1>Neat on the Rocks</h1></Link>
              </div>
              {windowSize > 1025 
              ? <DesktopNav /> 
              : <div className='hamburger'>
                  <Hamburger toggled={openNav} toggle={setOpenNav} size={25} direction="left" duration={0.4} color="white" easing="ease-in"/>
                </div>}
            </div>
        </Wrapper>
    )
}

export default Header

const Wrapper = styled.header`
width: 100vw;
display: flex;
align-items: center;
flex-direction: column;

.top-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 10vh;
    background-color: var(--header);
    width: 100vw;
    padding-left: 2vw;
    padding-right: 2vw;
  }
  .top-nav > .title{
    display: flex;
    align-items: center;
    gap: 2vw;
    font-size: .8rem;
  }
  .top-nav > div > img {
    max-height: 3rem;
  }
  
  .dropdown-nav > nav {
    padding-top: 1vh;
  }
  .dropdown-nav > nav > a{
    border: 1px solid rgb(147, 147, 147);
    width: 30vw;
    text-align: center;
    border-radius: 1vh;
    background-color: #444546;
  }
  
  h1, h3{
    color: #ffffff;
  }
  
  @media only screen and (min-width:1025px) {
  
    .top-nav > .title{
      gap: 1vw;
      font-size: 1.2rem;
    }
    .top-nav > div > img {
      max-height: 5rem;
    }
    .top-nav > nav > a {
      color: white;
      transition: all 0.5s ease;
    }
  
    .top-nav > nav > a:hover{
      color: var(--accent)
    }
  
  }
  `