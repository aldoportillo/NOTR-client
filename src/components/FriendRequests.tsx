import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import DefaultImage from '../assets/notr-logo-medium-transparent.png';
import { FaCheck, FaTimes } from 'react-icons/fa';
import useFriendRequest from '../hooks/useFriendRequest';
import { Friend } from '../types/Friend';

function FriendRequests() {
  const [requests, setRequests] = useState<Friend[]>([]);
  const { auth } = useAuth();
  const { acceptFriendRequest, rejectFriendRequest } = useFriendRequest();

  const fetchFriendRequests = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/friendRequests`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch friend requests');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const handleAccept = async (id:string) => {
    acceptFriendRequest(id).then(fetchFriendRequests).catch(error => console.error('Failed to accept friend request:', error));
  };

  const handleReject = async (id:string) => {
    rejectFriendRequest(id).then(fetchFriendRequests).catch(error => console.error('Failed to reject friend request:', error));
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []); 

  return (
    <Wrapper>
      <h2>Friend Requests</h2>
      {requests.map((request, index) => (
        <RequestItem key={index}>
          <img src={DefaultImage} alt="Friend Request" />
          <RequestInfo>
            <p>{request.firstName} {request.lastName}</p>
          </RequestInfo>
          <Actions>
            <AcceptIcon onClick={() => handleAccept(request._id)} />
            <RejectIcon onClick={() => handleReject(request._id)} />
          </Actions>
        </RequestItem>
      ))}
    </Wrapper>
  );
}

export default FriendRequests;


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
`;


const RequestItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background: var(--overlay);

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const RequestInfo = styled.div`
  flex-grow: 1;
  p {
    margin: 0;
    color: white;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80px;
`;

const AcceptIcon = styled(FaCheck)`
  color: green;
  cursor: pointer;
  &:hover {
    color: #00ff00;
  }
`;

const RejectIcon = styled(FaTimes)`
  color: red;
  cursor: pointer;
  &:hover {
    color: #ff0000;
  }
`;
