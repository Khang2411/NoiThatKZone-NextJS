"use client"
import { BreadcrumbList } from '@/components/breadcrumb'
import { CollectionFilter } from '@/components/category'
import { ProductList } from '@/components/product'
import { useCollectionDetails } from '@/hook'
import { useListingList } from '@/hook/use-listing-list'
import { Box, Divider, List, ListItem, Pagination, Stack } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import Loading from './loading'
import Seo from '@/components/common/Seo'
import NotFound from '@/src/app/not-found'

type CollectionsProps = {
  params: { id: number, slug: string }
}

export default function Collections({ params }: CollectionsProps) {
  const { data: dataCollection, error } = useCollectionDetails({ collectionId: params.id })
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = {
    page: searchParams.get('page') === null ? 1 : searchParams.get('page') as string,
    limit: 12,
    collection_id: params.id,
    sort: searchParams.get('sort')
  }

  const { data: listings, isLoading } = useListingList({ params: filters })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleChange = (event: any, value: any) => {
    router.push(pathname + '?' + createQueryString('page', value))
  };

  if (isLoading) return <Box className="skeleton"><Loading></Loading></Box>;
  if (error) return <><NotFound /></>
  return (
    <>
      <Seo data={{
        title: `${dataCollection?.data.name}`,
        description: `${dataCollection?.data.name} - Những nội thất trong và ngoài nước được lựa chọn kỹ.`,
      }} />

      <Box sx={{ width: '100%', maxWidth: '1460px', margin: 'auto' }}>
        <Box paddingBlock={'15px'}>
          <BreadcrumbList breadcrumb={dataCollection?.data}></BreadcrumbList>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <Box width={{ xs: '100%', md: '18%' }}>
            <List sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', position: 'sticky', top: '10px' }}>
              <ListItem>
                DANH MỤC
              </ListItem>
              <Divider />
              {dataCollection?.data.collections?.map((item: any, index: React.Key | null | undefined) =>
                <ListItem key={index} sx={{ '& .active': { color: '#415B82', borderBottom: '4px solid #415B82' } }}>
                  <Link href={`/collections/${item.slug}/${item.id}`} className={item.slug === params.slug ? 'active' : ""}>{item.name}</Link>
                </ListItem>
              )}
            </List>
          </Box>

          <Box flex={1}>
            <Box>
              {dataCollection?.data.banner &&
                <Image
                  src={dataCollection?.data.banner}
                  alt='img-collections'
                  fill
                />}
            </Box>

            <Box marginBlockStart={'15px'} bgcolor={'#ffff'}>
              <Box sx={{ '& a': { padding: '0 16px' }, padding: '15px' }}>
                <CollectionFilter></CollectionFilter>
              </Box>

              <Divider />
              <ProductList productList={listings?.data}></ProductList>
            </Box>
          </Box>
        </Stack>

        <Box padding={2}>
          <Pagination count={listings?.last_page} shape="rounded" color="primary" sx={{ '& > ul': { justifyContent: 'center' } }} page={listings?.current_page} onChange={handleChange} />
        </Box>
      </Box>
    </>
  )
}