"use client"
import { Box } from '@mui/material'
import React from 'react'
import { CollectionCard } from './CollectionCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { Scrollbar } from "swiper/modules";
import { Collection } from '@/models';

type Props = {
    collectionList: Array<Collection>
}

export function CollectionList({ collectionList }: Props) {
    return (
        <Box padding={'15px'}>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                scrollbar={{ enabled: true }}
                breakpoints={{
                    375: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                modules={[Scrollbar]}
                className="mySwiper"
            >
                {collectionList?.map((item: any, index: React.Key | null | undefined) =>
                    <SwiperSlide key={index}>
                        <CollectionCard collection={item}></CollectionCard>
                    </SwiperSlide>
                )}
            </Swiper>
        </Box>
    )
}