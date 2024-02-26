import React from "react";
import styled from "styled-components";

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
    <Wrapper>
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
    </Wrapper>
  );
};

export default NutritionLabel;

const Wrapper = styled.div`

    background-color: white;
    width: 100%;
    border: 3px solid black;
    font-family: Helvetica;

    .title {
        font-size: 2rem;
        font-weight: bolder;
        color: black;
    }
    h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap:5px;
        height: 10px;
        color: black;
    }

    h2 > p{
        color: black;
    }

    h3 {
        display: flex;
        align-items: center;
        gap:5px;
        height: 10px;
        color: black;
    }
    h3 > p {
        font-weight: 100;
        color: black;
    }

    h3{
        color: black;
    }

    .thick1 {
        height: 15px;
        background-color: black;
    }

    .thick2 {
        height: 5px;
        background-color: black;
    }
}
`;
