import { toast } from 'react-toastify';
import styled from 'styled-components';

function VerifiedBeverageForm({beverageData, setBeverageData, setFormType, setDisplayScanner, setFormData}) {
    const onChange = (e) => {
        setBeverageData({
            ...beverageData,
            [e.target.id]: e.target.value,
        });
    };
    console.log(beverageData);

    const submitForm = async (e) => {
        e.preventDefault();
        setFormType(null);
        setDisplayScanner(false);
        toast.success(`Ounces modified! Add it to your Drinks!`);
        setFormData({
            name: beverageData.name,
            ounces: beverageData.ounces,
            abv: beverageData.abv,
        });
    };

    return (
        <StyledForm>
            <StyledHeader>{beverageData.name}</StyledHeader>
            <StyledSubHeader>{beverageData.abv}%</StyledSubHeader>
            <StyledLabel htmlFor="ounces">Ounces</StyledLabel>
            <StyledInput type="number" id="ounces" placeholder="12" value={beverageData?.ounces} onChange={onChange} />
            <StyledButton onClick={submitForm}>Add Ethanol</StyledButton>
            
        </StyledForm>
    )
}

export default VerifiedBeverageForm

const StyledHeader = styled.h3`
    color: var(--accent);
    margin-bottom: 5px;
`;

const StyledSubHeader = styled.h4`
    color: white;
    margin-bottom: 10px;
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