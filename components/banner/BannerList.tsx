import { Banner } from '@/models'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

type BannerListProps = {
    bannerList: Array<Banner>
}

export function BannerList({ bannerList }: BannerListProps) {
    return (
        <Box >
            <Stack direction={{ sm: 'row' }} justifyContent={'space-between'} padding={'15px'}>
                <Box width={{ sm: '49%' }}>
                    <Link href={`${bannerList?.[0].url}`}>
                        <Box position={'relative'} height={'100%'}>
                            <Image
                                src={bannerList?.[0].thumbnail}
                                alt="Picture of the banner"
                                fill={true}
                                style={{ borderRadius: '10px' }}
                            />
                            <Box position={'absolute'} maxWidth={'300px'} top={15} left={15}>
                                <Typography variant='h6' color={'#32355d'} fontWeight={600}>{bannerList?.[0].title}</Typography>
                            </Box>
                        </Box>
                    </Link>
                </Box>

                <Box width={{ sm: '24%' }}>
                    <Link href={`${bannerList?.[1].url}`}>
                        <Box position={'relative'} marginBlockEnd={'15px'}>
                            <Image
                                src={bannerList?.[1].thumbnail}
                                alt="Picture of the banner"
                                fill={true}
                                style={{ borderRadius: '10px' }}
                            />
                            <Box position={'absolute'} maxWidth={'300px'} top={15} left={15}>
                                <Typography variant='h6' color={'#32355d'} fontWeight={600}>{bannerList?.[1].title}</Typography>
                            </Box>
                        </Box>
                    </Link>

                    <Link href={`${bannerList?.[2].url}`}>
                        <Box position={'relative'}>
                            <Image
                                src={bannerList?.[2].thumbnail}
                                alt="Picture of the banner"
                                fill={true}
                                style={{ borderRadius: '10px' }}
                            />
                            <Box position={'absolute'} maxWidth={'300px'} top={15} left={15}>
                                <Typography variant='h6' color={'#32355d'} fontWeight={600}>{bannerList?.[2].title}</Typography>
                            </Box>
                        </Box>
                    </Link>
                </Box>
                <Box width={{ sm: '23.5%' }}>
                    <Link href={`${bannerList?.[3].url}`}>
                        <Box position={'relative'} height={'100%'}>
                            <Image
                                src={bannerList?.[3].thumbnail}
                                alt="Picture of the banner"
                                fill={true}
                                style={{ borderRadius: '10px' }}
                            />
                            <Box position={'absolute'} maxWidth={'300px'} top={15} left={15}>
                                <Typography variant='h6' color={'#32355d'} fontWeight={600}>{bannerList?.[3].title}</Typography>
                            </Box>
                        </Box>
                    </Link>
                </Box>
            </Stack>
        </Box >
    )
}