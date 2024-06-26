import React, { createContext, useState, useContext, ReactNode, FC } from 'react';
import { Spec } from '../types/Spec';
import { DrinksCocktail } from '../types/DrinksCocktail';

interface DrinksContextType {
    drinks: DrinksCocktail[];
    setDrinks: React.Dispatch<React.SetStateAction<DrinksCocktail[]>>;
    totalEthanol: number;
    setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
    cocktail: Spec[]; 
    setCocktail: React.Dispatch<React.SetStateAction<Spec[]>>; 
}

const DrinksContext = createContext<DrinksContextType | undefined>(undefined);

export const DrinksProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [drinks, setDrinks] = useState<DrinksCocktail[]>([]);
    const [totalEthanol, setTotalEthanol] = useState<number>(0);
    const [cocktail, setCocktail] = useState<Spec[]>([]);

    return (
        <DrinksContext.Provider value={{ drinks, setDrinks, totalEthanol, setTotalEthanol, cocktail, setCocktail }}>
            {children}
        </DrinksContext.Provider>
    );
};

export const useDrinks = (): DrinksContextType => {
    const context = useContext(DrinksContext);
    if (!context) {
        throw new Error('useDrinks must be used within a DrinksProvider');
    }
    return context;
};
