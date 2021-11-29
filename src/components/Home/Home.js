import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../MoviesContext';
export default function Home(props) {

    let { trendingMovies, trendingPeople, trendingTv } = useContext(MoviesContext)
    let imgPrefix = 'https://image.tmdb.org/t/p/w500/';


    return (
        <>

            <div className="row py-5">
                <div className="col-md-4 text-center d-flex align-items-center">
                    <div>

                        <div className="brdr my-3 w-25"></div>
                        <h2>Trending Movies
                            <br />to watch <br /> right now
                        </h2>
                        <div className="brdr my-3"></div>
                    </div>
                </div>
                {trendingMovies.map((movie, idx) =>

                    <div key={idx} className="col-md-2 mb-3" >
                        
                        <Link className="movie" to={`/movie/${movie.id}`}>
                        <img src={imgPrefix + movie.poster_path} alt={movie.title} className="w-100" />
                        <h3 className="h5">{movie.title}</h3>
                        </Link>
                        
                    </div>


                )}
            </div>
            <div className="row py-5">
                <div className="col-md-4 text-center d-flex align-items-center">
                    <div>

                        <div className="brdr my-3 w-25"></div>
                        <h2>Trending Tv
                            <br />to watch <br /> right now
                        </h2>
                        <div className="brdr my-3"></div>
                    </div>
                </div>
                {trendingTv.map((tv, idx) =>
                    <div key={idx} className="col-md-2 mb-3">
                        <div className="tv">
                            <img src={imgPrefix + tv.poster_path} alt={tv.name} className="w-100" />
                            <h3 className="h5">{tv.name}</h3>
                        </div>
                    </div>
                )}
            </div>

            <div className="row py-5">
                <div className="col-md-4 text-center d-flex align-items-center">
                    <div>

                        <div className="brdr my-3 w-25"></div>
                        <h2>Trending People
                            <br />to watch <br /> right now
                        </h2>
                        <div className="brdr my-3"></div>
                    </div>
                </div>
                {trendingPeople.map((people, idx) =>
                    <div key={idx} className="col-md-2 mb-3">
                        <div className="people">
                            <img src={imgPrefix + people.profile_path} alt={people.name} className="w-100" />
                            <h3 className="h5">{people.name}</h3>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
