'use client'
import { useCollectionHomeList } from '@/hook';
import { Box, MenuItem, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation'

export function HeaderCollection() {
    const pathname = usePathname()
    // console.log(pathname)
    const { data: dataCollections } = useCollectionHomeList({ enabled: pathname === ('/reset-password' || '/forgot-password' || '/login' || "/register") ? false : true })

    return (
        <>
            <Box textAlign={{ xs: 'left', sm: 'center' }}>
                {dataCollections?.data.map((item: any, index: React.Key | null | undefined) =>
                    <Tooltip
                        placement="bottom"
                        key={index}
                        title={
                            <React.Fragment>
                                {item.collections?.map((item: any, index: React.Key | null | undefined) =>
                                    <MenuItem key={index} sx={{ paddingInlineEnd: '100px', fontSize: '13px' }}>
                                        <Link href={`/collections/${item.slug}/${item.id}`}>{item.name}</Link></MenuItem>
                                )}
                            </React.Fragment>
                        }
                    >
                        {<Link href={{
                            pathname: `/collections/${item.slug}/${item.id}`
                        }}>
                            <Typography sx={{
                                display: 'inline-block',
                                marginRight: '3%',
                                paddingBlockEnd: '10px',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                backgroundImage: '-webkit-linear-gradient(left, #000000, #000000, #000000)',
                                backgroundSize: '0% 1.5px',
                                backgroundRepeat: 'no-repeat',
                                transition: 'all 0.25s linear',
                                color: '#415b80',
                                fontSize: '16px',
                                fontWeight: '600',
                                '&:hover': {
                                    backgroundSize: '100% 1.5px'
                                }
                            }}>{item.name}
                            </Typography>
                        </Link>}
                    </Tooltip>
                )}
            </Box>
        </>
    )
}