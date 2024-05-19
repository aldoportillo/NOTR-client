import React from 'react';
import styled from 'styled-components';

interface TableProps {
  headers: string[];
  data: any[];
}

const TableCellContent = ({ item, header }) => {
    const content = item[header];
    if (typeof content === 'object' && content !== null) {
      return `${content.name || ''} ${content.type || ''}`;
    }
    return content;
  };

const GenericTable: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <Wrapper>
      <Table>
        <TableHeader>
          <tr>
            {headers.map(header => (
              <TableHeaderCell key={header}>{header}</TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {headers.map(header => (
                <TableCell key={`${header}-${index}`}>
                  <TableCellContent item={item} header={header} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default GenericTable;

const Wrapper = styled.div`
    background-color: #838383;
    width: 100%;
    grid-area: ingredients;
    overflow-x: scroll;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #23272a;
  color: white;
  table-layout: fixed;
`;

const TableHeader = styled.thead`
  background-color: rgb(244, 154, 115);
`;

const TableHeaderCell = styled.th`
  border: 1px solid #23272a;
  padding: 8px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #23272a;
  padding: 8px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #23272a;
  }
`;
