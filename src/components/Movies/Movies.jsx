import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Movies() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    let imgPrefix = 'https://image.tmdb.org/t/p/w500/';
    async function getTrendingMovies(){
        let{data} = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=37ded266a817b10c2533ed925229e1ee");
        setTrendingMovies(data.results)
    }

    useEffect(() => {
        getTrendingMovies();
    }, [])
    
    return (
        <div className="row py-5">
                <div className="col-md-6 text-center d-flex align-items-center">
                    <div>
                        
                        <div className="brdr my-3 w-25"></div>
                        <h2>Trending Movies
                            <br/>to watch <br/> right now
                        </h2>
                        <div className="brdr my-3"></div>
                    </div>
                </div>
                {trendingMovies.map((movie , idx) =>
                    <div key={idx} className="col-md-3 mb-3" >
                        <Link className="movie" to={`/movie/${movie.id}`}>
                            <img src={imgPrefix+movie.poster_path} alt={movie.title}  className="w-100"/>
                            <h3 className="h5">{movie.title}</h3>
                        </Link>
                    </div>
                )}
            </div>
    )
}
