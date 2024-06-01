import useFetchData from "../hooks/useFetchData"
import { useAuth } from "../context/AuthContext"

function Drinks() {

    const { auth } = useAuth()

    

    const res = useFetchData('http://localhost:5000/cocktail-entry', auth.token)

   console.table(res.data);
   
  return (
    <div>Drinks</div>
  )
}

export default Drinks