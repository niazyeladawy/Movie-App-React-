import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import unavailableImage from '../../assets/poster-holder.jpg'

export default function People() {
    const [trendingPeople, setTrendingPeople] = useState([]);
    let imgPrefix = 'https://image.tmdb.org/t/p/w500/';
    async function getTrendingPeople(){
        let{data} = await axios.get("https://api.themoviedb.org/3/trending/person/week?api_key=37ded266a817b10c2533ed925229e1ee");
        setTrendingPeople(data.results)
    }

    useEffect(() => {
        getTrendingPeople();
    }, [])
    

    return (
        <div className="row py-5">
                <div className="col-md-6 text-center d-flex align-items-center">
                    <div>
                        
                        <div className="brdr my-3 w-25"></div>
                        <h2>Trending People
                            <br/>to watch <br/> right now
                        </h2>
                        <div className="brdr my-3"></div>
                    </div>
                </div>
                {trendingPeople.map((people , idx) =>
                <div key={idx} className="col-md-3 mb-3">
                    <Link className="people" to={`/actor/${people.id}`}>
                        <img src={people.profile_path ? imgPrefix+people.profile_path:unavailableImage} alt={people.name}  className="w-100"/>
                        <h3 className="h5">{people.name}</h3>
                    </Link>
                </div>
                )}
            </div>
    )
}
