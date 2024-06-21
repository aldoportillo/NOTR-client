import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormData {
    password: string;
    confirmPassword: string;
}

const ResetPassword: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const { token } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URI}/users/password-reset-complete`, {
                newPassword: formData.password,
                token
            });
            
            toast.success('🥃 ResetPassword successful! Welcome back to NOTR! 🧊');
            navigate('/auth');
        } catch (error) {
            console.error('ResetPassword error:', error);
            toast.error("ResetPassword failed. Please try again. Email or username may already be in use.");
        }
    };

    return (
        <Form onSubmit={handleResetPassword}>
            <h2>Reset Password</h2>
            <FormGroup>
                <Label>Password:</Label>
                <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Confirm Password:</Label>
                <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Date of Birth:</Label>
                <Input type="date" name="dob" required />
            </FormGroup>
            <Button type="submit">Reset Password</Button>
        </Form>
    );
};

export default ResetPassword;

const Form = styled.form`
    background-color: var(--header);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    overflow-y: auto;
    margin: auto;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid var(--overlay);
    border-radius: 4px;
    background-color: #2c2f33;
    color: white;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: var(--accent);
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: darken(var(--accent), 10%);
    }
`;
