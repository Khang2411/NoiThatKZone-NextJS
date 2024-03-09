import { Box, Stack, Avatar, Typography, Rating, Modal, Button } from '@mui/material'
import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // import plugin
// import plugin
import 'dayjs/locale/vi' // import locale
dayjs.extend(relativeTime) // use plugin
dayjs.locale('vi') // use locale
import { memo } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField } from '../form';
import { Review } from '@/models';

type ReviewCardProps = {
    review: Review,
    onSubmit?: (payload: any) => void,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ReviewCard = memo(function Greeting({ review, onSubmit }: ReviewCardProps) {
    const schema = yup.object().shape({
        reply: yup
            .string()
            .required('Nội dung không được trống'),
        review_id: yup
            .number()
            .required('Nội dung không được trống'),
    })

    const { handleSubmit, control, setValue } = useForm<{ reply: string, review_id: number }>({
        defaultValues: {
            reply: "",
            review_id: undefined,
        },
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const [open, setOpen] = React.useState(false);

    const handleOpen = (replyUserName: string, reviewId: number) => {
        setValue('reply', '@' + replyUserName + ' '); // ✅ prefer to be registered
        setValue('review_id', reviewId );
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const handleReplySubmit = async (payload: { reply: string, review_id: number }) => {
        await onSubmit?.(payload)
        setOpen(false)
    }

    return (
        <Box>
            <Box marginBlockStart={'1.5rem'}>
                <Stack direction={'row'} gap={1}>
                    <Avatar>H</Avatar>
                    <Box>
                        <Typography fontSize={'18px'} fontWeight={500}>{review.user.name}</Typography>
                        <Box>
                            <Rating name="read-only" size="small" value={(review.rating)} readOnly />
                        </Box>
                        <Box>
                            <Typography fontSize={'16px'}>{review.content}</Typography>
                        </Box>
                        <Stack direction={'row'} gap={1} alignItems={'center'}>
                            <Box><Typography color={'#939ca3'} fontSize={'15px'}>{dayjs(review.updated_at).fromNow(true)} trước</Typography></Box>
                            <FiberManualRecordIcon color="disabled" sx={{ fontSize: 6 }} />
                            <Box><Typography color={'#5998FB'} fontSize={'15px'} onClick={() => handleOpen(review.user.name!, review.id)} style={{ cursor: 'pointer' }}>Trả lời</Typography></Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>

            {review.replies?.map((reply, index: React.Key) =>
                <Box marginBlockStart={'1rem'} paddingLeft={'60px'} key={index}>
                    <Stack direction={'row'} gap={1} bgcolor={'#F8F9FA'} padding={'20px'} borderRadius={'18px'}>
                        <Avatar>H</Avatar>
                        <Box>
                            <Typography fontSize={'18px'} fontWeight={500}>{reply.user_name}</Typography>

                            <Box>
                                <Typography fontSize={'16px'}>{reply.content}</Typography>
                            </Box>
                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                <Box><Typography color={'#939ca3'} fontSize={'15px'}>{dayjs(reply.updated_at).fromNow(true)} trước</Typography></Box>
                                <FiberManualRecordIcon color="disabled" sx={{ fontSize: 6 }} />
                                <Box>
                                    <Typography color={'#5998FB'} fontSize={'15px'} onClick={() => handleOpen(reply.user_name!, reply.id)} style={{ cursor: 'pointer' }}>Trả lời</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box component={'form'} onSubmit={handleSubmit(handleReplySubmit)}>
                        <InputField
                            multiline
                            rows={4}
                            control={control}
                            name='reply'
                            placeholder='Nội dung ...'
                        />
                        <Box>
                            <Button type="submit"
                                variant="contained"
                                size='large'
                                sx={{ backgroundColor: '#1773B0 !important', borderRadius: '5px', marginBlockStart: '15px' }} fullWidth>
                                Trả lời
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
})
export { ReviewCard }