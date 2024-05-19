import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const useFriendRequest = () => {
  const { auth } = useAuth();

  const sendFriendRequest = useCallback(async (friendId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/sendFriendRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ friendId }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to send friend request');
      }
      toast('Friend request sent successfully');
      return response;
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast(error.toString());
      throw error;
    }
  }, [auth.token]);

  const acceptFriendRequest = useCallback(async (friendId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/acceptFriendRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ friendId }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to accept friend request');
      }
      toast('Friend request accepted successfully');
      return response;
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast(error.toString());
      throw error;
    }
  }, [auth.token]);

  const rejectFriendRequest = useCallback(async (friendId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/users/rejectFriendRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ friendId }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to reject friend request');
      }
      toast('Friend request rejected successfully');
      return response
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      toast(error.toString());
      throw error;
    }
  }, [auth.token]);

  return {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
  };
};

export default useFriendRequest;
