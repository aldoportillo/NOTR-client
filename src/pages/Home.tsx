import BartenderSvg from "../assets/bartender.svg"
import BartenderSvg2 from "../assets/bartender2.svg"
import Cheers from "../assets/cheers.svg"
import { Link } from 'react-router-dom'
import Button from "../components/Button/Button"
import styled from "styled-components"
import { COLORS } from "../styles/COLORS"

export default function Home () {
    return (
        <Wrapper>
            <div className='hero'>
                <div className='hero-text'>
                    <h2 className='orange-font'>Where Science Meets Mixology</h2>
                    <p>Welcome to Neat on the Rocks, your passport to a new realm of cocktail enjoyment that blends health-conscious choices with irresistible flavors. For bartenders and cocktail aficionados who value both taste and well-being, we present an innovative platform that transforms the way you drink.</p>
                </div>
                <img src={BartenderSvg} alt=""/>
            </div>
            
            <h3 className='orange-font'>Crafting Cocktails, Redefining Enjoyment</h3>
            <p>At Neat on the Rocks, we're not just raising the bar – we're crafting it. Explore a host of features tailored to enhance your mixology journey:</p>
            <ul>
                <li><b>BAC Insights: </b>Stay informed about your alcohol consumption using our advanced <Link to="/myBAC" className='orange-font'>Blood Alcohol Content (BAC) tracker</Link>. Immerse yourself in the art of responsible drinking.</li>
                <li><b>Nutrition in Every Sip: </b>Maintain your nutritional balance while enjoying your favorite libations. Our <Link to="/nutrition" className='orange-font'>Macronutrient Calculator</Link> empowers you to make informed choices.</li>
                <li><b>Perfect Mix, Every Time: </b>Unleash your inner mixologist with confidence. Our <Link to="/dilution" className='orange-font'>Perfect Cocktail Calculator</Link> ensures harmonious blends that tantalize your taste buds.</li>
                <li><b>Library of Distinctive Cocktails: </b>From timeless classics to contemporary creations, explore a diverse <Link to="/dilution" className='orange-font'>collection of cocktails</Link> designed to inspire and delight.</li>
                <li><b>Sourced for Excellence: </b>Elevate your creations with premium bar tools sourced for their exceptional quality. Your cocktails deserve nothing but the best.</li>
            </ul>

            <div className='hero'>
                <img src={BartenderSvg2} alt=""/>
                <div className='hero-text'>
                    <h3 className='orange-font'>Prohibition and the FDA</h3>
                    <p>In 1935, the Alcohol Administration Act (now the TTB) emerged, shaping the landscape of alcohol regulation post-Prohibition (1920-1935). Its primary goal was revenue generation, yet it also took charge of meticulous alcohol label oversight. A pivotal moment occurred in 1990, when the FDA mandated Nutrition Facts labels. However, alcohol's regulation by the TTB resulted in an exemption from this requirement. Solely displaying alcohol percentage became the norm. Efforts to introduce Nutrition Facts labels were made, such as by The Center for Science in the Public Interest. Yet, the TTB expressed concern that such labeling could misrepresent alcohol as nutritious. This narrative reflects the intricate interplay of regulations, health, and perception in alcohol labeling.</p>
                </div>
            </div>

            <div className='hero'>
                <div className='hero-text'>
                    <h3 className='orange-font'>Toast to a New Beginning</h3>
                    <p>Embrace the art of mixology that harmonizes flavor, science, and well-being. Join Neat on the Rocks in celebrating the finer things in life.</p>

                    <h3 className='orange-font'>Make a Difference Today</h3>
                    <p>At Neat on the Rocks, we're dedicated to promoting responsible enjoyment and elevating the standards of mixology. If you share our vision, we invite you to be part of the journey. Your support will enable us to keep providing valuable resources and insights to cocktail enthusiasts around the world. Together, let's cultivate a culture of informed and mindful drinking that embraces both pleasure and well-being. Your contribution, no matter the size, fuels our mission. Join us in shaping the future of mixology. Click below to make a meaningful donation:</p>

                    <Button to="https://pay.neatonthe.rocks" variant="primary" size="medium">Donate</Button>
                </div>
                <img src={Cheers} alt=""/>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`

    color: white;
    align-self: center;
    width: 80vw;

    .orange-font{
        color: ${COLORS.accent};
      }
  
   .paragraph > .text-content > h2{
    font-size: 2rem;
    color: ${COLORS.accent};
  }
  
   .paragraph > .text-content > p{
    font-size: 1.2rem;
  }
  
   .paragraph >img{
    width: 80vw;
  }
  
  @media only screen and (min-width:1025px) {

      padding-top: 3vw;;

    .paragraph{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .paragraph >img{
      width: 35vw;
    }
  
    .paragraph > .text-content {
      width: 35vw;
    }
  
  }
`