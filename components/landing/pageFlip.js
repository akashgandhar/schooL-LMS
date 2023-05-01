import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { EffectCoverflow, Pagination, Navigation } from 'swiper'

// import slide_image_1 from './assets/images/img_1.jpg';
// import slide_image_2 from './assets/images/img_2.jpg';
// import slide_image_3 from './assets/images/img_3.jpg';
// import slide_image_4 from './assets/images/img_4.jpg';
// import slide_image_5 from './assets/images/img_5.jpg';
// import slide_image_6 from './assets/images/img_6.jpg';
// import slide_image_7 from './assets/images/img_7.jpg';

function Images() {
  const images = [
    { url: 'https://wallpapercave.com/wp/wp3137839.jpg' },
    { url: 'https://foro.geeknetic.es/filedata/fetch?id=220615&d=1598015914' },
    {
      url:
        'https://wallpapersmug.com/download/3840x2160/11a3dc/firewatch-game-sunset-artwork.jpg',
    },
    { url: 'https://cdn.wallpapersafari.com/37/36/4UgH0k.jpg' },
  ]
  return (
    <div className="w-96 xl:w-[40rem] ">
      <div>
        <h1 className="text-2xl font-bold underline text-center m-2 p-2">
          Image Gallery
        </h1>
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1.5}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {images.map((e,index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={e.url}
                className="object-cover w-full aspect-video"
                alt="slide_image"
              />
            </SwiperSlide>
          )
        })}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  )
}

export default Images
