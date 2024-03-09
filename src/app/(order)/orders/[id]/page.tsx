'use client'
import { useOrderDetails } from '@/hook'
import { Box, Card, CardContent, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Image from 'next/image'
import Loading from '../Loading'

type OrderDetailProps = {
    params: { id: number }
}

export default function OrderDetail({ params }: OrderDetailProps) {
    const { data: dataOrder, isLoading } = useOrderDetails({ orderId: params.id })
    if (isLoading) return <Loading></Loading>
    return (
        <>
            <Box component={'section'} sx={{ width: { xs: '95', md: '65%' }, maxWidth: '1480px', margin: 'auto' }}>
                <Box>
                    <Typography variant='h5' margin={'15px 0'} bgcolor={'#FCF9F4'} padding={2}>Chi tiết đơn hàng #{dataOrder?.data.id}</Typography>
                </Box>
                <Box margin={'15px 0'}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <Box sx={{ height: '100%' }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 16 }} fontWeight={600} gutterBottom>
                                            {dataOrder?.data.ship_name}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} >
                                            Địa chỉ: {dataOrder?.data.ship_address}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} >
                                            Điện thoại: {dataOrder?.data.phone}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ height: '100%' }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 16 }} fontWeight={600} gutterBottom textTransform={'uppercase'}>
                                            THANH TOÁN BẰNG {dataOrder?.data.method === 'cod' ? 'tiền mặt' : dataOrder?.data.method}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color={'#FDB266'}>
                                            {(dataOrder?.data.method != 'cod' && dataOrder?.data.momo_id != null || dataOrder?.data.vnpay_id != null) ? 'Thanh toán thành công' : 'Chờ thanh toán'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, minHeight: '42vh' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ paddingLeft: '50px' }}>Sản phẩm</TableCell>
                                    <TableCell align="center">Đơn giá</TableCell>
                                    <TableCell align="center">Số lượng</TableCell>
                                    <TableCell align="center">Tạm tính</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataOrder?.data.products.map((row: any, index: React.Key) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row" align='center'>
                                            <Stack direction={{ xs: 'column', md: 'row' }} alignItems={'center'} gap={1}>
                                                <Image src={row.thumbnail} width={150} height={155} alt={'img-cart'}></Image>
                                                <Typography color={'#415b80'} fontWeight={600}>{row.name}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.pivot.quantity}
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.pivot.quantity * row.pivot.price)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Divider />
                <Box>
                    <Box textAlign={'right'} bgcolor={'#FCF9F4'} boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'} padding={'15px'} borderRadius={'8px'} margin={'0px 0px 15px 0px'}>
                        <Box>
                            <Typography fontSize={'18px'}>Tạm tính: <span>&nbsp;</span>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataOrder?.subTotal!)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography fontSize={'18px'}>Giảm giá: <span>&nbsp;</span> {dataOrder?.sumDiscount ? ' - ' +
                                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataOrder?.sumDiscount) : 'Không có'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography fontSize={'18px'}>Tổng tiền: <span>&nbsp;</span>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataOrder?.total!)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}