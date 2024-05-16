import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    height: number;
    weight: number;
    dob: string;
    sex: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username: '',
        height: 0,
        weight: 0,
        dob: '',
        sex: '',
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/users`, formData);
            login(response.data.token, response.data.user);
            navigate('/dashboard');
            toast.success('🥃 Signup successful! Welcome to NOTR! 🧊');
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <Form onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <FormGroup>
                <Label>Email:</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Password:</Label>
                <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>First Name:</Label>
                <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Last Name:</Label>
                <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Username:</Label>
                <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Height:</Label>
                <Input type="number" name="height" value={formData.height} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Weight:</Label>
                <Input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Date of Birth:</Label>
                <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Sex:</Label>
                <Select name="sex" value={formData.sex} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Select>
            </FormGroup>
            <Button type="submit">Sign Up</Button>
        </Form>
    );
};

export default Signup;

const Form = styled.form`
    background-color: var(--header);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    overflow-y: auto;
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

const Select = styled.select`
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