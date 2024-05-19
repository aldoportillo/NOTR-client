import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/User'; 
import useFriendRequest from '../hooks/useFriendRequest';
import styled from 'styled-components';

const UserProfileActions = ({ profileUser }: User) => {
    const { auth, logout } = useAuth();
    const { sendFriendRequest } = useFriendRequest();
    const currentUser = auth.user;
  
    const [friendRequestSent, setFriendRequestSent] = useState(false);
  
    const isCurrentUser = currentUser && profileUser && currentUser._id === profileUser._id;
    const isFriend = currentUser && profileUser && currentUser.friends.includes(profileUser._id);
    const isFriendRequestSent = currentUser && profileUser && profileUser.friendRequests.includes(currentUser._id) || friendRequestSent;
  
    const handleSendFriendRequest = async () => {
      try {
        await sendFriendRequest(profileUser._id);
        setFriendRequestSent(true);  
      } catch (error) {
        console.error('Failed to send friend request:', error);
      }
    };
  
    const actionButton = useMemo(() => {
      if (isCurrentUser) {
        return <Button onClick={logout}>Logout</Button>;
      } else if (!isFriend && !isFriendRequestSent) {
        return <Button onClick={handleSendFriendRequest}>Add Friend</Button>;
      }
  
      return null;
    }, [isCurrentUser, isFriend, logout, isFriendRequestSent, profileUser._id]);
  
  return (
    <>
      {actionButton}
    </>
  );
};

export default UserProfileActions;

const Button = styled.div`
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
`;