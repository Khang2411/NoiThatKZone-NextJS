'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { NewsCard } from '.'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Post } from '@/models';

type NewsListProps = {
    newsList: Array<Post> | undefined
}

export function NewsList({ newsList }: NewsListProps) {
    return (
        <>
            <Box padding={'15px'}>
                <Typography variant='h5' fontWeight={600} textAlign={'center'} padding={'25px'} color={'#415b80'}>Tin tức nổi bật</Typography>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    className="mySwiper"
                >
                    {newsList?.map((item, index: React.Key) =>
                        <SwiperSlide key={index}>
                            <NewsCard news={item}></NewsCard>
                        </SwiperSlide>
                    )}
                </Swiper>
            </Box>
        </>
    )
}