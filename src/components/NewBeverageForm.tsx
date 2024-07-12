import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

function NewBeverageForm({beverageData, setBeverageData, setFormType, setDisplayScanner, setFormData}) {
    const { auth } = useAuth();
    const onChange = (e) => {
        setBeverageData({
            ...beverageData,
            [e.target.id]: e.target.value,
        });

    };

    const submitForm = async (e) => {
        e.preventDefault();
        setFormType(null);
        setDisplayScanner(false);
        beverageData.ethanol = parseFloat(beverageData.ounces) * 29.5735 * (parseFloat(beverageData.abv) / 100) * 0.789;
        await axios.post(`${import.meta.env.VITE_SERVER_URI}/beverages`, 
        beverageData, {
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
                'x-access-token': import.meta.env.VITE_SERVER_KEY
            }
        })
            .then((res) => {
                toast.success(`Thank you for adding ${res.data.name}! We will review it shortly.`);
            })
            .catch((error) => {
                toast.error('There was an error adding this to our database. You can still submit it to your drinks consumed.', error);
            });
        setFormData({
            name: beverageData.name,
            ounces: beverageData.ounces,
            abv: beverageData.abv,
        });
    };

    return (
        <StyledForm>
          <StyledHeader>Add New Beverage</StyledHeader>
            <StyledSubHeader>This doesn't exist in our database yet. Feel free to add it. Leave undefined fields empty.</StyledSubHeader>
            <StyledLabel htmlFor="name">Name</StyledLabel>
            <StyledInput type="text" id="name" placeholder="Wine/Beer" value={beverageData?.name} onChange={onChange} />
            <StyledLabel htmlFor="ounces">Ounces</StyledLabel>
            <StyledInput type="number" id="ounces" placeholder="12" value={beverageData?.ounces} onChange={onChange} />
            <StyledLabel htmlFor="abv">ABV (%)</StyledLabel>
            <StyledInput type="number" id="abv" placeholder="5.5" value={beverageData?.abv} onChange={onChange} />
            <StyledLabel htmlFor="flavors">Flavors (Optional)</StyledLabel>
            <StyledInput type="text" id="flavors" placeholder="Strawberry" value={beverageData?.flavors} onChange={onChange} />
            <StyledLabel htmlFor="calories">Calories (Optional)</StyledLabel>
            <StyledInput type="number" id="calories" placeholder="100" value={beverageData?.calories} onChange={onChange} />
            <StyledLabel htmlFor="fat">Fat (Optional)</StyledLabel>
            <StyledInput type="number" id="fat" placeholder="5" value={beverageData?.fat} onChange={onChange} />
            <StyledLabel htmlFor="carb">Carb (Optional)</StyledLabel>
            <StyledInput type="number" id="carb" placeholder="10" value={beverageData?.carb} onChange={onChange} />
            <StyledLabel htmlFor="sugar">Sugar (Optional)</StyledLabel>
            <StyledInput type="number" id="sugar" placeholder="10" value={beverageData?.sugar} onChange={onChange} />
            <StyledLabel htmlFor="added_sugar">Added Sugar (Optional)</StyledLabel>
            <StyledInput type="number" id="added_sugar" placeholder="10" value={beverageData?.added_sugar} onChange={onChange} />
            <StyledLabel htmlFor="protein">Protein (Optional)</StyledLabel>
            <StyledInput type="number" id="protein" placeholder="10" value={beverageData?.protein} onChange={onChange} />
            <StyledLabel htmlFor="type">Type</StyledLabel>
            <StyledDropdown id="type" value={beverageData?.type} onChange={onChange}>
              <option value="beer">Beer</option>
              <option value="wine">Wine</option>
              <option value="spirit">Spirit</option>
              <option value="other">Other</option>
            </StyledDropdown>
            
            <StyledButton onClick={submitForm}>Submit for Review</StyledButton>
            
        </StyledForm>
    )
}

export default NewBeverageForm

const StyledHeader = styled.h3`
    color: var(--accent);
    margin-bottom: 5px;
`;

const StyledSubHeader = styled.p`
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

const StyledDropdown = styled.select`
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