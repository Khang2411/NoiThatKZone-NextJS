'use client'
import { Banner } from '@/models';
import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type HeroProps = {
    heroList: Array<Banner> | undefined
}

export function Hero({ heroList }: HeroProps) {
    return (
        <Box component={'section'} className='hero'>
            <Box position={'relative'}>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {heroList?.map((hero, index: React.Key) =>
                        <SwiperSlide key={index}>
                            <Image
                                src={hero.thumbnail}
                                alt="Picture of the hero"
                                fill={true}
                            />
                        </SwiperSlide>

                    )}
                </Swiper>
            </Box>
        </Box>
    )
}