import styled from 'styled-components';

function NewBeverageForm({beverageData, onChange, submitForm}) {
    console.log(beverageData)
    return (
        <StyledForm>
            <StyledLabel htmlFor="upcCode">{beverageData.upcCode}</StyledLabel>
            <StyledLabel htmlFor="name">Name</StyledLabel>
            <StyledInput type="text" id="name" placeholder="Wine/Beer" value={beverageData?.name} onChange={onChange} />
            <StyledLabel htmlFor="ounces">Ounces</StyledLabel>
            <StyledInput type="number" id="ounces" placeholder="12" value={beverageData?.ounces} onChange={onChange} />
            <StyledLabel htmlFor="abv">ABV (%)</StyledLabel>
            <StyledInput type="number" id="abv" placeholder="5.5" value={beverageData?.abv} onChange={onChange} />
            <StyledLabel htmlFor="flavors">Flavors</StyledLabel>
            <StyledInput type="text" id="flavors" placeholder="Strawberry" value={beverageData?.flavors} onChange={onChange} />
            <StyledLabel htmlFor="calories">Calories</StyledLabel>
            <StyledInput type="number" id="calories" placeholder="100" value={beverageData?.calories} onChange={onChange} />
            <StyledLabel htmlFor="ethanol">Ethanol</StyledLabel>
            <StyledInput type="number" id="ethanol" placeholder="10" value={beverageData?.ethanol} onChange={onChange} />
            <StyledLabel htmlFor="fat">Fat</StyledLabel>
            <StyledInput type="number" id="fat" placeholder="5" value={beverageData?.fat} onChange={onChange} />
            <StyledLabel htmlFor="carb">Carb</StyledLabel>
            <StyledInput type="number" id="carb" placeholder="10" value={beverageData?.carb} onChange={onChange} />
            <StyledLabel htmlFor="sugar">Sugar</StyledLabel>
            <StyledInput type="number" id="sugar" placeholder="10" value={beverageData?.sugar} onChange={onChange} />
            <StyledLabel htmlFor="added_sugar">Added Sugar</StyledLabel>
            <StyledInput type="number" id="added_sugar" placeholder="10" value={beverageData?.added_sugar} onChange={onChange} />
            <StyledLabel htmlFor="protein">Protein</StyledLabel>
            <StyledInput type="number" id="protein" placeholder="10" value={beverageData?.protein} onChange={onChange} />
            <StyledButton onClick={submitForm}>Add Ethanol</StyledButton>
            
        </StyledForm>
    )
}

export default NewBeverageForm


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