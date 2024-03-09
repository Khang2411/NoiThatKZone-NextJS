import { Box, List, ListItem, Stack } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
export function Footer() {
    return (
        <Box component={'section'} sx={{ backgroundColor: '#ffff', borderTop: '1px solid rgb(221, 221, 221)', color: '#4D559B' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} padding={{ sm: '5px', md: '24px 80px' }}>
                <Box>
                    © 2023 NHK Kzone
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31353.93832298088!2d106.70532400000002!3d10.792746!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b47399cafb%3A0xfb5aa964e6e55268!2zMiDEkC4gVHLGsOG7nW5nIFNhLCBQaMaw4budbmcgMTcsIELDrG5oIFRo4bqhbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1706731700220!5m2!1svi!2sus" 
                    width="100%" height="100%" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Box>
                <Box flex={1}>
                    <List>
                        <ListItem>
                            Liên hệ tư vấn: 0938511556
                        </ListItem>
                        <ListItem>
                            <MailOutlineIcon fontSize="small" /> <span>&nbsp;</span> <span>hk24112000@gmail.com</span>
                        </ListItem>
                        <ListItem>
                            Giới thiệu về KZone
                        </ListItem>
                        <ListItem>
                            Thời gian mở cửa: 9h - 17h30 trừ chủ nhật
                        </ListItem>
                    </List>
                </Box>
                <Box textAlign={'right'}>
                    <FacebookIcon fontSize="small" />
                    <InstagramIcon fontSize="small" />
                </Box>
            </Stack>
        </Box>
    );
}
