import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { UserMetrics } from '../types/UserMetrics';

interface FormData {
    weight: number;
    feet: number;
    inches: number;
}

function EditProfile({userMetrics}: {userMetrics: UserMetrics}) {

    const { auth } = useAuth();

    const [formData, setFormData] = useState<FormData>({
        weight: userMetrics.weight || 0,
        feet: userMetrics.height && Math.floor(userMetrics.height / 12) || 0,
        inches: userMetrics.height && userMetrics.height % 12 || 0,
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
                    'Content-Type': 'application/json',
                    'x-access-token': import.meta.env.VITE_SERVER_KEY
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