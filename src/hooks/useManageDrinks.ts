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
    info?: DrinksCocktail
}

export const useManageDrinks = (spiritData?: SpiritData[]) => {
    const { setDrinks, setCocktail, setTotalEthanol, cocktail } = useDrinks();
    const { auth } = useAuth();

    const addDrinkToState = useCallback((options: ManageDrinksOptions = {}) => {
        const { resetCocktail = true, name = "", specs, info } = options;

        if (!auth.user) {
            toast.error("You must be logged in to add drinks");
            return;
        }

        if ( info && info.ounces > 0 && info.abv > 0) {
            //For AddEthanol Page
            const { name, ounces, abv} = info;
            const ethanol = ounces * 29.5735 * (abv / 100) * 0.789;

            console.log("For Add Ethanol Page Hook")
            const drinksCocktail: DrinksCocktail = {
                name: name || 'Wine/Beer', 
                ethanol: ethanol,
                carbs: 0, 
                calories: 0,
                fat: 0,
                protein: 0,
                sugar: 0,
                addedsugar: 0,
                ounces: ounces,
                abv: abv,
                createdAt: new Date(),
            };

            setDrinks((prevDrinks) => [...prevDrinks, drinksCocktail]);
            addEthanolToDB(ethanol);
        }
        
        if (!Array.isArray(spiritData)) {
            console.error("Invalid spirit data provided to getMacros:", spiritData);
            return;
        }
        
        if (specs && specs.length > 0) {
            //For Cocktail Page
            const drink = getMacros(specs, spiritData);
        
            const ethanol = drink.ethanol;
            addEthanolToDB(ethanol)
        } else if (cocktail.length === 0) {
            toast.error("You cannot add an empty drink");
            return;
        } else {
            //For Nutrition and Dilution Page
            const {name, ethanol, carb, calories, fat, protein, sugar, addedsugar} = getMacros(cocktail, spiritData);

            const drinksCocktail: DrinksCocktail = {
                name: name || 'Default Drink Name', 
                ethanol: ethanol,
                carbs: carb, 
                calories: calories,
                fat: fat,
                protein: protein,
                sugar: sugar,
                addedsugar: addedsugar,
                ounces: 0,
                abv: 0,
                createdAt: new Date(),
            };

            setDrinks((prevDrinks) => [...prevDrinks, drinksCocktail]);
           
            addEthanolToDB(ethanol)
        }

        if (resetCocktail) {
            setCocktail([]);
        }

        toast.success(`🍸 ${name || "Cocktail"} added. Visit profile page.🍸`);
    }, [setCocktail, setTotalEthanol, cocktail, spiritData, auth.user]);

    const clearCocktail = useCallback(() => {
        setCocktail([]);
    }, [setCocktail]);

    const addEthanolToDB = useCallback(async (ethanol: number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/ethanol/record`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({ ethanol: ethanol }),
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


    return { addDrinkToState, clearCocktail, addEthanolToDB };
};

