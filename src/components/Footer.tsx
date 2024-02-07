import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='footer-rows'>
            <Link to="/help">How to navigate</Link>
            <a href="https://github.com/aldoportillo" target="_blank" rel="noreferrer">Follow me on Github</a>
        </div>
        <div className='footer-rows'>
            <a href="https://www.aldoportillo.com/" target="_blank" rel="noreferrer">Checkout my Portfolio</a>
            <p>Aldo Portillo &copy; 2023</p> 
        </div>
    </div>
  )
}