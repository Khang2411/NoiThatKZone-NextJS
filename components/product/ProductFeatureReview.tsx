"use client"
import { Box, Button, Card, CardActions, CardContent, CardHeader, Rating } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import { useAuth, useReviewList } from '@/hook';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
    onSubmit?: (payload: any) => void,
    productId: number
}
export function ProductFeatureReview({ onSubmit, productId }: Props) {
    const [rate, setRate] = React.useState<number>(3);
    const { profile, isLoggedIn } = useAuth()
    const { addReview } = useReviewList({ params: null })

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            review: "",
            rating: rate,
            user_id: profile?.data?.id,
            product_id: productId
        },
        mode: "onChange"
    });
    const handletSubmit = async (payload: { review: string, rating: number, user_id: number | undefined, product_id: number }) => {
        payload = { ...payload, rating: rate || 0 }
        // await onSubmit?.(payload)
        if (payload.rating === 0) {
            alert('Bạn chưa đánh giá lượt sao')
        }
        else if (payload.review === "") {
            alert('Nội dung đánh giá không được trống')
        }
        else if (isLoggedIn === true) {
            payload = { ...payload, user_id: profile?.data.id, product_id: productId }
            try {
                await addReview(payload)
                toast.success("Đánh giá thành công", { autoClose: 1000 })
            } catch (err) {
                console.log(err)
                return
            }
        } else {
            alert('Bạn phải đăng nhập để thực hiện chức năng này')
        }
        setValue('review', '')
    };
    return (
        <Box>
            <ToastContainer />
            <Card>
                <CardHeader
                    title="Nhận xét & Đánh giá"
                    sx={{ backgroundColor: '#F2F2F2' }}
                />
                <Box component={'form'} onSubmit={handleSubmit(handletSubmit)}>
                    <Box padding={2}>
                        <Rating
                            name="rating"
                            value={rate}
                            onChange={(event, newValue) => {
                                console.log(newValue)
                                setRate(newValue || 0);
                            }}
                        />
                    </Box>

                    <CardContent>
                        <InputField
                            multiline
                            rows={3}
                            control={control} name='review' placeholder='Nhập nội dung đánh giá...'></InputField>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="large" type="submit" variant="outlined" sx={{ backgroundColor: '#CB1C22 !important', color: '#fff' }}>
                            Gửi
                        </Button>
                    </CardActions>
                </Box>
            </Card>
        </Box>
    )
}