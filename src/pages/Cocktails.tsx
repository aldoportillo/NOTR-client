import { Link } from 'react-router-dom'
import LoadingGif from '../assets/loading.gif'
import { CocktailData } from '../types/CocktailData'



interface CocktailProps {
    cocktailData: CocktailData[];
    loading: boolean;
}

export default function Cocktails({cocktailData, loading}: CocktailProps) {

    

    const renderCocktails = cocktailData?.map(cocktail => {
        const {name, _id, image} = cocktail
        return (
            <div key={_id} className='cocktail-card'>
                <Link to={`/cocktail/${_id}`} state={{ from: "cocktail", data: cocktail}}>
                    <h3>{name}</h3>
                    <img src={image.filePath} alt="" />
                </Link>
            </div>
        )
    })
    
  return (
    <div className='cocktails-page'>
        <h2>Cocktails</h2>
            {loading ?
            <img src={LoadingGif} className="loader" alt="loader"/> :
            <div className='cocktail-list-container'>
                {renderCocktails}
            </div>}  
    </div>
  )
}