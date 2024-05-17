import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultImage from '../assets/notr-logo-medium-transparent.png'
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi';
import { BsGenderAmbiguous } from 'react-icons/bs';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  friends: string[];
  height: number;
  weight: number;
  dob: string;
}

const Profile = () => {
  const { username } = useParams<{ username?: string }>();
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<User | null>(null);

  const fetchUserProfile = async (username: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/profile/${username}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data: User = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      navigate('/auth');
    }
  }

  const sendFriendRequest = async (userId: string, friendId: string) => {
    try {
      console.log('Sending friend request to:', friendId, "From user:", userId);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/sendFriendRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ userId, friendId }),
      });
      console.log('Response:', response);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add friend');
      }
      const data = await response.json();
      alert('Friend request sent successfully');
      setUserProfile(previousState => ({
        ...previousState,
        friendRequests: [...previousState?.friendRequests, friendId] 
      }));
    } catch (error) {
      console.error('Error adding friend:', error);
      alert(error.message); 
    }
  }
  

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    } else if (auth.user) {
      setUserProfile(auth.user);
    } else {
      navigate('/auth');
    }
  }, [username, auth.user, navigate]);

  if (!userProfile) {
    return <p>Loading profile...</p>;
  }

  console.log('User profile:', userProfile);

  const { _id, firstName, lastName, friends, height, weight, dob, sex, friendRequests } = userProfile;
  const age = Math.floor((new Date().getTime() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const isOwnProfile = !username || username === auth.user?.username;

  return (
    <StyledProfile>
      <UserProfileContainer>
        <ProfileImageContainer>
          <img src={DefaultImage} />
        </ProfileImageContainer>
        <InformationContainer>
          <h2> {firstName} {lastName}</h2>
          
          <p><span>{<GiBodyHeight />}</span>{Math.floor(height / 12)} ft {height % 12} in</p>
          <p><span>{<GiWeightScale />}</span>{weight} lbs</p>
          <p><span>{<BsGenderAmbiguous />}</span>{sex} {age}</p>
          <p>Friends: {friends.length}</p>
        </InformationContainer>
        {isOwnProfile ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => sendFriendRequest(auth.user._id, _id)}>Add Friend</button>
        )}
      </UserProfileContainer>
      <FriendsList>
        <h2>Friends</h2>
        <ul>
          {friends.map(friend => <li key={friend}>{friend}</li>)}
        </ul>
      </FriendsList>
      {isOwnProfile && <FriendsList>
        <h2>Friend Requests</h2>
        <ul>
          {friendRequests?.map(friend => <li key={friend}>{friend}</li>)}
        </ul>
      </FriendsList>}
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

const FriendsList = styled.div`
  margin-top: 20px;
  width: 80%;
  max-width: 600px;
  background: var(--header);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);

  h2 {
    color: var(--accent);
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      padding: 8px;
      border-bottom: 1px solid var(--overlay);

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
