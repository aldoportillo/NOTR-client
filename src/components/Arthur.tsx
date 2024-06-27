import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; 
import LoadingGif from '../assets/loading.gif';

export default function ArthurBartender() {
  const [prompt, setPrompt] = useState('');
  const [cocktail, setCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  const fetchCocktail = useCallback(async () => {
    if (!prompt) return; // Prevent fetching with empty prompt
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
      if (!response.ok) {
        throw new Error('Failed to get cocktail details');
      }
      const data = await response.json();
      setCocktail(data);
    } catch (error) {
      console.error('Error fetching cocktail data:', error);
      toast(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [auth.token, prompt]);

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
          <Subheader>Ingredients for {cocktail.name}:</Subheader>
          {console.log(cocktail)}
          {cocktail.map((ingredient) => (
            
            <Ingredient key={ingredient.spirit_id}>
              {ingredient.spirit_name}: {ingredient.ounces} 
            </Ingredient>
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

const Ingredient = styled.p`
  color: white;
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
