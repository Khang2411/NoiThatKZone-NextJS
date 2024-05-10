"use client"
import { useAuth } from '@/hook';
import { encodeUrl } from '@/utils/url';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function UserMenu() {
    const pathname = usePathname()
    const { isLoggedIn, profile, logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const signOut = async () => {
        await logout()
        setIsOpen(!isOpen)
    }
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Box>
            {isClient && isLoggedIn ? <Avatar alt="Remy Sharp" src={profile?.data?.profile_photo_url} sx={{ width: 28, height: 28, cursor: 'pointer' }} onClick={toggleOpen} />
                : <AccountCircleIcon color="action" onClick={toggleOpen} sx={{ cursor: 'pointer' }} />}

            {isOpen && (
                <Box sx={{
                    position: 'absolute',
                    marginTop: '10px',
                    right: '35px',
                    padding: '8px 0px',
                    backgroundColor: '#fff',
                    zIndex: '999',
                    borderRadius: '8px',
                    borderTop: '2px solid #5B7DA9',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
                }}>
                    {!isLoggedIn &&
                        <Box sx={{
                            "& div:hover": {
                                backgroundColor: '#f7f7f7',
                            }
                        }}>
                            <Link href={`/login?back_to=${encodeUrl(pathname)}`}>
                                <Box sx={{ padding: '12px 30px', whiteSpace: 'nowrap', fontWeight: '600' }}>
                                    Đăng Nhập
                                </Box>
                            </Link>
                            <Link href='/register'>
                                <Box sx={{ padding: '12px 30px', whiteSpace: 'nowrap' }}>
                                    Đăng Ký
                                </Box>
                            </Link>
                        </Box>
                    }

                    {isLoggedIn &&
                        <Box sx={{
                            "& div:hover": {
                                backgroundColor: '#f7f7f7',
                            }
                        }}>
                            <Link href={'/customer'}>
                                <Box sx={{ padding: '12px 30px', whiteSpace: 'nowrap' }}>
                                    Thông tin cá nhân
                                </Box>
                            </Link>
                            <Link href='/orders'>
                                <Box sx={{ padding: '12px 30px', whiteSpace: 'nowrap' }}>
                                    Đơn hàng
                                </Box>
                            </Link>
                            <Box sx={{ padding: '12px 30px', whiteSpace: 'nowrap', cursor: 'pointer' }} textAlign="left" onClick={() => signOut()}>
                                Đăng xuất
                            </Box>
                        </Box>}
                </Box>
            )}
        </Box>
    )
}