import { useEffect, useState } from 'react';
import { UserMetrics } from '../types/UserMetrics';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useDrinks } from '../context/DrinksContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

export default function Bac({ userMetrics }: { userMetrics: UserMetrics }) {
  const [bac, setBac] = useState<number>(0);
  const { totalEthanol } = useDrinks();
  console.log('totalEthanol:', totalEthanol);

  useEffect(() => {
    if (userMetrics && userMetrics.weight && userMetrics.height) {
      calculateBAC(userMetrics);
    }
  }, [userMetrics, totalEthanol]);

  const calculateBAC = (metrics: UserMetrics) => {
    if (!metrics.weight || metrics.height === undefined) {
      toast('Please fill all fields.');
      return;
    }

    const bmi = 703 * (metrics.weight / (metrics.height ** 2));
    const widmarkFactor = metrics.sex === 'male' ? 1.0181 - (0.01213 * bmi) : 1.0181 - (0.01240 * bmi);
    const calculatedBac = (totalEthanol * 100) / (widmarkFactor * (453.592 * metrics.weight));
    setBac(calculatedBac);
  };

  return (
    <Wrapper>
      <Title>Blood Alcohol Content <Link to="/disclaimer"><FaInfoCircle /></Link></Title>
      <CircularProgressbar
        value={bac}
        text={`${bac.toFixed(2)}%`}
        styles={buildStyles({
          textColor: 'white',
          pathColor: bac > 0.08 ? 'red' : bac > 0.05 ? 'yellow' : 'green',
          trailColor: 'darkgray'
        })}
        minValue={0}
        maxValue={0.4}
      />
      <Subheader>You have consumed {totalEthanol.toFixed(2)}g of ethanol</Subheader>
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