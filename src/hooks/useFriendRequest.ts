import { useCallback, useContext } from 'react';

//TODO: EVERYTHING!!!
const useFriendRequest = () => {


  const sendFriendRequest = useCallback(async (userId: string, friendId: string) => {
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
  }, [auth, setUserProfile]);

  const acceptFriendRequest = useCallback(async (userId: string, friendId: string) => {
    try {

    } catch (error) {
      console.error('Error accepting friend:', error);
      alert(error.message);
    }
  }, [auth]);

  const rejectFriendRequest = useCallback(async (userId: string, friendId: string) => {
    try {

    } catch (error) {
      console.error('Error rejecting friend:', error);
      alert(error.message);
    }
  }, [auth]);

  return {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
  };
};

export default useFriendRequest;
