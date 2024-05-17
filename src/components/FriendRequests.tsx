import styled from 'styled-components';
// import { User } from '../types/User';

interface FriendRequestsProps {
    friends: string[];
} 


function FriendRequests({friends}: FriendRequestsProps) {
  return (
    <Wrapper>
        <h2>Friend Requests</h2>
        <ul>
          {friends?.map(friend => <li key={friend}>{friend} {friend}</li>)} //TODO: Need to get the friend's name when API is updated
        </ul>
      </Wrapper>
  )
}

export default FriendRequests

const Wrapper = styled.div`
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