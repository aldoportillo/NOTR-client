import { useCallback } from 'react';
import { useDrinks } from '../context/DrinksContext';
import { toast } from 'react-toastify';
import { Spec } from '../types/Spec';
import { SpiritData } from '../types/SpiritData';
import { getMacros } from '../functions/getMacros';
import { useAuth } from '../context/AuthContext';
import { DrinksCocktail } from '../types/DrinksCocktail';

interface ManageDrinksOptions {
    checkAuth?: boolean;
    resetCocktail?: boolean;
    name?: string;
    specs?: Spec[];
    info?: DrinksCocktail;
}

export const useManageDrinks = (spiritData?: SpiritData[]) => {
    const { setDrinks, setCocktail } = useDrinks();
    const { auth } = useAuth();

    
    const createDrink = (data) => ({
        name: data.name || 'Cocktail from Nutrition/Dilution', 
        ethanol: data.ethanol || 0,
        carbs: data.carbs || 0, 
        calories: data.calories || 0,
        fat: data.fat || 0,
        protein: data.protein || 0,
        sugar: data.sugar || 0,
        addedsugar: data.addedsugar || 0,
        ounces: data.ounces || 0,
        abv: data.abv || 0,
        createdAt: new Date(),
    });

    const addDrinkToDB = useCallback(async (drink: DrinksCocktail) => {
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
        const { resetCocktail = true, name = "", specs, info } = options;

        if (!auth.user) {
            toast.error("You must be logged in to add drinks");
            return;
        }

        if (info && info.ounces > 0 && info.abv > 0) {
            const drinksCocktail = createDrink(info);
            setDrinks((prevDrinks) => [...prevDrinks, drinksCocktail]);
            addDrinkToDB(drinksCocktail);
        } else if (specs && specs.length > 0) {
            const drinkDetails = getMacros(specs, spiritData);
            const drinksCocktail = createDrink(drinkDetails);
            setDrinks((prevDrinks) => [...prevDrinks, drinksCocktail]);
            addDrinkToDB(drinksCocktail);
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
