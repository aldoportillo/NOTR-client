import React from 'react';

interface NutritionLabelProps {
    item: {
        calories: number;
        ethanol: number;
        fat: number;
        carb: number;
        sugar: number;
        addedSugar: number;
        protein: number;
    };
}

const NutritionLabel: React.FC<NutritionLabelProps> = ({ item }) => {
    return (
        <div className="label-container">
            <h2 className="title">Cocktail Facts</h2>
            <div className="thick1"></div>
            <h3>
                Serving Size <p>1 drink</p>
            </h3>
            <h2>
                Calories <p>{Math.ceil(item.calories)}</p>
            </h2>
            <div className="thick2"></div>
            <h3>
                Ethanol <p>{Math.ceil(item.ethanol)}g </p>
            </h3>
            <hr />
            <h3>
                Total Fat <p>{Math.ceil(item.fat)} g</p>
            </h3>
            <hr />
            <h3>
                Total Carbohydrate <p>{Math.ceil(item.carb)} g</p>
            </h3>
            <hr />
            <h3>
                <p>Total Sugars {Math.ceil(item.sugar)} g</p>
            </h3>
            <hr />
            <h3>
                <p>Includes {Math.ceil(item.addedSugar)} g Added Sugars</p>
            </h3>
            <hr />
            <h3>
                Protein <p>{Math.ceil(item.protein)} g</p>
            </h3>
            <div className="thick1"></div>
        </div>
    );
};

export default NutritionLabel;
