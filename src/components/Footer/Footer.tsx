import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Footer() {
  return (
    <Wrapper>
        <div className='footer-rows'>
            <Link to="/help">How to navigate</Link>
            <a href="https://github.com/aldoportillo" target="_blank" rel="noreferrer">Follow me on Github</a>
        </div>
        <div className='footer-rows'>
            <a href="https://www.aldoportillo.com/" target="_blank" rel="noreferrer">Checkout my Portfolio</a>
            <p>Aldo Portillo &copy; {new Date().getFullYear()}</p> 
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`

  align-self: center;
  background-color: var(--header);
  width: 100vw;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  bottom:0;
  padding-top: 1rem;

.footer-rows{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3vw;
  padding-right: 3vw;
}

.footer-rows >a:link{
  color: #ffffff;
}

.footer-rows > a:visited{
  color: #ffffff;
}

.footer-rows > a:hover {
  color: var(--accent);
}

/* selected link */
.footer-rows > a:active {
  color: white;
}
`