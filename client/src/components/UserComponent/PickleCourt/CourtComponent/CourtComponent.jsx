import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCity } from "react-icons/fa";
import DropdownH from '../Component/DropdownHuyen/Dropdown';
import SearchComponent from '../Component/SearchComponent/SearchComponent';
import { useNavigate } from 'react-router-dom';


function CourtComponent({arrImages}) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false 
    };

    const navigate = useNavigate(); 
    const HandleClickSearch = () => {
        console.log("Search button clicked");
        navigate("/searchPage");
    }

  return (
    <>
        <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
            <Slider {...settings}>
            {arrImages.map((image, index) => (
                <div key={index} id="headerSlider">
                <img
                    src={image}
                    alt="slider"
                    style={{ height: "100%", objectFit: "cover" }}
                    width="100%"
                />
                </div>
            ))}
            </Slider>
        </div>

        <div style={{ backgroundColor: "white", textAlign: "center", marginBottom: "50px"}}>
            <div style={{ 
                position: "relative",
                zIndex: 2,
                background: "white",
                margin: "auto",
                height: "100px",
                width: "50%",
                marginTop: "-50px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                border: "1px solid #d9d9d9",
                borderRadius: "20px",
                boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.15)"
            }}>
                <div style={{ fontSize: "14px", width: "25%", border: "1px solid #d9d9d9", padding: "10px 7px", borderRadius: "6px", boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15)", cursor: "not-allowed", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <FaCity style={{ marginRight: "10px"}}/>
                    <span>Thành Phố Cần Thơ </span>
                </div>
                <div style={{ width: "25%", cursor:"pointer"}}><DropdownH/></div>
                <div style={{ width: "25%"}}><SearchComponent onClick={HandleClickSearch}/></div>
            </div>
        </div>
    </> 
  )
}

export default CourtComponent




