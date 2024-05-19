import { Link } from 'react-router-dom'
import LoadingGif from '../assets/loading.gif'
import { CocktailData } from '../types/CocktailData'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

interface CocktailProps {
    cocktailData: CocktailData[];
    loading: boolean;
}

export default function Cocktails({cocktailData, loading}: CocktailProps) {

    

    const renderCocktails = cocktailData?.map(cocktail => {
        const {id, name, glass, slug, image_url} = cocktail
        return (
            <CocktailCard key={id}>
                <Link to={`/cocktail/${slug}`} state={{ from: "cocktail", data: cocktail}}>
                    <h3>{name}</h3>
                    <img src={image_url} alt={`${name} inside a ${glass} glass`} />
                </Link>
            </CocktailCard>
        )
    })
    
  return (
    <>
        <Wrapper>
            <h2>Cocktails</h2>
                {loading ?
                <img src={LoadingGif} className="loader" alt="loader"/> :
                <CocktailListContainer>
                    {renderCocktails}
                </CocktailListContainer>}  
        </Wrapper>
        <Helmet>
            <title>Cocktails | Neat on the Rocks</title>
            <meta name="description" content="Welcome to Neat on the Rocks, your passport to a new realm of cocktail enjoyment that blends health-conscious choices with irresistible flavors. For bartenders and cocktail aficionados who value both taste and well-being, we present an innovative platform that transforms the way you drink." />
            <meta name="keywords" content="alcohol, calories, ethanol, abv, nutrition, glassware, bar, bartender, vodka, gin, tequila, best tequila, instructions" />
            <meta property="og:imageUrl" content="https://res.cloudinary.com/dkhtrg1ts/imageUrl/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
            <meta name="twitter:imageUrl" content="https://res.cloudinary.com/dkhtrg1ts/imageUrl/upload/v1702322801/NeatontheRocks/Cocktails/photo-1470337458703-46ad1756a187_xcfnzd.avif" />
      </Helmet>
    </>
  )
}

const Wrapper = styled.div`
    display: flex;
    align-self: center;
    flex-direction: column;
    align-items: center;
`

const CocktailListContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;

    @media only screen and (min-width:1025px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
`


const CocktailCard = styled.a`
    a {
        width: 80vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #838383;
        border-radius: 1vh;
        margin: 5px;
        
    }
  
    a > img{
        width: 100%;
        border-radius: 1vh;
    }

    @media only screen and (min-width:1025px) {
        a{
          width: 25vw;
        }
        
        a >img{
          width: 25vw;
          height: 18vw;
        }
      }
`