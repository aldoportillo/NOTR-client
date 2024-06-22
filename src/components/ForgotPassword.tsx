import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

interface ForgotPasswordProps {
    setForgotPassword: (value: boolean) => void;
}

const Login: React.FC<ForgotPasswordProps> = ({setForgotPassword}) => {
    
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleResetSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URI}/users/password-reset-initiate`, { email });
            setEmail('');
            setForgotPassword(false);
            navigate('/');
            toast.success('📧 Reset email sent! Check your inbox for further instructions.');
        } catch (error) {
            console.error('Reset error:', error);
            toast.error("Account not found. Please check your spelling and try again.")
        }
    }

    return (
        <Form onSubmit={handleResetSubmission}>
            <h2>Send Reset Email</h2>
            <FormGroup>
                <Label>Email:</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormGroup>
            <Button type="submit">Request Reset</Button>
            <SubLink onClick={() => setForgotPassword(false)}>Did you remember?</SubLink>
        </Form>
    );
};

export default Login;

const Form = styled.form`
    background-color: var(--header);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
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
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: darken(var(--accent), 10%);
    }
`;

const SubLink = styled.p`
    color: var(--accent);
    text-align: center;
    display: block;
    font-size: 0.8em;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;