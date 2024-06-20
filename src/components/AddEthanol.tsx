import { useState, useMemo } from "react";
import styled from "styled-components";
import { useManageDrinks } from "../hooks/useManageDrinks";
import BarcodeScanner from "./BarcodeScanner";
import { Beverage } from "../types/Beverage";

interface FormData {
  name: string;
  ounces: string;
  abv: string;
}

function AddEthanol() {
  const { addDrinkToState } = useManageDrinks();
  const [displayScanner, setDisplayScanner] = useState(false);
  const [beverageData, setBeverageData] = useState<Beverage>({
    verified: false,
    name: "",
    abv: 0,
    ounces: 0,
    upc_code: "",
    flavors: "",
    calories: 0,
    ethanol: 0,
    fat: 0,
    carb: 0,
    sugar: 0,
    added_sugar: 0,
    protein: 0,
    creator_id: "",
    type: "other",
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    ounces: "",
    abv: "",
  });

  const ethanol = useMemo(() => {
    const ouncesNum = parseFloat(formData.ounces) || 0;
    const abvNum = parseFloat(formData.abv) || 0;
    return ouncesNum * 29.5735 * (abvNum / 100) * 0.789;
  }, [formData.ounces, formData.abv]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      ounces: parseFloat(formData.ounces) || 0,
      abv: parseFloat(formData.abv) || 0,
      ethanol,
    };
    addDrinkToState({ info: cleanedData });

    setFormData({
      name: "",
      ounces: "",
      abv: "",
    });
  };

  return (
    <Container>
      <Title>Add Ethanol</Title>
      <StyledButton onClick={() => setDisplayScanner(!displayScanner)}>
        Open Scanner
      </StyledButton>
      {!displayScanner && (
        <StyledForm>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <StyledInput
            type="text"
            id="name"
            placeholder="Wine/Beer (Optional)"
            value={formData.name}
            onChange={onChange}
          />
          <StyledLabel htmlFor="ounces">Ounces</StyledLabel>
          <StyledInput
            type="number"
            id="ounces"
            placeholder="12"
            value={formData.ounces}
            onChange={onChange}
          />
          <StyledLabel htmlFor="abv">ABV (%)</StyledLabel>
          <StyledInput
            type="number"
            id="abv"
            placeholder="5.5"
            value={formData.abv}
            onChange={onChange}
          />
          <EthanolDisplay>Ethanol: {ethanol.toFixed(2)} grams</EthanolDisplay>
          <StyledButton onClick={submitForm}>Add Ethanol</StyledButton>
        </StyledForm>
      )}
      {displayScanner && (
        <BarcodeScanner
          setBeverageData={setBeverageData}
          beverageData={beverageData}
          setDisplayScanner={setDisplayScanner}
          setFormData={setFormData}
        />
      )}
    </Container>
  );
}

export default AddEthanol;

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  background: var(--header);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 95%;
    padding: 10px;
  }
`;

const Title = styled.h3`
  color: var(--accent);
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  color: white;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  background: var(--overlay);
  border: none;
  border-radius: 4px;
  color: white;

  &:focus {
    outline: none;
    border: 1px solid var(--accent);
  }
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  background-color: var(--accent);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken(var(--accent), 10%);
  }
`;

const EthanolDisplay = styled.div`
  margin: 10px 0;
  color: var(--accent);
  font-weight: bold;
`;
