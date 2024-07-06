import { Box, List, Skeleton, ListItem, Grid } from "@mui/material";

export default function Loading() {
    return (
        <>
            <Box sx={{ width: '100%', maxWidth: '1380px', margin: 'auto' }}>
                <Box paddingBlock={'15px'}>
                    <Skeleton width="20%" animation="wave" />
                </Box>
                <Grid container direction={'row'} gap={2}>
                    <Box width={'18%'}>
                        <List sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', position: 'sticky', top: '10px' }}>
                            {Array.from(new Array(3)).map((item: any, index: React.Key | null | undefined) =>
                                <ListItem key={index}>
                                    <Skeleton width="60%" animation="wave" />
                                </ListItem>
                            )}
                        </List>
                    </Box>

                    <Box flex={1}>
                        <Box>
                            <Skeleton variant="rectangular" width={'100%'} height={300} animation="wave" />
                        </Box>

                        <Box marginBlockStart={'15px'} bgcolor={'#ffff'}>
                            <Box sx={{ '& a': { padding: '12px 16px' }, padding: '15px' }}>
                                <Grid container wrap="nowrap" gap={2}>
                                    {Array.from(new Array(4)).map((item: any, index: React.Key | null | undefined) =>
                                        <Skeleton width="15%" animation="wave" key={index}/>
                                    )}
                                </Grid>
                            </Box>
                            <Grid container direction={'row'} flexWrap={'wrap'} gap={2} alignItems="center" justifyContent={'center'}>
                                {Array.from(new Array(12)).map((item: any, index: React.Key | null | undefined) =>
                                    <Skeleton key={index} variant="rectangular" width={255} height={200} animation="wave" />
                                )}
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}