// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            login(response.data.token, response.data.user);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <h2>Login</h2>
            <FormGroup>
                <Label>Email:</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormGroup>
            <FormGroup>
                <Label>Password:</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormGroup>
            <Button type="submit">Login</Button>
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
    background-color: var(--accent);
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: darken(var(--accent), 10%);
    }
`;
