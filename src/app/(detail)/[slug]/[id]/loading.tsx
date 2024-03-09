import { Box, Skeleton, Stack } from "@mui/material";

export default function Loading() {
    return (
        <Box component='section'>
            <Box sx={{ width: '100%', maxWidth: '1380px', margin: 'auto', padding: '20px' }}>
                <Stack direction={{ xs: 'column', md: 'row' }} gap={5}>
                    <Box width={{ xs: '100%', md: '40%' }}>
                        <Box position={'sticky'} top={'15px'} padding={'15px'}>
                            <Skeleton variant="rectangular" width={'100%'} height={470} animation="wave" />
                        </Box>
                    </Box>

                    <Box width={{ xs: '100%', md: '55%' }}>
                        <Skeleton width="100%" animation="wave" sx={{ padding: '50px' }} />
                        {Array.from(new Array(4)).map((item: any, index: React.Key | null | undefined) =>
                            <Skeleton key={index} width="70%" animation="wave" sx={{ padding: '5px' }} />
                        )}
                    </Box>
                </Stack>

                <Box marginBlockStart={'15px'}>
                    <Skeleton width="100%" animation="wave" sx={{ padding: '150px' }} />
                </Box>

                <Box marginBlockStart={'15px'}>
                    {Array.from(new Array(4)).map((item: any, index: React.Key | null | undefined) =>
                        <Skeleton key={index} width="100%" animation="wave" sx={{ padding: '5px' }} />
                    )}
                </Box>

                <Box marginBlockStart={'15px'}>
                    {Array.from(new Array(4)).map((item: any, index: React.Key | null | undefined) =>
                        <Skeleton key={index} width="100%" animation="wave" sx={{ padding: '5px' }} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}