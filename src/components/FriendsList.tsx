import styled from 'styled-components';

interface FriendsListProps {
    friends: string[];
} 


function FriendsList({friends}: FriendsListProps) {
  return (
    <Wrapper>
        <h2>Friends</h2>
        <ul>
          {friends?.map(friend => <li key={friend}>{friend} {friend}</li>)}
        </ul>
      </Wrapper>
  )
}

export default FriendsList

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