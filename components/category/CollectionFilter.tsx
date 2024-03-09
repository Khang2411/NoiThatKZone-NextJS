'use client'
import { Box } from '@mui/material'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'


export function CollectionFilter() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (
        <Box  sx={{ '& .active': { color: '#415B82',borderBottom: '4px solid #415B82'} }}>
            <Link
                className={searchParams.get('sort') === 'default' ? 'active' : ''}
                href={{
                    pathname: pathname,
                    query: { sort: 'default' },
                }} >Phổ Biến</Link>
            <Link
                className={searchParams.get('sort') === 'top-seller' ? 'active' : ''}
                href={{
                    pathname: pathname,
                    query: { sort: 'top-seller' },
                }}>Sản phẩm bán chạy</Link>
            <Link
                className={searchParams.get('sort') === 'price-asc' ? 'active' : ''}
                href={{
                    pathname: pathname,
                    query: { sort: 'price-asc' },
                }}>Giá Thấp Đến Cao</Link>
            <Link
                className={searchParams.get('sort') === 'price-desc' ? 'active' : ''}
                href={{
                    pathname: pathname,
                    query: { sort: 'price-desc' },
                }}>Giá Cao Đến Thấp</Link>
        </Box>
    )
}