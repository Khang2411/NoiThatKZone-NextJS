"use client"
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Stack, Typography, Pagination } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { ReviewCard } from '.';
import { useAuth, useReviewList } from '@/hook';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ReviewListProps = {
  lastPage: number,
  productId: number
}

export function ReviewList({ lastPage, productId }: ReviewListProps) {
  const [page, setPage] = useState(1)
  const [rate, setRate] = useState<number | null>(null)
  const { profile, isLoggedIn } = useAuth()

  const filter = {
    product_id: productId,
    rate: rate,
    page: page
  }
  const { data: reviews, reply } = useReviewList({ params: filter })

  const handleReplySubmit = async (payload: any) => {
    payload = { ...payload, user_id: profile?.data.id, product_id: productId }
    try {
      if (isLoggedIn === true) {
        await reply(payload)
        toast.success("Trả lời thành công", { autoClose: 1000 })
      } else {
        alert('Bạn phải đăng nhập để thực hiện chức năng này')
      }

    } catch (err) {
      console.log(err)
      return
    }
  }

  const handlePageChange = (event:React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    console.log(value)
  };

  const handleRateChange = (value: number | null) => {
    setRate(value)
    setPage(1)
  }

  return (
    <Box>
      <ToastContainer />
      <Box marginBlockEnd={'12px'}>
        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
          <Typography>Lọc xem theo:</Typography>
          <Button variant="outlined" size='small' sx={{ textTransform: 'none', color: 'unset' }} onClick={() => { handleRateChange(null) }}>Tất cả</Button>
          <Button variant="outlined" size='small' sx={{ color: '#F2994A' }} onClick={() => { handleRateChange(5) }}>5 <StarIcon sx={{ fontSize: '16px' }} /></Button>
          <Button variant="outlined" size='small' sx={{ color: '#F2994A' }} onClick={() => { handleRateChange(4) }}>4 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
          <Button variant="outlined" size='small' sx={{ color: '#F2994A' }} onClick={() => { handleRateChange(3) }}>3 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
          <Button variant="outlined" size='small' sx={{ color: '#F2994A' }} onClick={() => { handleRateChange(2) }}>2 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
          <Button variant="outlined" size='small' sx={{ color: '#F2994A' }} onClick={() => { handleRateChange(1) }}>1 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
        </Stack>
      </Box>
      <Box>
        {reviews?.data.map((review, index: React.Key) =>
          <ReviewCard onSubmit={handleReplySubmit} key={index} review={review}></ReviewCard>
        )}
      </Box>
      <Box>
        <Pagination count={lastPage} shape="rounded" color="primary" sx={{ '& > ul': { justifyContent: 'center' } }} page={page} onChange={handlePageChange} />
      </Box>
    </Box>
  )
}