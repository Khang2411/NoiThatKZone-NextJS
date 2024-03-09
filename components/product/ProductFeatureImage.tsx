"use client"
import React, { CSSProperties, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Box } from '@mui/material';

type Props = {
  productImages: Array<string>
}
export function ProductFeatureImage({ productImages }: Props) {
  const [thumbsSwiper, setThumbsSwiper]: Array<any> = useState(null);

  return (
    <Box>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          marginBlockEnd: '15px',
          borderRadius: '15px',
          border: '1px solid #f0f2f5',
          padding: '15px'
        } as CSSProperties}
        loop={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper['destroyed'] ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {productImages?.map((product: any, index: React.Key) =>
          <SwiperSlide key={index}>
            <Image
              src={product}
              alt="Picture of the product"
              width={480}
              height={480}
              quality={100}
              style={{ margin: 'auto', }}
            />
          </SwiperSlide>)}

      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"

      >
        {productImages?.map((product: string, index: React.Key) =>
          <SwiperSlide key={index}>
            <Image src={product} alt='img-feature' fill />
          </SwiperSlide>)}
      </Swiper>
    </Box>
  );
}
