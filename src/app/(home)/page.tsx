'use client'
import { BannerList } from '@/components/banner'
import { CollectionList } from '@/components/category'
import Seo from '@/components/common/Seo'
import { Hero } from '@/components/hero'
import { NewsList } from '@/components/news'
import { ProductList } from '@/components/product'
import { useBanner, useBestSeller, useCollectionHomeList, usePost } from '@/hook'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Loading from './Loading'

/* SSR fetch + metadata */

// const getHomeProducts = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/home/best-seller`, {
//         next: { revalidate: 300 }
//     })
//     return res.json();
// }
// const getHomeCollection = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/home/collections`, {
//         next: { revalidate: 300 }
//     })
//     return res.json();
// }

// const getHomePosts = async (params: { limit: number }) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/home/posts?limit=${params.limit}`, {
//         next: { revalidate: 300 }
//     })
//     return res.json();
// }

// const getHomeBanner = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/home/banner`, {
//         next: { revalidate: 300 }
//     })
//     return res.json();
// }

export default function Home() {
    // const homeProducts = await getHomeProducts()
    // const homeCollection = await getHomeCollection()
    // const homePosts = await getHomePosts({ limit: 3 })
    // const homeBanner = await getHomeBanner()

    const { data: homeCollection } = useCollectionHomeList({enabled:true})
    const { data: homeProducts } = useBestSeller({})
    const { data: homePosts } = usePost({ params: { limit: 3 } })
    const { data: homeBanner, isLoading } = useBanner({})

    if (isLoading) return <Loading></Loading>

    return (
        <>
            <Seo data={{
                title: 'Nội Thất KZone | Mua hàng chất lượng',
                description: 'Nội thất được cung cấp bởi nguồn hàng đa dạng trong và ngoài nước với tiêu chi chắc chắn, bền bỉ.',
            }} />

            <Box>
                <Box component={'section'} sx={{ width: '100%', maxWidth: '1920px', margin: 'auto' }}>
                    <Hero heroList={homeBanner?.data.sliders}></Hero>
                </Box>
                <Box sx={{ width: '100%', maxWidth: '1460px', margin: 'auto' }}>
                    <Box component={'section'} padding={'15px'}>
                        <Box sx={{ background: '#ffff', borderRadius: '15px' }}>
                            <Typography variant='h5' fontWeight={600} padding={'20px'} color={'#415b80'}>DANH MỤC NỔI BẬT</Typography>
                            <CollectionList collectionList={homeCollection?.data}></CollectionList>
                        </Box>
                    </Box>

                    <Box component={'section'}>
                        <BannerList bannerList={homeBanner?.data.banners!} ></BannerList>
                    </Box>

                    <Box component={'section'}>
                        <Box sx={{ background: '#ffff', marginBlockEnd: '35px', borderRadius: '15px' }}>
                            <Typography variant='h5' fontWeight={600} padding={'25px'} color={'#415b80'}>SẢN PHẨM BÁN CHẠY <LocalFireDepartmentIcon fontSize='large' sx={{ color: '#CD1817' }} /></Typography>
                            <ProductList productList={homeProducts?.data.list_best_seller}></ProductList>
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
                            <ProductList productList={homeProducts?.data.list_featured_office}></ProductList>
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
                            <NewsList newsList={homePosts?.data}></NewsList>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>

    )
}
