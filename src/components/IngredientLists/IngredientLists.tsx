import { nanoid } from 'nanoid'
import styled from 'styled-components';
import Button from '../Button/Button';
import { Spec } from '../../types/Spec';

interface IngredientListsProps {
  ingredients: Spec[];
  setIngredients: (ingredients: Spec[]) => void;
  clearDrink: () => void;
  addDrinkToState: () => void;
}

export default function IngredientLists({ingredients, setIngredients, clearDrink, addDrinkToState}: IngredientListsProps) {

    const removeIngredient = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
         setIngredients(ingredients.filter(function(obj) {
            return obj.spirit !== e.currentTarget.innerText
         }))
    }

    const renderIngredients = ingredients.map(ingredient => {
            return(
                <TableRow key={nanoid()}> 
                    <TableCell onDoubleClick={e => removeIngredient(e)}>{ingredient.spirit}</TableCell>
                    <TableCell>{ingredient.ounces}</TableCell>
                </TableRow>
            )
        })
        
  return (
    <Wrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>name</TableHeaderCell>
            <TableHeaderCell>ounces</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>{renderIngredients}</tbody>
        <tfoot>
          <TableRow>
            <TableCell>
              <Button variant="secondary" size="small" onClick={() => clearDrink()}>
                Clear Drink
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="primary" size="small" onClick={() => addDrinkToState()}>
                Add Drink
              </Button>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </Wrapper>
    
  )
}
const Wrapper = styled.div`
    background-color: #838383;
    width: 100%;
    grid-area: ingredients;
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