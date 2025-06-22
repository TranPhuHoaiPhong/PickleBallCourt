import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

// Import hình ảnh
import i1 from "../../../assets/introduction/i1.webp";
import i2 from "../../../assets/introduction/i2.webp";
import i3 from "../../../assets/introduction/i3.webp";
import i4 from "../../../assets/introduction/i4.webp";
import i5 from "../../../assets/introduction/i2.webp";
import i6 from "../../../assets/introduction/i3.webp";

const FavoritePage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Kiểm tra kích thước màn hình khi cửa sổ thay đổi
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    // Gọi ngay khi component mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const images = [i1, i2, i3, i4, i5, i6];

  if (isSmallScreen) {
    return null; // Nếu màn hình nhỏ hơn 1024px, không render Swiper
  }

  return (
    <div className="relative w-full flex flex-col items-center" style={{ marginBottom: '50px'}}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={-200}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 3,
          slideShadows: false,
        }}
        speed={1000}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={true}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="rounded-lg transition-all duration-500 w-[250px] md:w-[300px] lg:w-[350px] object-cover"
              style={{ border: '1px solid black'}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FavoritePage;
