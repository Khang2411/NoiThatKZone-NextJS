"use client"
import { InputField } from '@/components/form';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Link, List, ListItem, Stack, Typography } from '@mui/material';
import Tippy from '@tippyjs/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'tippy.js/dist/tippy.css'; // optional
import { truncate } from '@/utils/truncate'
import { debounce } from '@/utils/debounce';
import Image from 'next/image';

type FormValues = {
    search: string;
};

export function Search() {
    const [search, setSearch] = useState({ data: [] })
    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            search: ""
        },
        mode: "onChange"
    });

    const fetchSearch = async (value: string) => {
        const fetchSearch = await fetch(`http://127.0.0.1:8000/api/v1/search/${value}`)
        const res = await fetchSearch.json();
        console.log(res)
        setSearch(res)
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let keywords = e.target.value;
        debouncedHandler(keywords)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedHandler = useCallback(debounce((keywords) => fetchSearch(keywords), 500), []);

    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <Box width={'100%'}>
            <Tippy
                interactive
                animation={false}
                trigger={'click'}
                placement='bottom'
                render={attrs => (
                    <Box tabIndex={-1} {...attrs}>
                        {search.data.length > 0 && <List sx={{ overflowY: 'auto', bgcolor: "#fff", border: '1px solid #eee', borderRadius: '6px', boxShadow: '0 1px 8px rgba(0,0,0,.3)', width: '350px', height: '450px' }}>
                            {search.data?.map((product: any, index: React.Key) =>
                                <ListItem className="product_suggest" style={{ overflow: 'hidden', listStyle: 'none' }} key={index}>
                                    <Link href={`/${product.slug}/${product.id}`} sx={{ textDecoration: 'none' }}>
                                        <Stack direction={'row'} gap={2} padding={2}>
                                            <Box>
                                                <Image src={product.thumbnail} alt="product-img" width={100} height={90} style={{ objectFit: "cover" }} />
                                            </Box>
                                            <Box>
                                                <Typography color={'#415F87'} fontWeight={600}> {truncate(product.name, 40)}</Typography>
                                                <Stack direction={{ xs: 'column', md: 'row' }}>
                                                    {product.price_before_discount &&
                                                        <Typography fontSize={'16px'} sx={{ textDecoration: 'line-through' }} color={'#74859b'} marginRight={'10px'}>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price_before_discount)}
                                                        </Typography>}
                                                    <Typography fontSize={'16px'} fontWeight={600} color={'#ff8080'}>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Link>
                                </ListItem >)}
                        </List>}

                    </Box>
                )}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        control={control}
                        onChange={(e) => handleChange(e)}
                        name='search'
                        size='small'
                        placeholder='Tìm kiếm sản phẩm...'
                        autoComplete='off'
                        InputProps={{
                            endAdornment: (
                                <IconButton type="submit">
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }} />
                </form>
            </Tippy>
        </Box>
    )
}