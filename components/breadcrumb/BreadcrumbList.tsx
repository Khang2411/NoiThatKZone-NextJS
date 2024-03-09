import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { Typography } from '@mui/material';

type BreadcrumbListProps = {
    breadcrumb: any
}

export function BreadcrumbList({ breadcrumb }: BreadcrumbListProps) {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{ '& p': { fontSize: { xs: '0.75rem', md: '1rem' } } }}>
                <Link href="/">
                    <Typography color={'#1F6FB8'}>Trang chủ</Typography>
                </Link>

                {breadcrumb?.root_collection || breadcrumb?.collection?.root_collection ? <Link
                    href={`/collections/${breadcrumb?.root_collection?.slug || breadcrumb?.collection.root_collection.slug}/${breadcrumb?.root_collection?.id || breadcrumb?.collection.root_collection.id}`}
                >
                    <Typography color={'#1F6FB8'}>{breadcrumb?.root_collection?.name || breadcrumb?.collection.root_collection.name}</Typography>
                </Link> : ""}

                {breadcrumb?.collection ? <Link
                    color="inherit"
                    href={`/collections/${breadcrumb?.collection.slug}/${breadcrumb?.collection.id}`}
                >
                    <Typography color={'#1F6FB8'}>{breadcrumb?.collection.name}</Typography>
                </Link> : ""}

                <Link
                    href={`/collections/${breadcrumb?.slug}/${breadcrumb?.id}`}
                    aria-current="page"
                >
                    <Typography>{breadcrumb?.name}</Typography>
                </Link>
            </Breadcrumbs>
        </div>
    );
}