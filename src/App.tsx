import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import axios from "axios";
import PageContainer from './components/PageContainer';
import Home from './pages/Home';
import Nutrition from './pages/Nutrition';


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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cocktails`)
      .then(res => {
        const cocktailData = res.data;
        setCocktailData(cocktailData);
        setLoadingCocktails(false);
      })
      .catch(error => {
        console.error("Error fetching cocktail data:", error);
        setLoadingCocktails(false);
      });

    axios
      .get('http://localhost:5000/spirits')
      .then(res => {
        const spiritData = res.data;
        setSpiritData(spiritData);
        setLoadingSpirits(false);
      })
      .catch(error => {
        console.error("Error fetching spirit data:", error);
        setLoadingSpirits(false);
      });
  }, []);


  return (
    <main>
      <Routes>
        <Route path="/" element={<PageContainer children={<Home />}/>} />
        <Route path="/nutrition" element={<PageContainer children={<Nutrition spiritData={spiritData} drinks={drinks} setDrinks={setDrinks} totalEthanol={totalEthanol} setTotalEthanol={setTotalEthanol} loading={loadingSpirits}/>}/>} />
      </Routes>
    </main>
  )
}

export default App
