import Footer from './Footer'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import SlidingNav from './SlidingNav'
import { useState, useEffect, ReactNode } from 'react'
import styled from 'styled-components'

const getWindowSize = () => {
    const {innerWidth} = window;
    return innerWidth
}

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({children}: PageContainerProps) {

    const location  = useLocation()
  
    const [openNav, setOpenNav] = useState(false)
  
    const [windowSize, setWindowSize] = useState(getWindowSize())
  
    useEffect(() => {
      function handleResize() {
        setWindowSize(getWindowSize())
      }
  
      window.addEventListener('resize', handleResize)
  
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])
  
    useEffect(() => {
      if (openNav) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [openNav]);
    
    useEffect(() => {
      setOpenNav(false)
    },[location])
  
    return (
      <Wrapper>
          <Header setOpenNav={setOpenNav} openNav={openNav} windowSize={windowSize}/>
          <Main>
            {children}
            <SlidingNav openNav={openNav} />
          </Main>
          <Footer />
      </Wrapper>
    )
  }
  
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  
`

const Main = styled.main`
  display: flex;
  position: relative;
  overflow: hidden;

  $:first-child {
    flex: 1;
    width: 100vw;
  }
`