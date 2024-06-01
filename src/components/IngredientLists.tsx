import { nanoid } from 'nanoid'
import styled from 'styled-components';
import Button from './Button';
import { Spec } from '../types/Spec';
import { useManageDrinks } from '../hooks/useManageDrinks';
import { SpiritData } from '../types/SpiritData';
import { Technique } from '../types/Technique';

interface IngredientListsProps {
  ingredients: Spec[];
  setIngredients: (ingredients: Spec[]) => void;
  clearDrink: () => void;
  spiritData: SpiritData[];
  technique: Technique;
}

export default function IngredientLists({ingredients, setIngredients, clearDrink, spiritData, technique}: IngredientListsProps) {

    const { addDrinkToState } = useManageDrinks(spiritData);
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
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Ounces</TableHeaderCell>
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
              <Button variant="primary" size="small" onClick={() => addDrinkToState({specs: ingredients, technique: technique})}>
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