import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import SimpleSlider from '../Slider/SimpleSlider ';

export default function TvDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [cast, setCast] = useState([]);
    const [keywords, setKeywords] = useState([]);
    let imgPrefix = 'https://image.tmdb.org/t/p/w500/';
    let networkPath = 'https://www.themoviedb.org/t/p/h30';

console.log(id);
    const fetchMovie = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=37ded266a817b10c2533ed925229e1ee&language=en-US`);
        setMovie(data);
        setGenres(data.genres);
    }

    const fetchCast = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=37ded266a817b10c2533ed925229e1ee&language=en-US`);
        setCast(data.cast);

    }

    const fetchkeywords = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/keywords?api_key=37ded266a817b10c2533ed925229e1ee`);
        setKeywords(data.keywords);
    }

    useEffect(() => {
        fetchMovie();
        fetchCast();
        fetchkeywords();

        // eslint-disable-next-line
    }, []);





    return (

        <div className="moviedetails">
            <div className="moviedetail__header py-4" >
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="border-5 overflow-hidden">
                            <img src={imgPrefix + movie.poster_path} alt={movie.title} className="w-100 " />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="item">
                            <h2>{movie.title}</h2>
                            <p>{genres.map((genre, idx) => <span key={idx}>{genre.name},</span>)}</p>
                            <div className="flex-wrapper">
                                <div className="single-chart">
                                    <svg viewBox="0 0 36 36" className="circular-chart orange">
                                        <path className="circle-bg"
                                            d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path className="circle"
                                            strokeDasharray={`${movie.vote_average * 10}, 100`}
                                            d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <text x="18" y="20.35" className="percentage text-white">{movie.vote_average * 10}%</text>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="my-2">Overview</h3>
                            <p>{movie.overview}</p>

                        </div>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col-10 mt-4">
                    <SimpleSlider cast={cast} />
                </div>
                <div className="col-md-2">
                    <div className="movie__details">
                        <p className="mb-3"><strong className="d-block">Status</strong>{movie.status}</p>
                        <p className="mb-3"><strong className="d-block">Original Language</strong>{movie.original_language}</p>
                        <p className="mb-3"><strong className="d-block">Networks</strong>{movie.networks?.map((n)=> <img className='my-2' src={networkPath+n.logo_path} alt={n.name}/>)
                        }</p>
                        
                        <p className="mb-3"><strong className="d-block">Type</strong>{movie.type}</p>
                        
                        <div className="keywords">
                            {
                                keywords?.map((k) => (
                                    <p key={k.id}>{k.name}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
