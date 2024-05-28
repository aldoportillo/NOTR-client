import { useEffect, useMemo, useState } from 'react';
import { UserMetrics } from '../types/UserMetrics';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useDrinks } from '../context/DrinksContext';
import { useAuth } from '../context/AuthContext'; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

export default function Bac({ userMetrics, userId, isCurrentUser, name }: { userMetrics: UserMetrics, userId: string, isCurrentUser: boolean, name: string}) {
  const [bac, setBac] = useState<number>(0);
  const { drinks, totalEthanol, setTotalEthanol } = useDrinks();
  const { auth } = useAuth();

  const stableDrinks = useMemo(() => {
    //TODO: Once we remove "totalEthanol" state, we will expand this useMemo. I still need to think. Experimenting ATM. Maybe reducing drinks and if ethanol changes, then we can update the totalEthanol state.
    return [...drinks];
  }, [drinks]);
  
  const fetchBAC = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/ethanol/bac`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
        })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch BAC data');
      }
      const data = await response.json();
      setBac(data.bac);
      setTotalEthanol(data.totalEthanol);
    } catch (error) {
      console.error('Error fetching BAC data:', error);
      toast(`Error: ${error.message}`);
    }
  };

  

  useEffect(() => {
    if (userMetrics && userMetrics.weight && userMetrics.height) {
      fetchBAC();
    }
  }, [userMetrics, auth.token, stableDrinks]); 

  return (
    <Wrapper>
      <Title>Blood Alcohol Content <Link to="/disclaimer"><FaInfoCircle /></Link></Title>
      <CircularProgressbar
        value={bac}
        text={`${bac}`}
        styles={buildStyles({
          textColor: 'white',
          pathColor: bac > 0.08 ? 'red' : bac > 0.05 ? 'yellow' : 'green',
          trailColor: 'darkgray'
        })}
        minValue={0}
        maxValue={0.4}
      />
      {isCurrentUser ? <Subheader>You have {totalEthanol.toFixed(2)}g of ethanol in your system</Subheader> : <Subheader>{name} has {totalEthanol.toFixed(2)}g of ethanol in their system</Subheader>}
      <Subheader>Approximately {(bac / 0.015).toFixed(2)} hours til sober</Subheader>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  background-color: var(--header);
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

const Title = styled.h3`
  color: var(--accent);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  a {
    color: var(--accent);
    display: flex;
  }
`;

const Subheader = styled.p`
    margin-top: 20px;
    color: white;
`;
