import { Beverage } from "../types/Beverage";
import axios from 'axios';

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url, { headers: { 'x-access-token': import.meta.env.VITE_SERVER_KEY } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const fetchBeverage = async (upcCode): Promise<Beverage[]> => {
    let url = `${import.meta.env.VITE_SERVER_URI}/beverages/${upcCode}`;

    if (process.env.NODE_ENV === 'development') {
      url = `${import.meta.env.VITE_SERVER_URI}/beverages/${upcCode}`;
    }
    
  return await fetchData<Beverage[]>(url);
};



