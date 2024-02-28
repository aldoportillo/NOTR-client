import { Link } from 'react-router-dom'
import LoadingGif from '../assets/loading.gif'
import { CocktailData } from '../types/CocktailData'
import styled from 'styled-components'


interface CocktailProps {
    cocktailData: CocktailData[];
    loading: boolean;
}

export default function Cocktails({cocktailData, loading}: CocktailProps) {

    

    const renderCocktails = cocktailData?.map(cocktail => {
        const {name, _id, image} = cocktail
        return (
            <CocktailCard key={_id}>
                <Link to={`/cocktail/${_id}`} state={{ from: "cocktail", data: cocktail}}>
                    <h3>{name}</h3>
                    <img src={image.filePath} alt="" />
                </Link>
            </CocktailCard>
        )
    })
    
  return (
    <Wrapper>
        <h2>Cocktails</h2>
            {loading ?
            <img src={LoadingGif} className="loader" alt="loader"/> :
            <CocktailListContainer>
                {renderCocktails}
            </CocktailListContainer>}  
    </Wrapper>
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