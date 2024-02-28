import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function DesktopNav() {
  return (
    <Wrapper>
                <Link to="/nutrition">Nutrition</Link>
                <Link to="/myBAC">My BAC</Link>
                <Link to="/dilution">Dilution</Link>
                <Link to="/cocktails">Cocktails</Link>
                {/* <Link to="/shop">Shop</Link>  */}
                {/* <Link to="/drinks-consumed">Drinks</Link> */}
                <a href="https://pay.neatonthe.rocks" target='_blank' rel="noreferrer">Donate</a>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
display: flex;
justify-content: space-around;
gap: 10px;
align-items: center;
color: antiquewhite;
`