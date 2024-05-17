import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import DefaultImage from '../assets/notr-logo-medium-transparent.png';
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi';
import { BsGenderAmbiguous } from 'react-icons/bs';
import FriendsList from '../components/FriendsList';
import { User } from '../types/User';
import Bac from '../components/Bac';

const Profile: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.user) {
      navigate('/auth');
    } else if (username) {
      fetchUserProfile(username);
    } else {
      setProfileUser(auth.user as User);  
    }
  }, [username, auth.user, navigate]);

  const fetchUserProfile = async (username: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/profile/${username}`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setProfileUser(data);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching profile data:', error);
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profileUser) return null;

  const { firstName, lastName, height, weight, sex, friends, dob } = profileUser;

  const getAge = () => {
    const dobDate = new Date(dob);
    const diff = Date.now() - dobDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <StyledProfile>
      <UserProfileContainer>
        <ProfileImageContainer>
          <img src={DefaultImage} alt="Profile" />
        </ProfileImageContainer>
        <InformationContainer>
          <h2>{firstName} {lastName}</h2>
          <p><GiBodyHeight /> {Math.floor(height / 12)} ft {height % 12} in</p>
          <p><GiWeightScale /> {weight} lbs</p>
          <p><BsGenderAmbiguous /> {sex} {getAge()}</p>
          <p>Friends: {friends.length}</p>
        </InformationContainer>
        {!username || username === auth.user?.username ? (
          <button onClick={logout}>Logout</button>
        ) : null}
      </UserProfileContainer>
      <FriendsList friends={friends} />
      <Bac userMetrics={{sex, weight, height}} />
    </StyledProfile>
  );
};

export default Profile;


const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--background);
  color: white;
  min-height: 100vh;
  width: 100%;
`;

const InformationContainer = styled.div`
  p {
    margin: 5px 0;
  }
`;

const ProfileImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: fit-content;
  }
`;

const UserProfileContainer = styled.div`
  padding: 20px;
  background: var(--overlay);
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  width: 100%

  h1 {
    color: var(--accent);
  }

  p {
    font-size: 16px;
    margin: 10px 0;
  }

  button {
    padding: 10px 20px;
    background: var(--accent);
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: var(--toastify-color-progress-dark);
    }
  }
`;


