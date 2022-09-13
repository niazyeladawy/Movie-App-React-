import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { titleChange } from '../../general functions/titleChange';
import SimpleSlider from '../Slider/SimpleSlider ';

export default function PeopleDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [credits, setCredits] = useState([]);
    let imgPrefix = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/';
    
    const fetchMovie = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=37ded266a817b10c2533ed925229e1ee&language=en-US`);
        setMovie(data);
        titleChange(`Actor Details ${data.title}`);
    }
    const fetchCredits = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=37ded266a817b10c2533ed925229e1ee&language=en-US`);
        setCredits(data.cast);
    }


    useEffect(() => {
        fetchMovie();
        fetchCredits();
        // eslint-disable-next-line
    }, []);

    return (

        <div className="moviedetails">
            {
                movie.profile_path ? (
                    <>
                     <div className="moviedetail__header py-4" >
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="border-5 overflow-hidden">
                            <img src={imgPrefix + movie.profile_path} alt={movie.title} className="w-100 " />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="item">
                            <h2 className='fw-bold'>{movie.name}</h2>
                            <h5>Biography</h5>
                            <p className="actor__biography">{movie.biography}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <div>
                        <h5 className="fw-bold">Personal Info</h5>
                        <p className="mb-3"><strong className="d-block">Known For</strong>{movie.known_for_department}</p>
                        <p className="mb-3"><strong className="d-block">Known Credits</strong>{credits.length}</p>
                        <p className="mb-3"><strong className="d-block">Gender</strong>{movie.gender === 1 ? "Female" : "Male"}</p>
                        <p className="mb-3"><strong className="d-block">Birthday</strong>{movie.birthday}</p>
                        <p className="mb-3"><strong className="d-block">Place of Birth</strong>{movie.place_of_birth}</p>
                        <div className="mb-3"><strong className="d-block">Also Known As</strong>{movie.also_known_as?.map((as,idx)=> <p className="my-1" key={idx}>{as}</p>)}</div>
                    </div>
                </div>
            </div></>
                ):
                <h1 className='text-center'>Profile Not available</h1>
            }
           
        </div>
    )
}
