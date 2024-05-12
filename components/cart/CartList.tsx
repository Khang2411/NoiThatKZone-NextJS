"use client"
import { Cart } from '@/models';
import { useCartStore } from '@/store/CountCartStore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    cart: Cart[] | undefined,
    onRemoveCart?: (id: number) => void,
    onIncrementCart?: (id: number, stock: number) => void,
    onDecrementCart?: (id: number) => void,
    onCouponCart?: (payload: FormValues) => void,
    isLoading?: boolean
}

type FormValues = {
    coupon: string;
};

export function CartList({ cart, onRemoveCart, onIncrementCart, onDecrementCart }: Props) {

    const removeLocalCart = useCartStore((state) => state.removeCart)

    const handleIncrement = (id: number, stock: number) => {
        onIncrementCart?.(id, stock)
    }

    const handleDecrement = (id: number) => {
        onDecrementCart?.(id)
    }

    const handleRemoveCart = (id: number) => {
        onRemoveCart?.(id)
        removeLocalCart()
    }

    return (
        <Box>
            <Box padding={'15px'}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, minHeight: '42vh' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ paddingLeft: '50px' }}>Sản phẩm</TableCell>
                                <TableCell align="center">Đơn giá</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                <TableCell align="center">Thành tiền</TableCell>
                                <TableCell align="center"><DeleteIcon fontSize="small" color="disabled" /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart?.map((row: any) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align='center'>

                                        <Link href={`/${row.slug}/${row.id}`}>
                                            <Stack direction={{ xs: 'column', md: 'row' }} alignItems={'center'} gap={1}>
                                                <Image src={row.thumbnail} width={150} height={155} alt={'img-cart'}></Image>
                                                <Typography color={'#415b80'} fontWeight={600}>{row.name}</Typography>
                                            </Stack>
                                        </Link>

                                    </TableCell>
                                    <TableCell align="center">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                                <IconButton aria-label="delete" size="small" onClick={() => handleDecrement(row.id)}
                                                    sx={{ border: '1px solid #B0B0B0' }}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                {row.quantity}
                                                <IconButton aria-label="delete" size="small" onClick={() => handleIncrement(row.id, row.stock)}
                                                    sx={{ border: '1px solid #B0B0B0' }}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Stack>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.quantity * row.price)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" onClick={() => handleRemoveCart(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    )
}