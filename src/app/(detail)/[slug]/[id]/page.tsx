'use client'
import { BreadcrumbList } from '@/components/breadcrumb'
import { ProductFeatureDescribe, ProductFeatureImage, ProductFeatureInfo, ProductFeatureReview, ProductFeatureSimilar } from '@/components/product'
import { ReviewList } from '@/components/reviews'
import { useAuth, useProductSimilar, useReviewList } from '@/hook'
import { useProductDetails } from '@/hook/use-product-details'
import { Box, Divider, Pagination, Stack } from '@mui/material'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './loading'
import Seo from '@/components/common/Seo'

export default function ProductDetail({ params }: { params: { id: number } }) {
    const [page, setPage] = useState(1)
    const { data: product, isLoading } = useProductDetails({ productId: params.id })
    const { data: productSimilar } = useProductSimilar({ productId: params.id })
    const { profile, isLoggedIn } = useAuth()

    const filter = {
        product_id: params.id,
        page: page
    }
    const { data: reviews, addReview, reply } = useReviewList({ params: filter })
    const handleReviewSubmit = async (payload: { review: string, rating: number, user_id: number | undefined, product_id: number | undefined }) => {
        if (payload.rating === 0) {
            alert('Bạn chưa đánh giá lượt sao')
        }
        else if (payload.review === "") {
            alert('Nội dung đánh giá không được trống')
        }
        else if (isLoggedIn === true) {
            payload = { ...payload, user_id: profile?.data.id, product_id: params.id }
            try {
                await addReview(payload)
                toast.success("Đánh giá thành công", { autoClose: 1000 })
            } catch (err) {
                console.log(err)
                return
            }
        } else {
            alert('Bạn phải đăng nhập để thực hiện chức năng này')
        }
    }

    const handleReplySubmit = async (payload: any) => {
        payload = { ...payload, user_id: profile?.data.id, product_id: params.id, }
        try {
            await reply(payload)
            toast.success("Trả lời thành công", { autoClose: 1000 })
        } catch (err) {
            console.log(err)
            return
        }
    }
    const handlePageChange = (event: any, value: any) => {
        setPage(value)
    };

    if (isLoading) return <Box className="skeleton"><Loading></Loading></Box>;
    return (
        <>
            <Seo data={{
                title: 'Nội Thất KZone — Hãy tạo không gian sống thoải mái',
                description: `Chi tiết sản phẩm nội thất. Xem và đánh giá sản phẩm`,
                url: 'https://noithatkzone.shop/',
                thumbnailUrl: 'seo-logo.jpg',
            }} />

            <Box component='section'>
                <ToastContainer />
                <Box sx={{ width: '100%', maxWidth: '1380px', margin: 'auto', padding: '20px' }}>
                    <BreadcrumbList breadcrumb={product}></BreadcrumbList>
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} bgcolor={'#FFFFFF'}>
                        <Box width={{ xs: '100%', md: '43%' }}>
                            <Box position={'sticky'} top={'15px'} padding={'15px'}>
                                <ProductFeatureImage productImages={[product.thumbnail]}></ProductFeatureImage>
                            </Box>
                        </Box>

                        <Box width={{ xs: '100%', md: '55%' }}>
                            <ProductFeatureInfo product={product} user={profile?.data}></ProductFeatureInfo>
                        </Box>
                    </Stack>
                    <Divider></Divider>

                    <Box marginBlockStart={'15px'}>
                        <ProductFeatureSimilar products={productSimilar?.data}></ProductFeatureSimilar>
                    </Box>

                    <Box marginBlockStart={'25px'}>
                        <ProductFeatureDescribe describe={product?.describe}></ProductFeatureDescribe>
                    </Box>

                    <Box marginBlockStart={'15px'}>
                        <ProductFeatureReview onSubmit={handleReviewSubmit}></ProductFeatureReview>
                    </Box>

                    <Box marginBlockStart={'15px'}>
                        <Box component='section' marginBlockStart={'15px'}>
                            <Box boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'} padding={'15px'}>
                                <ReviewList onSubmit={handleReplySubmit} reviews={reviews?.data}></ReviewList>
                            </Box>
                        </Box>
                        <Box>
                            <Pagination count={reviews?.last_page} shape="rounded" color="primary" sx={{ '& > ul': { justifyContent: 'center' } }} page={reviews?.current_page} onChange={handlePageChange} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}