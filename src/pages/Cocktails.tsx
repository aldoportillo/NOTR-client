import LoadingGif from '../assets/loading.gif'
import { CocktailData } from '../types/CocktailData'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useState } from 'react'
import Pagination from '../components/Pagination'

interface CocktailProps {
    cocktailData: CocktailData[];
    loading: boolean;
}

export default function Cocktails({ cocktailData, loading }: CocktailProps) {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredCocktails = cocktailData.filter(cocktail =>
        cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Wrapper>
                <Header>
                    <h2>Cocktails</h2>
                    <Input
                        type="text"
                        placeholder="Search cocktails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>Toggle Fridge</button>
                    <button>Toggle Recommendations</button>
                </Header> 
                {loading ? <img src={LoadingGif} className="loader" alt="loader" /> : (
                    <>
                        
                        <Pagination
                            totalItems={filteredCocktails.length}
                            searchTerm={searchTerm}
                        >{filteredCocktails}</Pagination>
                    </>
                )}
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
    align-self: flex-start;
`






const Input = styled.input`
  margin: 20px;
  width: 100%;
  font-size: 16px; 
  border: 1px solid #ccc; 
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  &:focus {
    outline: none;
    border-color: var(--accent); 
    box-shadow: 0 0 5px rgba(0,123,255,0.5);
  }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px;
    `