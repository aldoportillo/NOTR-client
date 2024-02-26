import React from 'react'
import LiquidForm from '../components/LiquidForm'
import NutritionLabel from '../components/NutritionLabel/NutritionLabel'
import { getMacros } from '../functions/getMacros'
import { toast } from 'react-toastify'
import IngredientLists from '../components/IngredientLists'
import LoadingGif from '../assets/loading.gif'
import { SpiritData } from '../types/SpiritData';
import { Spec } from '../types/Spec'

type Drinks = Spec[];

interface NutritionProps {
    spiritData: SpiritData[];
    loading: boolean;
    drinks: Drinks[];
    setDrinks: React.Dispatch<React.SetStateAction<Drinks[]>>; 
    setTotalEthanol: React.Dispatch<React.SetStateAction<number>>;
}

export default function Nutrition({ spiritData, loading, drinks, setDrinks, setTotalEthanol }: NutritionProps) {
    const [cocktail, setCocktail] = React.useState<Spec[]>([]);

    const addDrinkToState = () => {
        const ethanol = getMacros(cocktail, spiritData).ethanol;
        setTotalEthanol(totalEthanol => totalEthanol += ethanol);
        setDrinks([...drinks, cocktail]);
        toast(`🍸 Cocktail added. Visit my BAC page.🍸`);
        setCocktail([]);
    };

    const clearDrink = () => {
        toast(`🫗 Cocktail Spilled 🫗`);
        setCocktail([]);
    };

    return (
        <>
            {loading ? (
                <img src={LoadingGif} alt="loader" className="loader" />
            ) : (
                <div className="nutrition-page">
                    <h2>Nutrition Calculator</h2>
                    <LiquidForm setCocktail={setCocktail} cocktail={cocktail} spiritData={spiritData} />

                    <IngredientLists ingredients={cocktail} setIngredients={setCocktail} clearDrink={clearDrink} addDrinkToState={addDrinkToState} />
                    <div className="nutrition-label">
                        <NutritionLabel item={getMacros(cocktail, spiritData)} />
                    </div>
                </div>
            )}
        </>
    );
}