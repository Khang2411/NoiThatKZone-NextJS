'use client'
import { useRegionList } from '@/hook/use-region'
import { Cities, Districts, RegisterPayload, Wards } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, CircularProgress, IconButton, InputAdornment, SelectChangeEvent, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputField, SelectField } from '../form'

export interface registerFormProps {
    onSubmit?: (payload: RegisterPayload) => void
    cities: Cities[] | undefined,
}

export function RegisterForm({ onSubmit, cities }: registerFormProps) {
    const [districts, setDistricts] = useState<Districts[]>([])
    const [wards, setWards] = useState<Wards[]>([])
    const { districtList, wardList } = useRegionList({})
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Không được trống'),
        email: yup
            .string()
            .required('Không được trống')
            .email(),
        phone: yup
            .string()
            .matches(/^(\+84|84|0)[0-9]{9}$/, 'SĐT không hợp lệ')
            .required('Vui lòng nhập SĐT'),
        password: yup
            .string()
            .required('Vui lòng nhập Password')
            .min(8, 'Mật khẩu tối thiểu phải 8 ký tự'),
        password_confirmation: yup
            .string()
            .required('Vui lòng nhập Password')
            .min(8, 'Mật khẩu tối thiểu phải 8 ký tự')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
        apartment_number: yup
            .string()
            .required('Không được trống'),
        city_id: yup
            .string()
            .required('Vui lòng chọn Tỉnh/Thành'),
        district_id: yup
            .string()
            .required('Vui lòng chọn Quận/Huyện'),
        ward_id: yup
            .string()
            .required('Vui lòng chọn Phường/Xã')
    })

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<RegisterPayload>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            apartment_number: '',
            city_id: '',
            district_id: '',
            ward_id: ''
        },
        resolver: yupResolver(schema),
    })

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

    async function handleRegisterSubmit(payload: RegisterPayload) {
        await onSubmit?.(payload)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleRegisterSubmit)}>
            <InputField name="name" label="Họ và tên" control={control} sx={{ marginBlockEnd: '15px' }} />

            <InputField name="email" label="Email" control={control} sx={{ marginBlockEnd: '15px' }} />
            <InputField name="phone" label="Số điện thoại" control={control} sx={{ marginBlockEnd: '15px' }} />
            <Box marginBlockEnd={'15px'}>
                <InputField
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Mật khẩu mới"
                    control={control}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword((x) => !x)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Box marginBlockEnd={'15px'}>
                <InputField
                    type={showPasswordConfirm ? 'text' : 'password'}
                    name="password_confirmation"
                    label="Nhập lại mật khẩu mới"
                    control={control}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPasswordConfirm((x) => !x)}
                                    edge="end"
                                >
                                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <InputField name="apartment_number" label="Số nhà" control={control} sx={{ marginBlockEnd: '15px' }} />

            <Stack direction={'row'} gap={2}>
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
            <Button
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, background: '#1976d2 !important' }}
            >
                Đăng Ký
            </Button>
        </Box>
    )
}