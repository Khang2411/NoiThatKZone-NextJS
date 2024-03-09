'use client'
import React, { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import axiosClient from '@/api-client/axios-client'

export function Swr({ children }: { children: ReactNode }) {
    return (
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false, revalidateOnFocus: false }}>{children}</SWRConfig>
    )
}