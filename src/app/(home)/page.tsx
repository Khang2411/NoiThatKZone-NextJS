'use client'
import { BannerList } from '@/components/banner'
import { CollectionList } from '@/components/category'
import { Hero } from '@/components/hero'
import { NewsList } from '@/components/news'
import { ProductList } from '@/components/product'
import { useBestSeller, useCollectionHomeList, usePost } from '@/hook'
import { useBanner } from '@/hook/use-banner-list'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Loading from './Loading'

export default function Home() {
    const { data: dataCollection } = useCollectionHomeList({})
    const { data: dataProduct } = useBestSeller({})
    const { data: dataPost } = usePost({ params: { limit: 3 } })
    const { data: dataBanner, isLoading } = useBanner({})

    if (isLoading) return <Loading></Loading>

    return (
        <Box>
            <Box component={'section'} sx={{ width: '100%', maxWidth: '1480px', margin: 'auto' }}>
                <Hero heroList={dataBanner?.data.sliders}></Hero>
            </Box>
            <Box sx={{ width: '100%', maxWidth: '1460px', margin: 'auto' }}>
                <Box component={'section'} padding={'15px'}>
                    <Box sx={{ background: '#ffff', borderRadius: '15px' }}>
                        <Typography variant='h5' fontWeight={600} padding={'20px'} color={'#415b80'}>DANH MỤC NỔI BẬT</Typography>
                        <CollectionList collectionList={dataCollection?.data}></CollectionList>
                    </Box>
                </Box>

                <Box component={'section'}>
                    <BannerList bannerList={dataBanner?.data.banners!} ></BannerList>
                </Box>

                <Box component={'section'}>
                    <Box sx={{ background: '#ffff', marginBlockEnd: '35px', borderRadius: '15px' }}>
                        <Typography variant='h5' fontWeight={600} padding={'25px'} color={'#415b80'}>SẢN PHẨM BÁN CHẠY <LocalFireDepartmentIcon fontSize='large' sx={{ color: '#CD1817' }} /></Typography>
                        <ProductList productList={dataProduct?.data.list_best_seller}></ProductList>
                        <Box textAlign={'center'} padding={'18px'}>
                            <Link href={'/'}>
                                {/* <Button variant="contained" size='small' sx={{ backgroundColor: '#ff8080 !important', borderRadius: '20px' }}>
                                    Xem tất cả
                                </Button> */}
                            </Link>
                        </Box>
                    </Box>
                </Box>

                <Box component={'section'}>
                    <Box sx={{ background: '#ffff', borderRadius: '15px' }}>
                        <Typography variant='h5' fontWeight={600} padding={'25px'} color={'#415b80'}>NỘI THẤT VĂN PHÒNG NỔI BẬT</Typography>
                        <ProductList productList={dataProduct?.data.list_featured_office}></ProductList>
                        <Box textAlign={'center'} padding={'18px'}>
                            <Link href={'/'}>
                                {/* <Button variant="contained" size='small' sx={{ backgroundColor: '#ff8080 !important', borderRadius: '20px' }}>
                                    Xem tất cả
                                </Button> */}
                            </Link>
                        </Box>
                    </Box>
                </Box>

                <Box component={'section'}>
                    <Stack direction={{ xs: 'column', md: 'row-reverse' }} justifyContent={'space-between'}>
                        <Box>
                            <Image
                                src="https://nhaxinh.com/wp-content/uploads/2022/07/gioi-thieu-nha-xinh-moi-25-7-22-1200x800.jpg"
                                alt="Picture of the banner"
                                fill={true}
                            />
                        </Box>
                        <Box padding={'10%'} sx={{ backgroundColor: '#EBEBEB' }}>
                            <Typography variant='h5' fontWeight={'600'}>THIẾT KẾ NỘI THẤT</Typography>
                            <Typography variant='h6' lineHeight={1.8}>
                                Với kinh nghiệm hơn nhiều năm trong lĩnh vực thiết kế và hoàn thiện nội thất cùng đội ngũ thiết kế chuyên nghiệp,
                                Nhà Xinh mang đến giải pháp toàn diện trong nội thất.<br></br>
                                LH: 0938511556
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box component={'section'}>
                    <Box sx={{ background: '#ffff', borderRadius: '15px' }}>
                        <NewsList newsList={dataPost?.data}></NewsList>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}