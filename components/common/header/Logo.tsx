import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/material';

export function Logo() {
    return (
        <Link href={'/'}>
            {/* <Image alt='logo' width={100} height={100} src="/next.svg" /> */}
            <Typography fontSize={'26px'} fontWeight={600} sx={{opacity:'0.7'}}>KZone</Typography>
        </Link>
    )
}