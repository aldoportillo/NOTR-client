import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
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

function Pagination({  totalItems, itemsPerPage, currentPage, onPageChange }) {
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const numbers = [];
        for (let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }
        setPageNumbers(numbers);
    }, [totalItems, itemsPerPage]);

    return (
        <PaginationWrapper>
            {pageNumbers.map(number => (
                <PageNumber
                    key={number}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={currentPage === number ? 'active' : ''}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </PageNumber>
            ))}
        </PaginationWrapper>
    );
}

export default Pagination;
