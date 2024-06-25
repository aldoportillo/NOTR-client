import LoadingGif from '../assets/loading.gif'
import { CocktailData } from '../types/CocktailData'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

interface CocktailProps {
    cocktailData: CocktailData[];
    loading: boolean;
}

export default function Cocktails({ cocktailData, loading }: CocktailProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [cocktails, setCocktails] = useState(cocktailData);
    const { auth } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [viewOption, setViewOption] = useState('All Cocktails');

    const fetchCocktails = async (fridgeView) => {
        const endpoint = fridgeView ? '/cocktails/my-fridge' : '/cocktails/my-fridge/recommendations';
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            setCocktails(response.data);
        } catch (error) {
            toast.error('Failed to fetch cocktails');
            console.error('Failed to fetch cocktails:', error);
        }
    };

    const filteredCocktails = cocktails.filter(cocktail =>
        cocktail && cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDefault = () => {
        setDropdownOpen(false);
        setCocktails(cocktailData);
        setViewOption('All Cocktails');
    }

    const toggleFridgeView = () => {
        setDropdownOpen(false);

        fetchCocktails(true);
        setViewOption('Fridge Cocktails');
    }

    const toggleRecommendations = () => {
        setDropdownOpen(false);
        fetchCocktails(false);
        setViewOption('Recommendations');
    }


    useEffect(() => {
        setCocktails(cocktailData);
    }, [cocktailData])

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
                    <DropdownContainer>
                        <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>{viewOption}</DropdownButton>
                        <DropdownContent className={dropdownOpen ? 'show' : ''}>
                            <DropdownItem as="button" onClick={toggleDefault}>All Cocktails</DropdownItem>
                            <DropdownItem as="button" onClick={toggleFridgeView}>Fridge Cocktails</DropdownItem>
                            <DropdownItem as="button" onClick={toggleRecommendations}>Recommendations</DropdownItem>
                        </DropdownContent>
                    </DropdownContainer>

                </Header>
                {loading ? <img src={LoadingGif} className="loader" alt="loader" /> : (
                    <>

                        <Pagination
                            totalItems={filteredCocktails.length}
                            searchTerm={searchTerm}
                            cocktailData={cocktailData}
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
    

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: var(--header); // Dark grey
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 200px;
  text-align: left;
  border-radius: 5px;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0,123,255,0.5);
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9; // Light grey background
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
  &.show {
    display: block;
  }
`;

const DropdownItem = styled.button`
  background: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
