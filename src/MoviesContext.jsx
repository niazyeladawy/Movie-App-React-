import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let MoviesContext = createContext([]);

export function MoviesContextProvider(props){
    let [trendingMovies, setTrendingMovies] = useState([]);
    let [trendingTv, setTrendingTv] = useState([]);
    let [trendingPeople, setTrendingPeople] = useState([]);
    

    

    async function getTrendingMedia(mediaType , callback){
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=37ded266a817b10c2533ed925229e1ee`);
        callback(data.results.slice(0,10));
    }

    useEffect(() => {
        getTrendingMedia('movie',setTrendingMovies);
        getTrendingMedia('tv',setTrendingTv);
        getTrendingMedia('person',setTrendingPeople);
        
        return()=>{
            setTrendingMovies([]);

        }

    }, [])



    return(
        <MoviesContext.Provider value={{trendingMovies,trendingPeople,trendingTv}}>
            {props.children}
        </MoviesContext.Provider>
    )
}
