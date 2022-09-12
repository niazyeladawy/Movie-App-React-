import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../MoviesContext';
import unavailableImage from '../../assets/poster-holder.jpg'

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

                    <div key={idx} className="col-md-2 mb-3 " >

                        <Link className="movie position-relative d-block" to={`/movie/${movie.id}`}>
                            <span className="position-absolute top-0 end-0  badge rounded-pill bg-danger">
                                {
                                    movie?.vote_average.toFixed(1)
                                }
                            </span>
                            <img src={movie.poster_path ? (imgPrefix + movie.poster_path) : unavailableImage} alt={movie.title} className="w-100" />
                            <h3 className="h5 mt-3">{movie.title}</h3>
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
                        <Link className="tv position-relative d-block" to={`/show/${tv.id}`}>
                            <span className="position-absolute top-0 end-0  badge rounded-pill bg-danger">
                                {
                                    tv?.vote_average.toFixed(1)
                                }
                            </span>
                            <img src={tv.poster_path ? (imgPrefix + tv.poster_path) : unavailableImage} alt={tv.name} className="w-100" />
                            <h3 className="h5 mt-3">{tv.name}</h3>
                        </Link>
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
                        <Link className="people position-relative d-block" to={`/actor/${people.id}`}>
                            
                            <img src={people.profile_path ? (imgPrefix + people.profile_path) : unavailableImage} alt={people.name} className="w-100" />
                            <h3 className="h5 mt-3">{people.name}</h3>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
