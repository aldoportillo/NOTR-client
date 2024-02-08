import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import axios from "axios";
import PageContainer from './components/PageContainer';
import Home from './pages/Home';
import Nutrition from './pages/Nutrition';
import MyBac from './pages/MyBac';
import { SpiritData } from './types/SpiritData';
import Cocktails from './pages/Cocktails';
import { Spec } from './types/Spec';
import Cocktail from './pages/Cocktail';
import { CocktailData } from './types/CocktailData';

type Drink = Spec[];

function App() {

  //States From DB
  const [cocktailData, setCocktailData] = useState<CocktailData[]>([])
  const [spiritData, setSpiritData] = useState<SpiritData[]>([])
  //Loading States
  const [loadingCocktails, setLoadingCocktails] = useState(true)
  const [loadingSpirits, setLoadingSpirits] = useState(true)

  const [drinks, setDrinks ] = useState<Drink[]>([])
  const [totalEthanol, setTotalEthanol] = useState<number>(0)

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
        <Route path="/nutrition" element={<PageContainer children={<Nutrition spiritData={spiritData} drinks={drinks} setDrinks={setDrinks} setTotalEthanol={setTotalEthanol} loading={loadingSpirits}/>}/>} />
        <Route path="/myBAC" element={<PageContainer children={<MyBac drinks={drinks} setDrinks={setDrinks} totalEthanol={totalEthanol} setTotalEthanol={setTotalEthanol} />} />} />
        <Route path="/cocktails" element={<PageContainer children={<Cocktails cocktailData={cocktailData} loading={loadingCocktails}/>} />} />
        <Route path="/cocktail/:id" element={<PageContainer children={<Cocktail spiritData={spiritData} setDrinks={setDrinks} setTotalEthanol={setTotalEthanol} />} />} />
      </Routes>
    </main>
  )
}

export default App
