'use client'
import { usePostDetails } from '@/hook';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // import locale
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import React from 'react';
import sanitizeHtml from 'sanitize-html';
import Loading from '../../Loading';
import Seo from '@/components/common/Seo';

// type Props = {
//     params: { id: string }
//     searchParams: { [key: string]: string | string[] | undefined }
// }

/* SSR fetch + metadata */

// export async function generateMetadata(
//     { params, searchParams }: Props,
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//     const post = await getPost({ id: params.id })
//     return {
//         title: post.data.title,
//         description: post.data.title,
//         openGraph: {
//             title: post.data.title,
//             description: post.data.title,
//         },
//     }
// }

// const getPost = async (params: { id: number | string }) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts?id=${params.id}`, {
//         next: { revalidate: 300 }
//     })
//     return res.json();
// }
export default function News({ params }: { params: { id: number } }) {
    // const post = await getPost({ id: params.id })

    const { data: post, isLoading } = usePostDetails({ params: { id: params.id } })
    if (isLoading) return <Loading></Loading>

    return (
        <>
            <Seo data={{
                title: post?.data.title!,
                description: post?.data.title + 'Tin tức, phong cách nội thất'
            }}/>

            <Box bgcolor={'#FCFAF6'}>
                <Box component={'section'} sx={{ width: '100%', maxWidth: '1200px', margin: 'auto', padding: { xs: '8px', md: '25px' } }} >
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' gap={5}>
                        <Box width={{ xs: '100%', md: '65%' }}>
                            <Box><Typography variant='h5' fontWeight={600}>{post?.data.title}</Typography></Box>
                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                <Box>
                                    {dayjs(post?.data.updated_at).format('DD/MM/YYYY 	h:mm A')}
                                </Box>
                                <Box margin={'15px 0'}>
                                    <PersonIcon fontSize='small' />
                                    {post?.data.user.name}
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
                                __html: sanitizeHtml(post?.data.content as string, {
                                    allowedTags: ['img', 'em', 'p'],
                                    allowedAttributes: {
                                        'img': ['src'],
                                        'p': ['style']
                                    },
                                })
                            }}></Box>
                        </Box>
                        <Box width={{ xs: '100%', md: '35%' }}>
                            <Box position={'sticky'} top={'15px'} padding={'15px'}>
                                <Box><Typography fontSize={'20px'} lineHeight={1.8}>Những bài viết liên quan</Typography></Box>
                                {post?.similar?.map((item: { slug: string; id: number; title: string, thumbnail: string }, index: React.Key) =>
                                    <Link href={`/news/${item.slug}/${item.id}`} key={index}>
                                        <Card sx={{ width: { sm: '100%', md: '320px' }, marginBottom: '15px' }}>
                                            <CardContent>
                                                <Stack direction={'row'} flexDirection={'row-reverse'} justifyContent={'space-between'} gap={2}>
                                                    <Box position={'sticky'}>
                                                        <Typography sx={{ fontSize: 15 }} fontWeight={600} gutterBottom>
                                                            {item.title}
                                                        </Typography>
                                                    </Box>

                                                    <CardMedia
                                                        sx={{ height: '120px', width: '120px' }}
                                                        component="img"
                                                        image={item.thumbnail}
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                )}</Box>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>

    )
}
