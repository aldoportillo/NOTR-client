import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { SpiritData } from '../types/SpiritData';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface FridgeManagerProps {
    spiritData: SpiritData[];
}

function FridgeManager({spiritData}: FridgeManagerProps) {
    const [fridgeItems, setFridgeItems] = useState([]);
    const [fridgeView, setFridgeView] = useState(true); 
    const { auth } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');


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

    const getFilteredItems = () => {
        if (fridgeView) {
            return fridgeItems.filter(spirit => spirit.name.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            return spiritData.filter(spirit => 
                !fridgeItems.some(item => item.id === spirit.id) &&
                spirit.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    };
    

    const renderItems = () => {
        const items = getFilteredItems();
        return items.map(spirit => (
            <SpiritItem key={spirit.id}>
                {spirit.name}
                <IconButton 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    onClick={() => addOrRemoveSpirit(spirit.id, spirit.name)}>
                    {fridgeView ? 
                        <IoRemoveCircleOutline size={24} /> : 
                        <IoAddCircleOutline size={24} />
                    }
                </IconButton>
            </SpiritItem>
        ));
    };
    

    const toggleFridgeView = () => {
        setFridgeView(!fridgeView);
        setSearchTerm('');
    }
    return (
        <Wrapper>
            <h2>My Fridge</h2>
            <TabContainer>
                <TabButton className={fridgeView ? 'active' : ''} onClick={toggleFridgeView}>View My Fridge</TabButton>
                <TabButton className={!fridgeView ? 'active' : ''} onClick={toggleFridgeView}>Add Spirits</TabButton>
            </TabContainer>
            <SearchInput
                type="text"
                placeholder="Search spirits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SpiritsContainer>
                {renderItems()}
            </SpiritsContainer>
        </Wrapper>
    );
}

export default FridgeManager;


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

const TabContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const SearchInput = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid var(--overlay);
    border-radius: 5px;
    width: 80%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;


const TabButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    color: white;

    &.active {
        background-color: var(--accent);
    }
`;

const SpiritItem = styled.div`
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
`;

const SpiritsContainer = styled.div`
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
`;

const IconButton = styled(motion.button)`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
`;