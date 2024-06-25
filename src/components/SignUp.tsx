import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    username: string;
    weight: number;
    feet: number;
    inches: number;
    dob: string;
    sex: string;
}

const StepOne = ({formData, handleChange}) => (
    <>
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
            <Label>Date of Birth:</Label>
            <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </FormGroup>
    </>
);

const StepTwo = ({formData, handleChange}) => (
    <>
        <FormGroup>
            <Label>Height (Feet):</Label>
            <Input type="number" name="feet" value={formData.feet} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
            <Label>Height (Inches):</Label>
            <Input type="number" name="inches" value={formData.inches} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
            <Label>Weight:</Label>
            <Input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
            <Label>Sex:</Label>
            <Select name="sex" value={formData.sex} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Select>
        </FormGroup>
    </>
);

const StepThree = ({formData, handleChange}) => (
    <>
        <FormGroup>
            <Label>Email:</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
            <Label>Password:</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
            <Label>Confirm Password:</Label>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </FormGroup>
        
    </>
);

const validateStepOne = (formData) => {
    return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && formData.username.trim() !== '';
};

const validateStepTwo = (formData) => {
    return formData.feet > 0 && formData.inches >= 0 && formData.weight > 0;
};

const validateStepThree = (formData) => {
    return formData.email.trim() !== '' && formData.password.trim() !== '' && formData.confirmPassword.trim() !== '' && formData.password === formData.confirmPassword;
};


const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        username: '',
        feet: 0,
        inches: 0,
        weight: 0,
        dob: '',
        sex: '',
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3; 
    const [isNextDisabled, setIsNextDisabled] = useState(true);


const nextStep = () => {
    if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
    }
};

const prevStep = () => {
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
    }
};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const today = new Date();
        const birthday = new Date(formData.dob);
        let age = today.getFullYear() - birthday.getFullYear();
        const m = today.getMonth() - birthday.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }

        if (age < 21) {
            toast.error("You must be at least 21 years old to sign up.");
            return;
        }

        const totalHeightInInches = (Number(formData.feet) * 12) + Number(formData.inches);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/users`, {
                ...formData,
                height: totalHeightInInches,
            });
            login(response.data.token, response.data.user);
            navigate(`/profile/${response.data.user.username}`);
            toast.success('🥃 Signup successful! Welcome to NOTR! 🧊');
        } catch (error) {
            console.error('Signup error:', error);
            toast.error("Signup failed. Please try again. Email or username may already be in use.");
        }
    };

    useEffect(() => {
        switch (currentStep) {
            case 1:
                setIsNextDisabled(!validateStepOne(formData));
                break;
            case 2:
                setIsNextDisabled(!validateStepTwo(formData));
                break;
            case 3:
                setIsNextDisabled(!validateStepThree(formData));
                break;
            default:
                setIsNextDisabled(true);
                break;
        }
    }, [formData, currentStep]); 

    return (
        <Form onSubmit={handleSignup}>
        <div className="form-header">
        <h2>Sign Up</h2>
        <ProgressBarWrapper>
        <ProgressBar
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }} 
            transition={{ duration: 0.5 }} 
            width={`${(currentStep / totalSteps) * 100}%`}
        />
        </ProgressBarWrapper>
        </div>

        <div className="form-body">
            {currentStep === 1 && <StepOne formData={formData} handleChange={handleChange}/>}
            {currentStep === 2 && <StepTwo formData={formData} handleChange={handleChange}/>}
            {currentStep === 3 && <StepThree formData={formData} handleChange={handleChange}/>}
        </div>
        <ButtonGroup>
            {currentStep > 1 && <Button onClick={prevStep}>Previous</Button>}
            {currentStep < totalSteps && (
                <Button onClick={nextStep} disabled={isNextDisabled}>Next</Button>
            )}
            {currentStep === totalSteps && (
                <Button type="submit" disabled={isNextDisabled}>Sign Up</Button>
            )}
        </ButtonGroup>
        </Form>
    );
};

export default Signup;

type ProgressBarProps = React.HTMLAttributes<HTMLDivElement> & {
    width: string; 
};

const Form = styled.form`
    background-color: var(--header);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .form-body {
        margin-top: 20px;
        margin-bottom: auto;
    }
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

const ProgressBar = styled(motion.div)<ProgressBarProps>`
    height: 20px;
    background-color: var(--accent);
    border-radius: 4px;
    width: ${(props) => props.width};  
`;

const ProgressBarWrapper = styled.div`
    width: 100%;
    background-color: var(--overlay);
    border-radius: 4px;
    overflow: hidden;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    align-self: flex-end;
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

    &:disabled {
        background-color: var(--overlay);
        color: var(--header);
        cursor: not-allowed;
    }
`;
