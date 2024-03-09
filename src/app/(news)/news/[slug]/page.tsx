'use client'
import { usePostDetails } from '@/hook'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import sanitizeHtml from 'sanitize-html'
import Loading from '../Loading'
// import plugin
import 'dayjs/locale/vi'; // import locale
import Link from 'next/link'
import Seo from '@/components/common/Seo'
dayjs.locale('vi') // use locale

export default function News() {
    const searchParams = useSearchParams()
    const search = searchParams.get('newsId')

    const { data: postDetail, isLoading } = usePostDetails({ params: { id: search } })
    if (isLoading) return <Loading></Loading>

    return (
        <>
            <Seo data={{
                title: 'Nội Thất KZone — Hãy tạo không gian sống thoải mái',
                description: `Tin tức những phong cách thiết kê nội thất độc đáo. Nợi cập nhật những mậu thiết kế nội thất đẹp`,
                url: 'https://noithatkzone.shop/',
                thumbnailUrl: 'seo-logo.jpg',
            }} />

            <Box bgcolor={'#FCFAF6'}>
                <Box component={'section'} sx={{ width: '100%', maxWidth: '1480px', margin: 'auto', padding: { xs: '5px', md: '25px' } }} >
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between'>
                        <Box width={{ xs: '100%', md: '70%' }}>
                            <Box><Typography variant='h5' fontWeight={600}>{postDetail?.data.title}</Typography></Box>
                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                <Box>
                                    {dayjs(postDetail?.data.updated_at).format('DD/MM/YYYY 	h:mm A')}
                                </Box>
                                <Box margin={'15px 0'}>
                                    <PersonIcon fontSize='small' />
                                    {postDetail?.data.user.name}
                                </Box>
                            </Stack>

                            <Divider />
                            <Box sx={{
                                fontSize: '18px',
                                lineHeight: '1.5',
                                '& img': {
                                    margin: 'auto'
                                }
                            }} dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(postDetail?.data.content as string, {
                                    allowedTags: ['img', 'em', 'p'],
                                    allowedAttributes: {
                                        'img': ['src'],
                                        'p': ['style']
                                    },
                                })
                            }}></Box>
                        </Box>
                        <Box width={{ xs: '100%', md: '25%' }}>
                            <Box><Typography fontSize={'20px'} lineHeight={1.8}>Những bài viết liên quan</Typography></Box>
                            {postDetail?.similar?.map((post, index: React.Key) =>
                                <Link href={`/news/${post.slug}?newsId=${post.id}`} key={index}>
                                    <Card sx={{ minWidth: 275, marginBottom: '15px' }}  >
                                        <CardContent>
                                            <Typography sx={{ fontSize: 15 }} fontWeight={600} gutterBottom>
                                                {post.title}
                                            </Typography>
                                            <CardMedia
                                                component="img"
                                                height="194"
                                                image={post.thumbnail}
                                                alt="Paella dish"
                                            />
                                        </CardContent>
                                    </Card>
                                </Link>
                            )}
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>

    )
}