import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { route } from "../routes";
import axios from "axios";

const AuthContext = createContext({});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
 

  const options = {
    method: 'GET',
    url: 'https://movies-api14.p.rapidapi.com/movies',
    headers: {
      'X-RapidAPI-Key': 'ee0bb87444msh6e0164788236e5bp1d9940jsn8bbdb8bf4252',
      'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
    }
  };

  
const search = {
  method: 'GET',
  url: 'https://movies-api14.p.rapidapi.com/search',
  params: {
    query: 'breaking bad'
  },
  headers: {
    'X-RapidAPI-Key': 'ee0bb87444msh6e0164788236e5bp1d9940jsn8bbdb8bf4252',
    'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
  }
};
  const getData = async () => {
   try {
      //console.log("hi");
     	const nowPlaying = await axios.request(options);
	   // console.log(response.data);
      //console.log("API : " , nowPlaying.data.movies);
      

      const popular = await axios.request(options);
      const topRated = await axios.request(options);
      const upcoming = await axios.request(options);
      const trending = await axios.request(options);
      setNowPlaying(nowPlaying.data.movies);
      setPopular(popular.data.movies);
      setTopRated(topRated.data.movies);
      setUpcoming(upcoming.data.movies);
      setTrending(trending.data.movies);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }

    
// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }


   };


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const memoedValue = useMemo(
    () => ({
      loading,
      nowPlaying,
      popular,
      topRated,
      upcoming,
      trending,
      onRefresh,
      refreshing,
    }),
    [
      loading,
      nowPlaying,
      popular,
      topRated,
      upcoming,
      trending,
      onRefresh,
      refreshing,
    ]
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
