'use client'
import { OrderList } from '@/components/order';
import { useOrder } from '@/hook';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import Loading from './Loading';
import { type Order } from '@/models';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} >
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function Order() {
  const { data: orderAllList, isLoading, getOrderPending, getOrderProcessing, getOrderConfirmed, getOrderCompleted, getOrderCancelled } = useOrder({ params: { status: 'all' } })
  const [orders, setOrders] = useState<Order[]>([]);
  const [value, setValue] = React.useState(0);

  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue)
    switch (newValue) {
      case 1:
        const orderPending = await getOrderPending();
        setOrders(orderPending?.data);
        break;
      case 2:
        const orderProcessing = await getOrderProcessing();
        setOrders(orderProcessing?.data);
        break;
      case 3:
        const orderConfirmed = await getOrderConfirmed();
        setOrders(orderConfirmed?.data);
        break;
      case 4:
        const orderCompleted = await getOrderCompleted();
        setOrders(orderCompleted?.data);
        break;
      default:
        const orderCancelled = await getOrderCancelled();
        setOrders(orderCancelled?.data);
        break;
    }
  };

  if (isLoading) return <Loading></Loading>

  return (
    <Box>
      <Box sx={{ maxWidth: '1200px', width: '100%', margin: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} variant="scrollable" scrollButtons="auto"
            onChange={handleChange} aria-label="basic tabs example" sx={{
              backgroundColor: 'white',
              '& div': { justifyContent: 'space-between' },
              '& p': { padding: '0' }
            }}>
            <Tab label="Tất cả" {...a11yProps(0)} />
            <Tab label="Chờ thanh toán" {...a11yProps(1)} />
            <Tab label="Đang xử lý" {...a11yProps(2)} />
            <Tab label="Đã Xác nhận" {...a11yProps(3)} />
            <Tab label="Hoàn thành" {...a11yProps(4)} />
            <Tab label="Hủy" {...a11yProps(5)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {(!orderAllList?.data || orderAllList?.data.length === 0) &&
            <Stack justifyContent={'space-between'} alignItems={'center'}>
              <Box><FindInPageIcon color="primary" sx={{ fontSize: '120px' }} /></Box>
              <Box><Typography variant='h5'>Chưa có đơn hàng</Typography></Box>
            </Stack>}
          <OrderList orderList={orderAllList?.data}></OrderList>
        </CustomTabPanel>

        {(value !== 0 && orders.length === 0) &&
          <Stack justifyContent={'space-between'} alignItems={'center'}>
            <Box><FindInPageIcon color="primary" sx={{ fontSize: '120px' }} /></Box>
            <Box><Typography variant='h5'>Chưa có đơn hàng</Typography></Box>
          </Stack>}

        <CustomTabPanel value={value} index={1}>
          <OrderList orderList={orders}></OrderList>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <OrderList orderList={orders}></OrderList>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <OrderList orderList={orders}></OrderList>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          <OrderList orderList={orders}></OrderList>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={5}>
          <OrderList orderList={orders}></OrderList>
        </CustomTabPanel>
      </Box>
    </Box>

  );
}
