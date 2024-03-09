import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { ReviewCard } from '.';
import { Review } from '@/models';
type ReviewListProps = {
    reviews: Review[] | undefined,
    onSubmit?: (payload: any) => void,
}

export function ReviewList({ reviews, onSubmit }: ReviewListProps) {
    const handleReplySubmit = async (payload: any) => {
        await onSubmit?.(payload)
    }
    return (
        <Box>
            <Box marginBlockEnd={'12px'}>
                <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                    <Typography>Lọc xem theo:</Typography>
                    <Button variant="outlined" size='small' sx={{ textTransform: 'none', color: 'unset' }}>Tất cả</Button>
                    <Button variant="outlined" size='small' sx={{ color: '#F2994A' }}>5 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
                    <Button variant="outlined" size='small' sx={{ color: '#F2994A' }}>4 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
                    <Button variant="outlined" size='small' sx={{ color: '#F2994A' }}>3 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
                    <Button variant="outlined" size='small' sx={{ color: '#F2994A' }}>2 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
                    <Button variant="outlined" size='small' sx={{ color: '#F2994A' }}>1 <StarIcon sx={{ fontSize: '16px' }} /> </Button>
                </Stack>
            </Box>
            <Box>
                {reviews?.map((review, index: React.Key) =>
                  <ReviewCard onSubmit={handleReplySubmit} key={index} review={review}></ReviewCard>
                )}
            </Box>
        </Box>
    )
}