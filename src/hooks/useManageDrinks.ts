import { useCallback } from 'react';
import { useDrinks } from '../context/DrinksContext';
import { toast } from 'react-toastify';
import { Spec } from '../types/Spec';
import { SpiritData } from '../types/SpiritData';
import { getMacros } from '../functions/getMacros';
import { useAuth } from '../context/AuthContext';

interface ManageDrinksOptions {
    checkAuth?: boolean;
    resetCocktail?: boolean;
    name?: string;
    specs?: Spec[];
}

export const useManageDrinks = (spiritData: SpiritData[]) => {
    const { setCocktail, setDrinks, setTotalEthanol, cocktail } = useDrinks();
    const { auth } = useAuth();

    const addDrinkToState = useCallback((options: ManageDrinksOptions = {}) => {
        const { resetCocktail = true, name = "", specs } = options;
        
        if (!auth.user) {
            toast.error("You must be logged in to add drinks");
            return;
        }
        
        if (!Array.isArray(spiritData)) {
            console.error("Invalid spirit data provided to getMacros:", spiritData);
            return;
        }
        
        if (specs && specs.length > 0) {
            const ethanol = getMacros(specs, spiritData).ethanol;
            setTotalEthanol(totalEthanol => totalEthanol + ethanol);
            setDrinks(currentDrinks => [...currentDrinks, ...cocktail]);
        } else if (cocktail.length === 0) {
            toast.error("You cannot add an empty drink");
            return;
        } else {
            const ethanol = getMacros(cocktail, spiritData).ethanol;
            setTotalEthanol(totalEthanol => totalEthanol + ethanol);
            setDrinks(currentDrinks => [...currentDrinks, ...cocktail]);
        }

        if (resetCocktail) {
            setCocktail([]);
        }

        toast.success(`🍸 ${name || "Cocktail"} added. Visit my BAC page.🍸`);
    }, [setCocktail, setDrinks, setTotalEthanol, cocktail, spiritData, auth.user]);

    const clearCocktail = useCallback(() => {
        setCocktail([]);
    }, [setCocktail]);

    return { addDrinkToState, clearCocktail };
};

