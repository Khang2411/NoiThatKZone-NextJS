import { Box, Grid } from '@mui/material'
import React from 'react'
import { ProductCard } from '.'
import { Product } from '@/models'

type Props = {
    productList: Array<Product> | undefined
}

export function ProductList({ productList }: Props) {
    return (
        <Box padding={{ xs: '8px', md: '25px' }}>
            <Grid container direction={'row'} flexWrap={'wrap'} spacing={2}>
                {productList?.map((product: any, index: React.Key) =>
                    <Grid key={index} item xs={6} sm={4} lg={3}>
                        <Box height={'100%'}>
                            <ProductCard key={index} product={product}></ProductCard>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}