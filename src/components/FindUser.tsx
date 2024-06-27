import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

function FindUser() {
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();

  const { auth } = useAuth(); 

const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/profile/${profile}`, {
            method: 'GET',
            headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                },
        });

        if (response.ok) {
            navigate(`/profile/${profile}`);
        } else {
            toast.error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Error searching for user');
    }
};

  return (
    <Wrapper>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter username"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
    </Wrapper>
  );
}

export default FindUser;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;

  form {
    display: flex;
    gap: 10px;

    input {
      padding: 8px;
      border-radius: 4px;
      &:focus {
        outline: none;
        border-color: var(--accent);
      }
      &:placeholder {
        color: #ccc;
      }
      background-color: var(--overlay);
      color: white;
    }

    button {
      padding: 8px 16px;
      background-color: var(--accent);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #45a049;
      }
    }
  }
`;
