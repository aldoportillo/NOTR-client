import { useCallback } from 'react';
import { useDrinks } from '../context/DrinksContext';
import { toast } from 'react-toastify';
import { Spec } from '../types/Spec';
import { SpiritData } from '../types/SpiritData';
import { useAuth } from '../context/AuthContext';
import { DrinksCocktail } from '../types/DrinksCocktail';
import { calculateCocktailData } from '../functions/calculateCocktailData';
import { calculateDrinkData } from '../functions/calculateDrinkData';
import { Technique } from '../types/Technique';

interface ManageDrinksOptions {
    checkAuth?: boolean;
    resetCocktail?: boolean;
    name?: string;
    specs?: Spec[];
    info?: DrinksCocktail;
    technique?: Technique;
}

export const useManageDrinks = (spiritData?: SpiritData[]) => {
    const { setDrinks, setCocktail } = useDrinks();
    const { auth } = useAuth();

    const addDrinkToDB = useCallback(async (drink: DrinksCocktail) => {

        console.log(drink);
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/cocktail-entry/record`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(drink),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Failed to add ethanol to user");
            }

            toast.success("Ethanol added to user successfully");
            return response;
        } catch (error) {
            console.error("Error adding ethanol to user:", error);
            toast.error(error.toString());
            throw error;
        }
    }, [auth.token]);

    const addDrinkToState = useCallback((options: ManageDrinksOptions = {}) => {
        const { resetCocktail = true, name = "Cocktail", specs, info, technique } = options;

        if (!auth.user) {
            toast.error("You must be logged in to add drinks");
            return;
        }

        console.log(specs)

        if (info && info.ounces > 0 && info.abv > 0) {
            //From Add Ethanol Form
            const cocktailData = calculateDrinkData(info);
            setDrinks((prevDrinks) => [...prevDrinks, cocktailData]);
            addDrinkToDB(cocktailData);
        } else if (specs && specs.length > 0) {
            //From Liquid Form and Cocktail Page
            const cocktailData = calculateCocktailData(name, specs, spiritData, technique);
            
            setDrinks((prevDrinks) => [...prevDrinks, cocktailData]);
            addDrinkToDB(cocktailData);
        } else {
            toast.error("You cannot add an empty drink");
            return;
        }

        if (resetCocktail) {
            setCocktail([]);
        }

        toast.success(`🍸 ${name || "Cocktail"} added. Visit profile page.🍸`);
    }, [setCocktail, setDrinks, addDrinkToDB, auth.user, spiritData]);

    const clearCocktail = useCallback(() => {
        setCocktail([]);
    }, [setCocktail]);

    return { addDrinkToState, clearCocktail };
};
