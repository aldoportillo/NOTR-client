import BartenderSvg from "../assets/bartender.svg"
import BartenderSvg2 from "../assets/bartender2.svg"
import Cheers from "../assets/cheers.svg"
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { colors } from "../styles/colors"
import { Helmet } from "react-helmet"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"

const features = [
  {
      name: "Arthur AI",
      link: "/nutrition",
      description: "Interact with Arthur, an AI mixologist that crafts cocktails not available in our database"
  },
  {
      name: "Barcode Scanner",
      link: "/profile",
      description: "Quickly add drinks to your list by scanning their barcode. Perfect for beer and wine lovers!"
  },
  {
      name: "MyFridge",
      link: "/profile",
      description: "Add spirits to your fridge and get cocktail recommendations based on the spirits you own."
  },
  {
      name: "BAC Insights",
      link: "/profile",
      description: "Stay informed about your alcohol consumption using our advanced Blood Alcohol Content (BAC) tracker"
  },
  {
      name: "Library of Distinctive Cocktails",
      link: "/cocktails",
      description: "From timeless classics to contemporary creations, explore a diverse collection of cocktails designed to inspire and delight."
  },
  {
      name: "Nutrition in Every Sip",
      link: "/nutrition",
      description: "Maintain your nutritional balance while enjoying your favorite libations with our Macronutrient Calculator"
  }
];


export default function Home () {

    const { auth } = useAuth();

    const fadeInUp = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const list = {
      visible: { opacity: 1 },
      hidden: { opacity: 0 }
  };

  const listItem = {
      visible: i => ({
          opacity: 1,
          transition: {
              delay: i * 0.3
          }
      }),
      hidden: { opacity: 0 }
  };

    return (
        <>
          <Wrapper>
                <motion.div className='hero' initial="hidden" animate="visible" variants={fadeInUp}>
                    <div className='hero-text'>
                        <motion.h2 className='orange-font' variants={fadeInUp}>Where Science Meets Mixology</motion.h2>
                        <motion.p variants={fadeInUp}>
                            Welcome to Neat on the Rocks, your passport to a new realm of cocktail enjoyment that blends health-conscious choices with irresistible flavors. For bartenders and cocktail aficionados who value both taste and well-being, we present an innovative platform that transforms the way you drink.
                        </motion.p>
                        {!auth.token && <Button to="/auth" whileHover={{ scale: 1.05 }}>Sign Up Now</Button>}
                    </div>
                    <motion.img src={BartenderSvg} alt="Bartender Mixing Drinks" variants={fadeInUp}/>
                </motion.div>
                
                <motion.h3 className='orange-font' variants={fadeInUp}>Crafting Cocktails, Redefining Enjoyment</motion.h3>
                <motion.p variants={fadeInUp}>
                    At Neat on the Rocks, we're not just raising the bar – we're crafting it. Explore a host of features tailored to enhance your mixology journey:
                </motion.p>

                <motion.ul initial="hidden" animate="visible" variants={list}>
                {features.map((feature, index) => (
                <motion.li key={index} custom={index} variants={listItem} initial="hidden" animate="visible">
                    <Link to={feature.link} className="orange-font">{feature.name}</Link>: {feature.description}
                </motion.li>
            ))}
                </motion.ul>

                <motion.div className='hero' variants={fadeInUp}>
                    <motion.img src={BartenderSvg2} alt="" variants={fadeInUp}/>
                    <div className='hero-text'>
                        <motion.h3 className='orange-font' variants={fadeInUp}>Prohibition and the FDA</motion.h3>
                        <motion.p variants={fadeInUp}>
                            In 1935, the Alcohol Administration Act (now the TTB) emerged, shaping the landscape of alcohol regulation post-Prohibition (1920-1935). Its primary goal was revenue generation, yet it also took charge of meticulous alcohol label oversight. A pivotal moment occurred in 1990, when the FDA mandated Nutrition Facts labels. However, alcohol's regulation by the TTB resulted in an exemption from this requirement. Solely displaying alcohol percentage became the norm. Efforts to introduce Nutrition Facts labels were made, such as by The Center for Science in the Public Interest. Yet, the TTB expressed concern that such labeling could misrepresent alcohol as nutritious. This narrative reflects the intricate interplay of regulations, health, and perception in alcohol labeling.
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div className='hero' variants={fadeInUp}>
                    <div className='hero-text'>
                        <motion.h3 className='orange-font' variants={fadeInUp}>Toast to a New Beginning</motion.h3>
                        <motion.p variants={fadeInUp}>
                            Embrace the art of mixology that harmonizes flavor, science, and well-being. Join Neat on the Rocks in celebrating the finer things in life.
                        </motion.p>

                        <motion.h3 className='orange-font' variants={fadeInUp}>Make a Difference Today</motion.h3>
                        <motion.p variants={fadeInUp}>
                            At Neat on the Rocks, we're dedicated to promoting responsible enjoyment and elevating the standards of mixology. If you share our vision, we invite you to be part of the journey. Your support will enable us to keep providing valuable resources and insights to cocktail enthusiasts around the world. Together, let's cultivate a culture of informed and mindful drinking that embraces both pleasure and well-being. Your contribution, no matter the size, fuels our mission. Join us in shaping the future of mixology. Click below to make a meaningful donation:
                        </motion.p>

                        <SecondaryButton to="https://pay.neatonthe.rocks">Donate</SecondaryButton>
                    </div>
                    <motion.img src={Cheers} alt="Celebration Cheers" variants={fadeInUp}/>
                </motion.div>
            </Wrapper>
          <Helmet>
            <title>Neat on the Rocks | Where Science Meets Mixology</title>
            <meta name="description" content="Welcome to Neat on the Rocks, your passport to a new realm of cocktail enjoyment that blends health-conscious choices with irresistible flavors. For bartenders and cocktail aficionados who value both taste and well-being, we present an innovative platform that transforms the way you drink." />
            <meta name="keywords" content="perfect, cocktail, alcohol, calories, ethanol, abv, nutrition, glassware, bar, bartender, vodka, gin, tequila, best tequila, instructions" />
            <meta property="og:image" content="https://res.cloudinary.com/dkhtrg1ts/image/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
            <meta name="twitter:image" content="https://res.cloudinary.com/dkhtrg1ts/image/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
          </Helmet>
        </>
    )
}

const Wrapper = styled(motion.div)`

    color: white;
    align-self: center;
    width: 80vw;

    .orange-font{
        color: ${colors.accent}; 
        text-decoration: none; /* Remove default underline */
        font-weight: bold; 
      
        &:hover, &:focus {
          text-decoration: underline;
          color: '#D87C30'; 
        }
      }
  
   .paragraph > .text-content > h2{
    font-size: 2rem;
    color: ${colors.accent};
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

const Button = styled(motion(Link))`
    background-color: ${colors.accent};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    margin-top: 20px;
    transition: background-color 0.3s;
  
    &:hover {
      background-color: #D87C30;
    }
  `

const SecondaryButton = styled(motion(Link))`

    background-color: ${colors.overlay};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    margin-top: 20px;
    transition: background-color 0.3s;
  
    &:hover {
      background-color: #D87C30;
    }
  `