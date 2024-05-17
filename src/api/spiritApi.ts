import fetchData from './axiosRequests';
import {Spirit} from '../types/Spirit';


export const fetchSpirits = async (): Promise<Spirit[]> => {
  let url = `${import.meta.env.VITE_SERVER_URI}/spirits`;

  if (process.env.NODE_ENV === 'development') {
    url = `${import.meta.env.VITE_SERVER_URI}/spirits`;
  }
  
  return await fetchData<Spirit[]>(url);
};
