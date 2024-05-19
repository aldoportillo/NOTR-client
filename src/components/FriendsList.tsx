import styled from 'styled-components';
import { Friend } from '../types/Friend';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DefaultImage from '../assets/notr-logo-medium-transparent.png';
import { Link } from 'react-router-dom';

function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { auth } = useAuth();

  const fetchFriends = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/friends`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch friends data');
      }
      const data = await response.json();
      setFriends(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching friends data:', error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <Wrapper>
      <h2>Friends</h2>
      {friends.map((friend, index) => (
        <StyledLink to={`/profile/${friend.username}`} key={index}>
          <FriendItem>
            <img src={DefaultImage} alt={`${friend.firstName}'s profile`} />
            <FriendInfo>
              <p>{friend.firstName} {friend.lastName}</p>
            </FriendInfo>
          </FriendItem>
        </StyledLink>
      ))}
    </Wrapper>
  );
}

export default FriendsList;

const Wrapper = styled.div`
  margin-top: 20px;
  width: 80%;
  max-width: 600px;
  background: var(--header);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: var(--accent);
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  color: inherit; // Ensure text inherits color for consistency
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background: var(--overlay);
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--toastify-color-progress-dark);
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    color: white;
  }
`;
