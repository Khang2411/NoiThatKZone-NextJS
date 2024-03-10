'use client'
import { regionApi } from '@/api-client'
import { QueryKeys } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export function useRegionList(options?: SWRConfiguration) {
    const swrResponse = useSWR(
        [QueryKeys.GET_CITY_LIST],
        () => regionApi.getCities(),
        {
            dedupingInterval: 30 * 1000, // 30s
            keepPreviousData: true,
            ...options,
        }
    )
    async function districtList(payload: number) {
        const districts = await regionApi.getDistricts(payload)
        return districts
    }

    async function wardList(payload: number) {
        const wards = await regionApi.getWards(payload)
        return wards
    }

    return { ...swrResponse, districtList, wardList }
}