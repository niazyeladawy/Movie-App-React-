import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Tv() {
    const [trendingTv, setTrendingTv] = useState([]);
    let imgPrefix = 'https://image.tmdb.org/t/p/w500/';
    async function getTrendingTv(){
        let{data} = await axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=37ded266a817b10c2533ed925229e1ee");
        setTrendingTv(data.results)
    }

    useEffect(() => {
        getTrendingTv();
    }, [])
    
    return (
        <div className="row py-5">
                <div className="col-md-6 text-center d-flex align-items-center">
                    <div>
                        
                        <div className="brdr my-3 w-25"></div>
                        <h2>Trending Tv
                            <br/>to watch <br/> right now
                        </h2>
                        <div className="brdr my-3"></div>
                    </div>
                </div>
                {trendingTv.map((tv , idx) =>
                <div key={idx} className="col-md-3 mb-3">
                    <div className="tv">
                        <img src={imgPrefix+tv.poster_path} alt={tv.name}  className="w-100"/>
                        <h3 className="h5">{tv.name}</h3>
                    </div>
                </div>
                )}
            </div>
    )
}
