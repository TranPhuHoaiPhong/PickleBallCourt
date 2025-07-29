import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderComponent = ({arrImages}) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false 
    };
    
  return (
    <div style={{overflow: 'hidden'}}>
        <Slider {...settings} >
        {arrImages.map((image, index) => (
            <div key={index} id='headerSlider'>
                <img src={image} alt='slider'
                style={{ height: "100%", objectFit: 'cover'}}
                width="100%" 
                />
            </div>
        ))}

    </Slider>
    </div>
    
  )
}

export default SliderComponent