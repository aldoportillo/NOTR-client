import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url: string, token: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
};

export default useFetchData;
