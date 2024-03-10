'use client'
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Link, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export default function OrderStatus() {
    const searchParams = useSearchParams()
    const momoResult = searchParams.get('resultCode')
    const vnpayResult = searchParams.get('vnp_ResponseCode')

    return (
        <Box textAlign={'center'} height={'75vh'}>
            {momoResult === '0' || vnpayResult === '00' || !momoResult || !vnpayResult ? <Box>
                <DoneIcon sx={{ fontSize: 300 }} color='success' />
                <Box>
                    <Typography variant='h5'>Cảm ơn bạn vì đã mua hàng. </Typography>
                </Box>
            </Box> : <Box>
                <CancelIcon sx={{ fontSize: 300, color: '#FF0000' }} />
                <Box>
                    <Typography variant='h5'>Thanh toán không thành công. </Typography>
                </Box>
            </Box>}
            <Box>
                <Link href={"/"} color={"#5376B1"}>Tiêp tục mua hàng</Link>
            </Box>
        </Box>
    )
}