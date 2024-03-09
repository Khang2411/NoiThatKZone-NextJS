import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type CollectionCardProps = {
    collection: any
}

export function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Box
            boxShadow={'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}
            padding={'10px'}
            borderRadius={'10px'}
            height={'100%'}
        >
            <Link href={`/collections/${collection.slug}/${collection.id}`}>
                {collection.thumbnail ? <Image
                    src={collection?.thumbnail}
                    alt="Picture of the category"
                    width={205}
                    height={255}
                    style={{ margin: 'auto', marginBlockEnd: '10px' }}
                /> : ""}
                <Typography textAlign={'center'} color={'#415b80'} fontSize={'18px'} fontWeight={'600'}>{collection.name}</Typography>
            </Link>
        </Box>
    )
}