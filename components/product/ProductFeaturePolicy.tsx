"use client"
import React, { useState } from 'react'
import { Box, List, ListItem, Typography } from '@mui/material'

type Props = {}

export function ProductFeaturePolicy({ }: Props) {

    return (
        <Box sx={{ backgroundColor: '#f6f6f6' }}>
            <Typography padding={'10px'} sx={{ background: '#ff8080', color: '#ffff' }}>Chính sách bảo hành: </Typography>
            <List sx={{ padding: '5px', listStyleType: 'disc', pl: 4 }}>
                <ListItem sx={{ display: 'list-item' }} >
                    <Typography fontSize={'15px'}>
                        Bảo hành 12 tháng.
                        Đổi mới sản phẩm trong vòng 7 ngày nếu phát sinh lỗi từ nhà sản xuất. (Chỉ áp dụng đối với các sản phẩm có sẵn, không áp dụng đối với các sản phẩm đặt theo thiết kế và yêu cầu).
                    </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography fontSize={'15px'}>Sản phẩm lỗi từ nhà sản xuất trong quá trình sản xuất hoặc vận chuyển.</Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography fontSize={'15px'}>Khung chân, khung lưng sắt bị gãy hoặc mối hàn bị nứt.</Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography fontSize={'15px'}>Không được bảo hành Tay ghế, chân ghế bị trầy xước trong quá trình sử dụng.</Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography fontSize={'15px'}>Không được bảo hành Phần vải,da, simili bọc ghế bị rách trong quá trình sử dụng.</Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography fontSize={'15px'}>Không được bảo hành sản phẩm có sự hao mòn tự nhiên do thời gian sử dụng lâu dài, hoặc do thường xuyên tiếp xúc với ánh nắng mặt trời, mưa bão, ẩm mốc.</Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography fontSize={'15px'}>Không được bảo hành sản phẩm có bất kì sự tự ý thay đổi, sửa chữa nào từ phía khách hàng.</Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography fontSize={'15px'}>Thời gian bảo hành: Trong giờ làm việc 8h30 -18h, từ Thứ 2 - thứ 7.</Typography>
                </ListItem>
            </List>
        </Box>
    )
}