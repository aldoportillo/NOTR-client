import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

interface FormData {
    weight: number;
    feet: number;
    inches: number;
}

function EditProfile() {
    const { auth } = useAuth();
    const { height, weight } = auth.user;

    const [formData, setFormData] = useState<FormData>({
        weight: weight,
        feet: height && Math.floor(height / 12),
        inches: height && height % 12,
    });
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!showModal) return; 

        const totalInches = parseInt(formData.feet.toString()) * 12 + parseInt(formData.inches.toString()); 

        
        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URI}/users/profile`, {
                height: totalInches,
                weight: formData.weight
            }, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                }
            });
            setShowModal(false);
            toast("⚖️ Body metrics updated successfully! 💪")
        } catch (error) {
            toast.error("🤷‍♂️ Failed to update body metrics. Please try again later. 🤷‍♂️");
            setShowModal(false);
        }
    };

    const handleShowModal = (event) => {
        event.preventDefault();
        setShowModal(true);
    };

    return (
        <Wrapper>
            <Title>Edit Metrics</Title>
            <StyledForm onSubmit={handleShowModal}>
                <StyledLabel htmlFor="feet">Feet</StyledLabel>
                <StyledInput
                    type="number"
                    id="feet"
                    name="feet"
                    value={formData.feet}
                    onChange={(e) => setFormData({ ...formData, feet: parseFloat(e.target.value) })}
                />
                <StyledLabel htmlFor="inches">Inches</StyledLabel>
                <StyledInput
                    type="number"
                    id="inches"
                    name="inches"
                    value={formData.inches}
                    onChange={(e) => setFormData({ ...formData, inches: parseFloat(e.target.value) })}
                />
                <StyledLabel htmlFor="weight">Weight</StyledLabel>
                <StyledInput
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                />
                <StyledButton type="submit">Save</StyledButton>
            </StyledForm>
            {showModal && (
                <Modal>
                    <p>Are you sure you want to save these changes?</p>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                    <button onClick={handleSubmit}>Confirm</button>
                </Modal>
            )}
        </Wrapper>
    )
}

export default EditProfile;

const Wrapper = styled.div`
  padding: 20px;
  background-color: var(--header);
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

const Title = styled.h3`
  color: var(--accent);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    color: white;
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
   
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: var(--background);
    border: 1px solid var(--accent);
    z-index: 10;

    > button {
        margin: 10px;
        padding: 5px 10px;
        background-color: var(--accent);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: darken(var(--accent), 10%);
        }
    }
`;