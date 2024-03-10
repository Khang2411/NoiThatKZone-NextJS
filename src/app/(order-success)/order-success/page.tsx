import OrderStatus from '@/components/order/OrderStatus';
import { Suspense } from 'react';

export default function OrderSuccess() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderStatus></OrderStatus>
    </Suspense>
  )
}