import { nanoid } from 'nanoid'

export default function IngredientLists({ingredients, setIngredients, clearDrink, addDrinkToState}) {

    const removeIngredient = (e) => {
         setIngredients(ingredients.filter(function(obj) {
            return obj.spirit !== e.target.innerText
         }))
    }

    //On key={nanoid()} use database id later but handle when a new thing is submitted under the same id by mod cocktail object

    const renderIngredients = ingredients.map(ingredient => {
            return(
                <tr key={nanoid()}> 
                    <td onDoubleClick={e => removeIngredient(e)}>{ingredient.spirit}</td>
                    <td>{ingredient.ounces}</td>
                </tr>
            )
        })
        
  return (
    <>
    <table className='ingredient-list'>
        <caption>Ingredient List</caption>
        <thead>
            <tr className='table-head'>
                <th>name</th>
                <th>ounces</th>
            </tr>
        </thead>
        <tbody>
        {renderIngredients}
        </tbody>
        <tfoot>
            <tr>
                <td><button onClick={() =>  clearDrink()}>Clear Drink</button></td>
                <td><button onClick={() => addDrinkToState()}>Add Drink</button></td>
            </tr>
        </tfoot>
        
    </table>
    </>
    
  )
}