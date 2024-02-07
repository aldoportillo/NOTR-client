import Footer from './Footer'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import SlidingNav from './SlidingNav'
import { useState, useEffect } from 'react'

const getWindowSize = () => {
    const {innerWidth} = window;
    return innerWidth
}

export default function PageContainer({children}) {

    const location  = useLocation()
  
    const [openNav, setOpenNav] = useState(false)
    const [navWidth, setNavWidth] = useState(0)
  
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
      if (openNav){
        setNavWidth(60)
      } else {
        setNavWidth(0)
      }
    }, [openNav])
    useEffect(() => {
      setNavWidth(0)
      setOpenNav(false)
    },[location])
  
    return (
      <>
          <Header setOpenNav={setOpenNav} setNavWidth={setNavWidth} openNav={openNav} windowSize={windowSize}/>
          <main>
            {children}
            <SlidingNav navWidth={navWidth} />
          </main>
          <Footer />
      </>
    )
  }
  