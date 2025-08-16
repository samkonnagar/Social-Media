import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {Pagination, Autoplay } from "swiper/modules";

const Slider = ({ files }) => {
  return (
    <div className="w-full mx-auto mt-10 h-100">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000 }}
        loop={true}
        className="h-100"
      >
        {files.map((file) => (
          <SwiperSlide className="h-100">
            <img
              src={file}
              alt="Slide"
              className="w-full h-100 object-contain rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
