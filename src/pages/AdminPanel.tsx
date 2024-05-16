import { useState} from 'react';
import styled from 'styled-components';
import GenericTable from '../components/GenericTable';
import useFetchData from '../hooks/useFetchData';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('cocktails');
  const { auth } = useAuth();  

  const { data, loading, error } = useFetchData(`${import.meta.env.VITE_SERVER_URI}/${activeTab}`, auth.token || '');

  console.log(data);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Container>
      <Sidebar>
        {['cocktails', 'garnishes', 'glasswares', 'techniques', 'specs', 'spirits', 'spiritcategories', 'instructions', 'users', 'affiliates'].map((item) => (
          <SidebarItem key={item} active={activeTab === item} onClick={() => handleTabClick(item)}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </SidebarItem>
        ))}
      </Sidebar>
      <Main>
        <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && data.length > 0 && (
          <GenericTable headers={headers} data={data} />
        )}
      </Main>
    </Container>
  );
};

export default AdminPanel;

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow-x: scroll;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: #2c3e50;
  color: white;
  height: 100%;
  overflow-y: auto;
`;

const SidebarItem = styled.div<{active: boolean}>`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${({ active }) => active ? '#34495e' : 'none'};
  &:hover {
    background-color: #34495e;
  }
`;

const Main = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;
