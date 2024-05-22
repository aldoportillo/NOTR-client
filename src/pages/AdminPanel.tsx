import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  
  const { auth } = useAuth();  

  const callDB = async (action: string) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/dashboard/${action}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const data = await response;
    toast(data.ok ? `Database ${action} Success` : `Database ${action} Fail`)
  }

  return (
    <div>
      <button onClick={() => callDB("create") }>Init DB</button>
      <button onClick={() => callDB("seed") }>Seed DB</button>
      <button onClick={() => callDB("drop") }>Drop DB</button>
      <button onClick={() => callDB("backup") }>Backup DB</button>
    </div>
  );
};

export default AdminPanel;
