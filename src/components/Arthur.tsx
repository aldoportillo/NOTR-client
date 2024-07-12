import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import LoadingGif from '../assets/loading.gif';
import { Link } from 'react-router-dom';


export default function ArthurBartender({ setCocktail, cocktail}) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  const fetchCocktail = useCallback(async () => {
    if (!prompt) return; 
    setIsLoading(true);
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/cocktails/arthur`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
                'x-access-token': import.meta.env.VITE_SERVER_KEY
            },
            body: JSON.stringify({ prompt })
        });
        
        const data = await response.json(); 
        if (!response.ok) {
            throw new Error(data.error || 'Failed to get cocktail details'); 
        }
        
        if (data.error) {
            throw new Error(data.error); 
        }

        toast.success('Arthur has made your cocktail! 🍹 Arthur can be wrong sometimes. Verify specs before adding drink');
        
        setCocktail(data); 
    } catch (error) {
        console.error('Error fetching cocktail data:', error);
        toast.error(`Error: ${error.message}`); 
    } finally {
        setIsLoading(false); 
    }
}, [auth.token, prompt]); 


  const handleIngredientChange = (index, newValue) => {
    const updatedIngredients = [...cocktail];
    
    updatedIngredients[index].ounces = newValue;
    setCocktail(updatedIngredients);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCocktail();
  };

  return (
    <Wrapper>
      <Title>Arthur's Cocktail Maker</Title>
      {auth.token ? 
      <>
      {isLoading ? (
        <Loader>
          <img src={LoadingGif} alt="Loading..." />
        </Loader>
      ) : cocktail?.length !== 0 ? (
        <>
        <Subheader>{prompt.toUpperCase()}</Subheader>
          {cocktail.map((ingredient, index) => (
            <IngredientForm key={ingredient.id}>
              {ingredient.spirit}
              <IngredientInput 
                type="number" 
                value={ingredient.ounces} 
                onChange={(e) => handleIngredientChange(index, e.target.value)} 
                min="0" 
                step="0.01" 
              />
            </IngredientForm>
          ))}
        </>
      ) : (
        <>
        <form onSubmit={handleSubmit} style={{alignSelf: "center"}}>
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a cocktail name"
          required
        />
        <Button type="submit" disabled={isLoading}>
          Make Cocktail
        </Button>
      </form>
        <Subheader>Enter a cocktail name and let Arthur work.</Subheader>
        </>
      )}
      </>: 
      <p>
        Arthur AI is only available to Users. <StyledLink to="/auth">Sign Up Here</StyledLink>.
      </p>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0vh 50px 2vh 50px;
  
  
`;

const Title = styled.h3`
  color: var(--accent);
  margin-bottom: 20px;
  align-self: center;
`;

const Subheader = styled.h4`
  color: white;
  margin-bottom: 10px;
  align-self: center;
`;

const IngredientForm = styled.div`
  color: white;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    margin-left: 10px;
    width: 60px;
  }
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  &:focus {
    outline: var(--accent) auto 5px;
  }
  background-color: var(--overlay);
  color: white;

  &::placeholder {
    color: white;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: var(--accent);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: grey;
    cursor: default;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
  }
`;

const IngredientInput = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  &:focus {
    outline: var(--accent) auto 5px;
  }
  background-color: var(--overlay);
  color: white;

  &::placeholder {
    color: white;
  }
`;

const StyledLink = styled(Link)`

text-decoration: none;
color: var(--accent);
  &:hover, &:focus {
    text-decoration: underline;
  }
`