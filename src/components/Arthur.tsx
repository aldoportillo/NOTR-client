import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import LoadingGif from '../assets/loading.gif';


export default function ArthurBartender({ technique, setTechnique, setCocktail, cocktail}) {
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
                'Content-Type': 'application/json'
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
    console.log(cocktail);
    
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
      <form onSubmit={handleSubmit}>
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
      {isLoading ? (
        <Loader>
          <img src={LoadingGif} alt="Loading..." />
        </Loader>
      ) : cocktail ? (
        <>
          <Subheader>Ingredients for {prompt}:</Subheader>
          {cocktail.map((ingredient, index) => (
            <IngredientForm key={ingredient.id}>
              {ingredient.spirit}
              <input 
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
        <Subheader>Enter a cocktail name and submit.</Subheader>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  background-color: var(--header);
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

const Title = styled.h3`
  color: var(--accent);
  margin-bottom: 20px;
`;

const Subheader = styled.h4`
  color: white;
  margin-bottom: 10px;
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
  height: 50px; // Adjust size as needed
`;
