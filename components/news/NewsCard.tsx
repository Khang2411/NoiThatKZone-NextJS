import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import sanitizeHtml from 'sanitize-html'
import { truncate } from '@/utils/truncate'

type Props = {
    news: any
}

export function NewsCard({ news }: Props) {
    return (
        <Box>
            <Link href={`/news/${news.slug}?newsId=${news.id}`}>
                <Image
                    src={news.thumbnail}
                    alt="Picture of the blog"
                    width={428}
                    height={318}
                    style={{ marginBlockEnd: '10px', borderRadius: '10px' }}
                />
                <Box>
                    <Typography fontSize={'18px'} fontWeight={'600'} color={'#415b80'} marginBlockEnd={'10px'}>
                        {news.title}
                    </Typography>

                    <Box sx={{
                        fontSize: '14px',
                        lineHeight: '1.8',
                        color: '#6e7191',
                    }} dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(truncate(news.content, 246) as string, {
                            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
                        })
                    }}></Box>

                </Box>
            </Link>
        </Box>
    )
}