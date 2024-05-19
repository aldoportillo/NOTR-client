import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import FriendsList from '../components/FriendsList';
import { User } from '../types/User';
import Bac from '../components/Bac';
import UserInfo from '../components/UserInfo';
import FriendRequests from '../components/FriendRequests';
import FindUser from '../components/FindUser';

const Profile: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();
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

  const { height, weight, sex } = profileUser;
  const isCurrentUser = auth.user && profileUser && auth.user._id === profileUser._id;

  return (
    <StyledProfile>
      <FindUser />
      <UserInfo profileUser={profileUser} />
      <Bac userId={profileUser._id} userMetrics={{ sex, weight, height }} />
      {isCurrentUser && (
        <>
          <FriendsList />
          <FriendRequests />
        </>
      )}
      
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


