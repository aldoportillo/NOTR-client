import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { SpiritData } from '../types/SpiritData';

interface FridgeManagerProps {
    spiritData: SpiritData[];
}

function FridgeManager({spiritData}: FridgeManagerProps) {
    const [fridgeItems, setFridgeItems] = useState([]);
    const [activeTab, setActiveTab] = useState('view'); 
    const { auth } = useAuth();

    useEffect(() => {
        fetchFridgeItems();
    }, []);

    const fetchFridgeItems = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/users/my-fridge`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setFridgeItems(response.data);
        } catch (error) {
            console.error('Failed to fetch fridge items:', error);
        }
    };

    const addOrRemoveSpirit = async (spiritId, spiritName) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URI}/users/my-fridge`, { spiritId, spiritName }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            fetchFridgeItems();
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    }


    return (
        <div>
            <button onClick={() => setActiveTab('view')}>View My Fridge</button>
            <button onClick={() => setActiveTab('add')}>Add Spirits</button>

            {activeTab === 'view' ? (
                <div>
                    {fridgeItems?.map(spirit => (
                        <div key={spirit.id}>
                            {spirit.name}
                            <button onClick={() => addOrRemoveSpirit(spirit.id, spirit.name)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {spiritData.map(spirit => (
                        <div key={spirit.id}>
                            {spirit.name}
                            <button onClick={() => addOrRemoveSpirit(spirit.id, spirit.name)}>Add to Fridge</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FridgeManager;
