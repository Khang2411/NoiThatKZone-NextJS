'use client'
import { useRegionList } from '@/hook/use-region'
import { Cities, Districts, LoginPayload, Wards } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, SelectChangeEvent, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputField, SelectField } from '../form'

interface AccountAddressProps {
    onSubmit?: (payload: LoginPayload) => void
    cities: Cities[] | undefined
}

export function AccountAddressForm({ onSubmit, cities }: AccountAddressProps) {
    const [districts, setDistricts] = useState<Districts[]>([])
    const [wards, setWards] = useState<Wards[]>([])
    const { districtList, wardList } = useRegionList()

    const schema = yup.object().shape({
        phone: yup
            .string()
            .matches(/^(\+84|84|0)[0-9]{9}$/, 'SĐT không hợp lệ')
            .required('Vui lòng nhập SĐT'),
        apartment_number: yup
            .string()
            .required('Vui lòng nhập số nhà'),
        city_id: yup
            .string()
            .required('Vui lòng chọn Tỉnh/Thành'),
        district_id: yup
            .string()
            .required('Vui lòng chọn Quận/Huyện'),
        ward_id: yup
            .string()
            .required('Vui lòng chọn Phường/Xã'),
    })

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<any>({
        defaultValues: {
            phone: '',
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
            const districtByCity = await districtList(value)
            setDistricts(districtByCity?.data)
        }
        if (name === "district_id") {
            const wardListByDistrict = await wardList(value)
            setWards(wardListByDistrict?.data)
        }
    }

    async function handleLoginSubmit(payload: any) {
        await onSubmit?.(payload)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField name="phone" label="SĐT" control={control} sx={{ marginBlockEnd: '15px' }} />
            <InputField name="apartment_number" label="Số nhà" control={control} sx={{ marginBlockEnd: '15px' }} />

            <Stack direction={'row'} gap={2}>
                <SelectField
                    control={control}
                    name='city_id'
                    label='Tỉnh/Thành phố'
                    onChange={(e: SelectChangeEvent<any>, d) => handleChange(e)}
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
                Lưu
            </Button>
        </Box>
    )
}