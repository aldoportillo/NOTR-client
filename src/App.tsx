import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import PageContainer from './components/PageContainer';
import Home from './pages/Home';
import Nutrition from './pages/Nutrition';
import MyBac from './pages/MyBac';
import { SpiritData } from './types/SpiritData';
import Cocktails from './pages/Cocktails';
import { Spec } from './types/Spec';
import Cocktail from './pages/Cocktail';
import { CocktailData } from './types/CocktailData';
import Dilution from './pages/Dilution';
import { fetchCocktails } from './api/cocktailApi';
import { fetchSpirits } from './api/spiritApi';
import { AuthProvider } from './context/AuthContext';
import AuthForm from './pages/Auth';
import Profile from './pages/Profile';

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
    const loadCocktailData = async () => {
      try {
        const data: CocktailData[] = await fetchCocktails();

        setCocktailData(data);
      } catch (error) {
        console.error("Error fetching cocktail data:", error);
      } finally {
        setLoadingCocktails(false);
      }
    };

    const loadSpiritData = async () => {
      try {
        const data: SpiritData[] = await fetchSpirits();
        setSpiritData(data);
      } catch (error) {
        console.error("Error fetching spirit data:", error);
      } finally {
        setLoadingSpirits(false);
      }
    };

    loadCocktailData();
    loadSpiritData();
  }, []);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PageContainer children={<Home />}/>} />
          <Route path="/nutrition" element={<PageContainer children={<Nutrition spiritData={spiritData} drinks={drinks} setDrinks={setDrinks} setTotalEthanol={setTotalEthanol} loading={loadingSpirits}/>}/>} />
          <Route path="/myBAC" element={<PageContainer children={<MyBac drinks={drinks} setDrinks={setDrinks} totalEthanol={totalEthanol} setTotalEthanol={setTotalEthanol} />} />} />
          <Route path="/cocktails" element={<PageContainer children={<Cocktails cocktailData={cocktailData} loading={loadingCocktails}/>} />} />
          <Route path="/cocktail/:slug" element={<PageContainer children={<Cocktail spiritData={spiritData} setDrinks={setDrinks} setTotalEthanol={setTotalEthanol} />} />} />
          <Route path="/dilution" element={<PageContainer children={<Dilution  loading={loadingSpirits} spiritData={spiritData} drinks={drinks} setDrinks={setDrinks} setTotalEthanol={setTotalEthanol}/>} />} />
          <Route path="/auth" element={<PageContainer children={<AuthForm />} />} />
          <Route path="/profile/" element={<PageContainer children={<Profile />} />} />
          <Route path="/profile/:username" element={<PageContainer children={<Profile />} />} />
          <Route path="*">"404 Not Found"</Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
