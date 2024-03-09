"use client"
import { Box, Card, CardContent, CardActions, Button, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import sanitizeHtml from 'sanitize-html';

type Props = {
    describe: string
}

export function ProductFeatureDescribe({ describe }: Props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Box position={'relative'}>
            <Card sx={{ minWidth: 275, maxHeight: expanded ? '100%' : 400 }} >
                <CardHeader
                    title="Mô tả sản phẩm"
                    sx={{ backgroundColor: '#F2F2F2', color: '#415b80', fontWeight: '600' }}
                />
                <CardContent>
                    <Box sx={{
                        fontSize: '14px',
                        lineHeight: '1.8',
                        color: '#6e7191',
                        '& img': {
                            margin: 'auto'
                        }
                    }} dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(describe, {
                            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
                        })
                    }}></Box>
                </CardContent>
                <CardActions>
                    <Box height={90} width={'100%'} sx={{ position: 'absolute', bottom: 0, background: expanded ? 'transparent' : 'linear-gradient(to bottom,rgba(255 255 255/0),rgba(255 255 255/62.5),rgba(255 255 255/1))' }}></Box>
                </CardActions>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button size="medium" variant="outlined"
                        sx={{ position: 'absolute', bottom: 0, marginBlockEnd: '10px' }}
                        onClick={() => setExpanded(!expanded)}>{expanded ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                </CardActions>
            </Card>
        </Box >
    )
}