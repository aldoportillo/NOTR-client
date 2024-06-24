import styled from 'styled-components';
import { motion } from 'framer-motion';

const Hamburger = ({ toggled, toggle }) => {

    const toggleMenu = () => {
        toggle(!toggled);
    }
    
  return (
    <MenuButton onClick={toggleMenu} aria-label='toggle menu'>
      <Line
        variants={lineVariants}
        animate={toggled ? "opened" : "closed"}
        initial={false}
      />
      <Line
        variants={lineVariants}
        animate={toggled ? "secondLineOpened" : "secondLineClosed"}
        initial={false}
      />
      <Line
        variants={lineVariants}
        animate={toggled ? "thirdLineOpened" : "thirdLineClosed"}
        initial={false}
      />
    </MenuButton>
  );
};

export default Hamburger;

const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  gap: 3px;
  z-index: 10;
  &:focus {
    outline: none;
  }
`;

const Line = styled(motion.div)`
  width: 100%;
  height: 3px;
  background: white; 
  border-radius: 10px;
`;

const lineVariants = {
  opened: {
    rotate: -225, 
    translateY: 9,
    transition: { duration: 0.3 }
  },
  closed: {
    rotate: 0,
    translateY: 0,
    transition: { duration: 0.3 }
  },
  secondLineOpened: {
    opacity: 0,
    rotate: 500,
    transition: { duration: 0.3 }
  },
  secondLineClosed: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  thirdLineOpened: {
    rotate: -135,
    translateY: -9,
    transition: { duration: 0.3 }
  },
  thirdLineClosed: {
    rotate: 0,
    translateY: 0,
    transition: { duration: 0.3 }
  }
};
