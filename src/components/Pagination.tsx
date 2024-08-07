import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { IoAddCircleOutline } from 'react-icons/io5';


function Pagination({ children, totalItems, searchTerm, cocktailData }) {
    const [pageNumbers, setPageNumbers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCocktails = children.slice(indexOfFirstItem, indexOfLastItem);

    const { auth } = useAuth();

    function mergeCocktailData(source, supplement) {
        return { ...supplement, ...source };
    }

    const addSpirit = async (spiritId, spiritName) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URI}/users/my-fridge`, { spiritId, spiritName }, {
                headers: { Authorization: `Bearer ${auth.token}`, 'x-access-token': import.meta.env.VITE_SERVER_KEY }
            });
            toast.success(`🥶${spiritName} added to fridge!🥶`);
        } catch (error) {
            toast.error(`Failed to add ${spiritName} to fridge!`);
            console.error('Failed to add item:', error);
        }
    }

    const renderMissingSpirits = (spirits) => {
        return spirits.map(spirit => {
            return (
                <MissingSpirit key={spirit.id}>
                {spirit.name}
                <IconButton 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    onClick={() => addSpirit(spirit.id, spirit.name)}>
                        <IoAddCircleOutline size={24} />
                </IconButton>
            </MissingSpirit>
            )
        })
    }

    const renderCocktails = currentCocktails.map(cocktail => {
        const {id, name, glass, slug, image_url, spirits_missing = []} = cocktail;
        return (
            <CocktailCard key={id}>
                <Link to={`/cocktail/${slug}`} state={{ from: "cocktail", data: mergeCocktailData(cocktail, cocktailData.find(c => c.id === cocktail.id))}}>
                    <h3>{name}</h3>
                    <img src={image_url} alt={`${name} inside a ${glass} glass`} />
                    {(spirits_missing.length > 0) && renderMissingSpirits(spirits_missing) }
                </Link>
            </CocktailCard>
        );
    });

    useEffect(() => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const numbers = [];
        for (let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }
        setPageNumbers(numbers);
    }, [totalItems, itemsPerPage]);


    

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    return (
        <PaginationWrapper>
            <CocktailListContainer>
                {renderCocktails}
            </CocktailListContainer>
            <PaginationFooter>
                {pageNumbers.map(number => (
                    <PageNumber
                        key={number}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={currentPage === number ? 'active' : ''}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </PageNumber>
                ))}
            </PaginationFooter>
        </PaginationWrapper>
    );
}

export default Pagination;


const PaginationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const PaginationFooter = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const PageNumber = styled(motion.button)`
    padding: 10px 15px;
    border: none;
    background-color: var(--accent);
    color: white;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: var(--overlay);
    }

    &.active {
        background-color: var(--header);
    }
`;

const CocktailListContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;

    @media only screen and (min-width:1025px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
`

const CocktailCard = styled.a`
    a {
        width: 80vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #838383;
        border-radius: 1vh;
        margin: 5px;
        
    }
  
    a > img{
        width: 100%;
        border-radius: 1vh;
    }

    @media only screen and (min-width:1025px) {
        a{
          width: 25vw;
        }
        
        a >img{
          width: 25vw;
          height: 18vw;
        }
      }
`
const MissingSpirit = styled.p`
    color: #C80815;
    text-decoration: line-through; 
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%; 
`;

const IconButton = styled(motion.button)`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
`;