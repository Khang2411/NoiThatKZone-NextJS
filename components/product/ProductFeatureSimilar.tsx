"use client"
import { Box, Typography } from '@mui/material';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '.';
import { Product } from '@/models';

type Props = {
    products: Array<Product>
}

export function ProductFeatureSimilar({ products }: Props) {
    return (
        <Box>
            <Typography variant='h5' fontWeight={600} padding={'20px'} color={'#415b80'}>Các sản phẩm tương tự</Typography>
            <Swiper
                breakpoints={{
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                }}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {products?.map((item, index) =>
                    <SwiperSlide key={index}>
                        <Box height={'100%'}>
                            <ProductCard product={item}></ProductCard>
                        </Box>
                    </SwiperSlide>
                )}
            </Swiper>
        </Box>
    )
}