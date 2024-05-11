'use client'
import { InputField, RadioField, SelectField } from '@/components/form';
import { useAuth } from '@/hook';
import { useRegionList } from '@/hook/use-region';
import { CheckoutPayload, Cities, Districts, Wards } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Box, Button, FormControl, FormControlLabel, Radio, SelectChangeEvent, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface CheckoutProps {
    onSubmit?: (payload: any) => void,
    cities: Cities[] | undefined,
}

export function CheckoutForm({ cities, onSubmit }: CheckoutProps) {

    const { isLoggedIn } = useAuth()
    const [districts, setDistricts] = useState<Districts[]>([])
    const [wards, setWards] = useState<Wards[]>([])

    const { districtList, wardList } = useRegionList({
        revalidateOnMount: false,
    })

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Vui lòng nhập SĐT'),
        phone: yup
            .string()
            .matches(/^(\+84|84|0)[0-9]{9}$/, 'SĐT không hợp lệ')
            .required('Vui lòng nhập SĐT'),
        fullname: yup
            .string()
            .required('Vui lòng nhập Họ và Tên'),
        apartment_number: yup
            .string()
            .required('Vui lòng nhập Địa chỉ'),
        city_id: yup
            .string()
            .required('Vui lòng chọn Tỉnh/Thành'),
        district_id: yup
            .string()
            .required('Vui lòng chọn Quận/Huyện'),
        ward_id: yup
            .string()
            .required('Vui lòng chọn Phường/Xã'),
        paymentMethod: yup
            .string()
            .required('Vui lòng chọn phương thức thanh toán'),
    })

    const schemaLogin = yup.object().shape({
        paymentMethod: yup
            .string()
            .required('Vui lòng chọn phương thức thanh toán'),
    })

    const { handleSubmit, control } = useForm<CheckoutPayload>({
        defaultValues: {
            email: "",
            phone: "",
            fullname: "",
            apartment_number: "",
            city_id: "",
            district_id: "",
            ward_id: "",
            paymentMethod: "",
        },
        resolver: yupResolver(isLoggedIn ? schemaLogin : schema),
    });

    const handleChange = async (e: SelectChangeEvent<any>) => {
        const { name, value } = e.target
        if (name === "city_id") {
            console.log(14444)
            const districtByCity = await districtList(value)
            setDistricts(districtByCity?.data)
        }
        if (name === "district_id") {
            const wardListByDistrict = await wardList(value)
            setWards(wardListByDistrict?.data)
        }
    }
    const handleCheckoutSubmit = async (payload: CheckoutPayload) => {
        await onSubmit?.(payload)
    }
    return (
        <Box>
            <Box component={'form'} onSubmit={handleSubmit(handleCheckoutSubmit)}
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    flex: 1,
                }}>

                {isLoggedIn === false && <Box boxShadow={'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'} padding={'25px'} borderRadius={'10px'}>
                    <Box>
                        <Box>
                            <Typography variant={'h5'} fontWeight={600}>
                                Thông tin liên hệ
                            </Typography>
                        </Box>
                        <InputField
                            control={control}
                            name='phone'
                            placeholder='Số điện thoại'
                        />
                        <InputField
                            control={control}
                            name='email'
                            placeholder='Email'
                        />
                    </Box>

                    <Box>
                        <Box>
                            <Typography variant={'h5'} fontWeight={600}>
                                Thông tin vận chuyển
                            </Typography>
                        </Box>
                        <InputField
                            control={control}
                            name='fullname'
                            placeholder='Họ và tên'
                        />
                        <InputField
                            control={control}
                            name='apartment_number'
                            placeholder='Địa chỉ / Số nhà'
                        />
                        <Stack direction={'row'} margin={'8px'} gap={2}>
                            <SelectField
                                control={control}
                                name='city_id'
                                label='Tỉnh/Thành phố'
                                onChange={(e: SelectChangeEvent<any>) => handleChange(e)}
                                options={cities}
                            />
                            <SelectField
                                control={control}
                                name='district_id'
                                label='Quận/huyện'
                                onChange={(e: SelectChangeEvent<any>) => handleChange(e)}
                                options={districts}
                            />
                            <SelectField
                                control={control}
                                name='ward_id'
                                label='Phường/Xã'
                                onChange={(e: SelectChangeEvent<any>) => handleChange(e)}
                                options={wards}
                            />
                        </Stack>
                    </Box>
                </Box>}

                <Box boxShadow={'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'} padding={'25px'} borderRadius={'10px'} marginBlockStart={'20px'}>
                    <Box>
                        <Typography variant={'h5'} fontWeight={600}>
                            Phương thức thanh toán
                        </Typography>
                    </Box>
                    <FormControl>
                        <RadioField control={control} name='paymentMethod' option={
                            <Box>
                                <FormControlLabel
                                    value="cod"
                                    control={<Radio />}
                                    label={
                                        <Stack direction={'row'} gap={1} alignItems={'center'}>
                                            <Image alt='logo' width={33} height={33} src="/img/cod.png" />
                                            <Typography component={'span'}>Thanh toán khi nhận hàng</Typography>
                                        </Stack>}
                                />
                                <FormControlLabel
                                    value="vnpay"
                                    control={<Radio />}
                                    label={
                                        <Stack direction={'row'} gap={1} alignItems={'center'}>
                                            <CreditCardIcon color="primary" sx={{ fontSize: '30px' }}></CreditCardIcon>
                                            <Typography component={'span'}>Thanh toán qua ngân hàng</Typography>
                                        </Stack>}
                                />
                                <FormControlLabel
                                    value="momo"
                                    control={<Radio />}
                                    label={
                                        <Stack direction={'row'} gap={1} alignItems={'center'}>
                                            <Image alt='logo' width={33} height={33} src="/img/momo.png" />
                                            <Typography component={'span'}>Thanh toán qua Momo</Typography>
                                        </Stack>}
                                />
                            </Box>
                        } />
                    </FormControl>
                </Box>
                <Button type="submit"
                    variant="contained"
                    size='large'
                    sx={{ backgroundColor: '#1773B0 !important', borderRadius: '5px', marginBlockStart: '15px' }} fullWidth>
                    Thanh toán
                </Button>
            </Box>
        </Box>
    )
}