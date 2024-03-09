import { Box, List, ListItem, Typography } from '@mui/material'
import React from 'react'

export function ProductFeatureAttent() {
    return (
        <>
            <Box sx={{ backgroundColor: '#f6f6f6' }}>
                <Typography padding={'10px'} sx={{ background: '#415b80', color: '#ffff' }}>Chính sách vận chuyển: </Typography>
                <List sx={{ padding: '5px', listStyleType: 'disc', pl: 4 }}>
                    <ListItem sx={{ display: 'list-item' }} >
                        <Typography fontSize={'15px'}>Giao hàng & lắp đặt MIỄN PHÍ các quận HCM & Cần Thơ với đơn hàng &gt; 1 triệu gồm : </Typography>
                        <Typography >
                            <Typography fontSize={'12px'} component={'i'}>
                                HCM: Q.1, Q.3, Q.4, Q.5, Q.6, Q.8, Q.10, Q.Tân Bình, Q.Bình Tân, Q.Tân Phú, Q.Phú Nhuận, Q.Gò Vấp, Q.Bình Thạnh.
                            </Typography>
                        </Typography>
                        <Typography>
                            <Typography fontSize={'12px'} component={'i'}>
                                C.Thơ: Q.Ninh Kiều, Q.Cái Răng.
                            </Typography>
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <Typography fontSize={'15px'}>Giao hàng tiêu chuẩn dự kiến 1-7 ngày</Typography>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <Typography fontSize={'15px'}>Các quận ngoại thành và tỉnh khác sẽ có phí thỏa thuận từ 50-200k</Typography>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <Typography fontSize={'15px'}>Các đơn hàng đặt trong giờ hành chính (9h -18h) sẽ có điện thoại xác nhận trong 30’ – 1h</Typography>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <Typography fontSize={'15px'}>Các đơn hàng đặt ngoài giờ hành chính ( sau 18h ) sẽ được xử lý vào ngày hôm sau</Typography>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <Typography fontSize={'15px'}>Các đơn hàng được đặt vào Chủ Nhật sẽ được xử lý vào thứ 2 tuần kế tiếp</Typography>
                    </ListItem>
                </List>
            </Box>
        </>
    )
}