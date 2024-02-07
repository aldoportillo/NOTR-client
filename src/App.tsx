import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import axios from "axios";


function App() {
  const [count, setCount] = useState(0)

  //States From DB
  const [cocktailData, setCocktailData] = useState([])
  const [spiritData, setSpiritData] = useState([])
  //Loading States
  const [loadingCocktails, setLoadingCocktails] = useState(true)
  const [loadingSpirits, setLoadingSpirits] = useState(true)

  const [drinks, setDrinks ] = useState([])
  const [totalEthanol, setTotalEthanol] = useState(0)

  useEffect(( ) => {
    axios
      .get(`https://localhost:5000/cocktails`)
      .then(res => {
        const cocktailData = res.data;
        setCocktailData(cocktailData)
        setLoadingCocktails(false)
      })
    axios
      .get('https://localhost:5000/spirits')
      .then(res => {
        const spiritData = res.data;
        setSpiritData(spiritData)
        setLoadingSpirits(false)
      })
}, [])

  return (
    <main>
      <Routes>
        <Route exact path="/" element={<PageContainer children={<Home />}/>} />
      </Routes>
    </main>
  )
}

export default App
