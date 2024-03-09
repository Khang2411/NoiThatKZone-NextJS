import { Box, Button, Divider } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { OrderCard } from '.';
type Props = {
    orderList: any
}

export function OrderList({ orderList }: Props) {
    return (
        <Box>
            {orderList?.map((order: any, index: React.Key) =>
                <Box key={index} bgcolor={'white'} marginBlockStart={'15px'}>
                    <Box padding={'10px'} color={'rgb(128, 128, 137)'} fontSize={'18px'}>
                        {order.status === 'processing' && 'Đơn hàng đang xử lí'}
                        {order.status === 'pending' && 'Chờ thanh toán'}
                        {order.status === 'confirmed' && 'Đã xác nhận'}
                        {order.status === 'completed' && 'Đã giao hàng'}
                        {order.status === 'cancelled' && 'Đã hủy'}
                    </Box>
                    <Divider />
                    {order.products?.map((product: any, index: number) =>
                        <OrderCard key={index} product={product}></OrderCard>
                    )}
                    <Box textAlign={'right'} padding={'10px'}>
                        <Link href={`/orders/${order.id}`}><Button variant="outlined">Xem chi tiết</Button></Link>
                    </Box>
                    <Divider></Divider>
                </Box>

            )}
        </Box>
    )
}