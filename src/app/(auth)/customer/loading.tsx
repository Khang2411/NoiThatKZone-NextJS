import { Box, Skeleton, Stack, Typography } from "@mui/material";

export default function Loading() {
    return (
        <Box sx={{ width: '100%', maxWidth: '960px', margin: 'auto' }}>
            <Box padding={'15px'}>
                <Typography variant='h6'>Thông tin cá nhân</Typography>
            </Box>
            <Stack direction='row' padding={'15px'} gap={3}>
                <Box>
                    <Skeleton variant="circular" width={86} height={86} />
                </Box>

                <Box marginBlockStart={'15px'} flex={1}>
                    {Array.from(new Array(1)).map((item: any, index: React.Key | null | undefined) =>
                        <Skeleton key={index} width="100%" animation="wave" sx={{ padding: '5px' }} />
                    )}
                    {Array.from(new Array(4)).map((item: any, index: React.Key | null | undefined) =>
                        <Skeleton key={index} width="40%" animation="wave" sx={{ padding: '5px' }} />
                    )}
                    {Array.from(new Array(1)).map((item: any, index: React.Key | null | undefined) =>
                        <Skeleton key={index} width="100%" animation="wave" sx={{ padding: '5px' }} />
                    )}
                </Box>
            </Stack>

        </Box>

    )
}