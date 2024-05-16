import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  if (!auth || !auth.user) {
    navigate('/auth');
    return null; 
  }

  const { firstName, lastName, email, friends } = auth.user;

  return (
    <StyledDashboard>
      <UserProfile>
        <h1>User Profile</h1>
        <p>Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
        <button onClick={logout}>Logout</button>
      </UserProfile>
      <FriendsList>
        <h2>Friends</h2>
        <ul>
          {friends.map(friend => <li key={friend}>{friend}</li>)}
        </ul>
      </FriendsList>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--background);
  color: white;
  min-height: 100vh;
`;

const UserProfile = styled.div`
  padding: 20px;
  background: var(--overlay);
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;

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
