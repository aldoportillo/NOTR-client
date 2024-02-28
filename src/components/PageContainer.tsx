import Footer from './Footer/Footer'
import Header from './Header/Header'
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
  
    const [opennav, setOpennav] = useState(false)
  
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
      if (opennav) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [opennav]);
    
    useEffect(() => {
      setOpennav(false)
    },[location])
  
    return (
      <Wrapper>
          <Header setOpennav={setOpennav} opennav={opennav} windowSize={windowSize}/>
          <Main> 
            {children}
            <SlidingNav opennav={opennav} />
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
  min-height: 100vh;
`

const Main = styled.main`
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  width: 80vw;
  flex: 1;

  $:first-child {
    flex: 1;
    width: 100vw;
  }
`