import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import noImg from '../../images/castnon.jpg'
const handleDragStart = (e) => e.preventDefault();



const Carousel = ({ cast}) => {
    let imgPrefix = 'https://image.tmdb.org/t/p/w500/';

    const items = cast?.map((c) => (
        <div className="carouselItem ">
            <img src={c.profile_path ? `${imgPrefix}/${c.profile_path}`: noImg} alt={c?.name} onDragStart={handleDragStart} className="w-100" />
            <h6 className="mt-3">{c?.name}</h6>
            <p className='car-tex'>{c?.character}</p>
        </div>
    ))

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5
        },
        1024: {
            items: 7
        }
    }


    return (
        <AliceCarousel autoPlay responsive={responsive} infinite disableDotsControls disableButtonsControls mouseTracking items={items} />
    );
}
export default Carousel;