import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import PageContainer from './components/PageContainer';
import Home from './pages/Home';
import Nutrition from './pages/Nutrition';
import { SpiritData } from './types/SpiritData';
import Cocktails from './pages/Cocktails';
import Cocktail from './pages/Cocktail';
import { CocktailData } from './types/CocktailData';
import Dilution from './pages/Dilution';
import { fetchCocktails } from './api/cocktailApi';
import { fetchSpirits } from './api/spiritApi';
import { AuthProvider } from './context/AuthContext';
import AuthForm from './pages/Auth';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import AdminRoute from './components/AdminRoute';
import { DrinksProvider } from './context/DrinksContext';
import DisclaimerPage from './pages/Disclaimer';

function App() {

  //States From DB
  const [cocktailData, setCocktailData] = useState<CocktailData[]>([])
  const [spiritData, setSpiritData] = useState<SpiritData[]>([])
  //Loading States
  const [loadingCocktails, setLoadingCocktails] = useState(true)
  const [loadingSpirits, setLoadingSpirits] = useState(true)


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
        <DrinksProvider>
          <Routes>
            <Route path="/" element={<PageContainer children={<Home />}/>} />
            <Route path="/nutrition" element={<PageContainer children={<Nutrition spiritData={spiritData} loading={loadingSpirits}/>}/>} />
            <Route path="/cocktails" element={<PageContainer children={<Cocktails cocktailData={cocktailData} loading={loadingCocktails}/>} />} />
            <Route path="/cocktail/:slug" element={<PageContainer children={<Cocktail spiritData={spiritData} />} />} />
            <Route path="/dilution" element={<PageContainer children={<Dilution  loading={loadingSpirits} spiritData={spiritData} />} />} />
            <Route path="/auth" element={<PageContainer children={<AuthForm />} />} />
            <Route path="/profile/" element={<PageContainer children={<Profile />} />} />
            <Route path="/profile/:username" element={<PageContainer children={<Profile />} />} />
            <Route path="/admin" element={<PageContainer children={<AdminRoute><AdminPanel /></AdminRoute>} />} />
            <Route path="/disclaimer" element={<PageContainer children={<DisclaimerPage />} />} />
            <Route path="*">"404 Not Found"</Route>
          </Routes>
          </DrinksProvider>
      </AuthProvider>
    </>
  )
}

export default App
