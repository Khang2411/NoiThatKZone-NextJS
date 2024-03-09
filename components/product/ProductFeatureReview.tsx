"use client"
import { Box, Button, Card, CardActions, CardContent, CardHeader, Rating } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';

type FormValues = {
    review: string;
    rating: number
};
type Props = {
    onSubmit?: (payload: any) => void,
}
export function ProductFeatureReview({ onSubmit }: Props) {
    const [rate, setRate] = React.useState<number | null>(3);

    const { handleSubmit, control, setValue } = useForm<FormValues>({
        defaultValues: {
            review: "",
        },
        mode: "onChange"
    });
    const handletSubmit = async (payload: FormValues) => {
        payload = { ...payload, rating: rate || 0 }
        await onSubmit?.(payload)
        setValue('review', '')
    };
    return (
        <Box>
            <Card>
                <CardHeader
                    title="Nhận xét & Đánh giá"
                    sx={{ backgroundColor: '#F2F2F2' }}
                />
                <Box component={'form'} onSubmit={handleSubmit(handletSubmit)}>
                    <Box padding={2}>
                        <Rating
                            name="simple-controlled"
                            value={rate}
                            onChange={(event, newValue) => {
                                console.log(newValue)
                                setRate(newValue);
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