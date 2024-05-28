import { useState, useMemo } from "react";
import styled from "styled-components";
import { useManageDrinks } from "../hooks/useManageDrinks";

interface FormData {
    name: string;
    ounces: number;
    abv: number;
}

function AddEthanol() {
    const { addDrinkToState } = useManageDrinks();

    const [formData, setFormData] = useState<FormData>({
        name: "Wine/Beer",
        ounces: 0,
        abv: 0,
    });

    const ethanol = useMemo(() => {
        return formData.ounces * 29.5735 * (formData.abv / 100) * 0.789;
    }, [formData.ounces, formData.abv]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: parseFloat(e.target.value) || 0,
        });
    };

    const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        addDrinkToState({info: {...formData, ethanol}});
        setFormData({
            name: "Wine/Beer",
            ounces: 0,
            abv: 0,
        })
    }

    return (
        <Container>
            <Title>Add Ethanol</Title>
            <StyledForm>
                <StyledLabel htmlFor="ounces">Ounces</StyledLabel>
                <StyledInput type="number" id="ounces" value={formData.ounces} onChange={onChange} />
                <StyledLabel htmlFor="abv">ABV (%)</StyledLabel>
                <StyledInput type="number" id="abv" value={formData.abv} onChange={onChange} />
                <EthanolDisplay>
                    Ethanol: {ethanol.toFixed(2)} grams
                </EthanolDisplay>
                <StyledButton onClick={submitForm}>Add Ethanol</StyledButton>
            </StyledForm>
        </Container>
    );
}

export default AddEthanol;

const Container = styled.div`
  padding: 20px;
  background-color: var(--header);
  border-radius: 8px;
  color: white;
  width: 100%;
  max-width: 400px;
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
