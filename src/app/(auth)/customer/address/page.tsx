'use client'
import { AccountAddressForm } from '@/components/auth';
import { useAccount } from '@/hook';
import { useRegionList } from '@/hook/use-region';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountPhone() {
    const { data: cities } = useRegionList();
    const { updateAddress } = useAccount()

    const handleSubmitAddress = async (payload: any) => {
        try {
            await updateAddress(payload)
            toast.success('Cập nhật địa chỉ thành công', { autoClose: 1000 })
        } catch (err) {
            return;
        }

    }

    return (
        <>
            <ToastContainer />
            <Box sx={{ width: '100%', maxWidth: '960px', margin: 'auto' }}>
                <Box padding={'15px'}>
                    <Typography variant='h6'>Thay đổi địa chỉ</Typography>
                </Box>
                <Stack direction='row' padding={'15px'} gap={3}>
                    <Box>
                        <Avatar alt="Remy Sharp" sx={{ width: 86, height: 86 }} />
                    </Box>

                    <Box flex={1}>
                        <AccountAddressForm cities={cities?.data} onSubmit={handleSubmitAddress}></AccountAddressForm>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}