import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

type Props = {
    product: any
}

export function OrderCard({ product }: Props) {
    return (
        <Box>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Image src={product.thumbnail} width={150} height={155} alt={'img-cart'}></Image>
                <Typography color={'#415b80'} fontWeight={600} flex={1}>{product.name}</Typography>
                <Typography fontSize={'16px'} fontWeight={600} paddingRight={'10px'}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </Typography>
            </Stack>
        </Box>

    )
}