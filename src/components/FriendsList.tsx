import styled from 'styled-components';
import { Friend } from '../types/Friend';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DefaultImage from '../assets/notr-logo-medium-transparent.png';
import { Link } from 'react-router-dom';

function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { auth } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');

  const fetchFriends = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/friends`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
          'x-access-token': import.meta.env.VITE_SERVER_KEY
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch friends data');
      }
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error('Error fetching friends data:', error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const filteredFriends = friends.filter(friend =>
    `${friend.firstName} ${friend.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
      <h2>Friends</h2>
      <SearchInput
                type="text"
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
      <div className="list">
      {filteredFriends.map((friend, index) => (
        
        <StyledLink to={`/profile/${friend.username}`} key={index}>
          <FriendItem>
            <img src={DefaultImage} alt={`${friend.firstName}'s profile`} />
            <FriendInfo>
              <p>{friend.firstName} {friend.lastName}</p>
            </FriendInfo>
          </FriendItem>
        </StyledLink>
      ))}
      </div>
    </Wrapper>
  );
}

export default FriendsList;

const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  background: var(--header);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 95%;
    padding: 10px;
  }

  .list{
    width: 100%;
    max-height: 260px;
    overflow-y: auto;
    border-radius: 5px;
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

const SearchInput = styled.input`
    padding: 10px;
    color: white;
    margin: 10px 0;
    border: 1px solid var(--overlay);
    border-radius: 5px;
    width: 80%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    &:focus {
      outline: none;
      border: 1px solid var(--accent);
    }
    background: var(--overlay);
    &::placeholder {
      color: white;
    }
`;