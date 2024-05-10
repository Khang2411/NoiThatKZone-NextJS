'use client'
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { usePathname } from 'next/navigation';
import { Cart, HeaderDesktop, HeaderMobile, Logo, Search, UserMenu } from '..';

export function Header() {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const pathname = usePathname()

    return (
        <>
            <Box component={'section'} sx={{ padding: "15px", height: '100%', borderBlockEnd: '1px solid #dedede' }} position={'relative'}>
                <Stack direction={{ xs: 'column', sm: "row" }} justifyContent={{ sm: "space-between" }} alignItems={'center'} paddingBlockEnd={'15px'}>
                    <Box>
                        <Logo></Logo>
                    </Box>
                    {(pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname === '/reset-password') ? "" :
                        <Stack direction={{ xs: 'column', sm: "row" }} alignItems={'center'} gap={2} width={{ xs: '100%', sm: '30%' }}>
                            <Search />
                            <Stack direction="row" gap={1} justifyContent={'space-between'} alignItems={'center'}>
                                <Cart></Cart>
                                <UserMenu></UserMenu>
                            </Stack>
                        </Stack>
                    }
                </Stack>
                {sm === true ? <HeaderDesktop></HeaderDesktop> : <HeaderMobile></HeaderMobile>}
            </Box>
        </>
    )
}