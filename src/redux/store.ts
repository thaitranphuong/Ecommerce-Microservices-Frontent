'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/CartSlice';
import shippingSlice from './slice/ShippingSlice';
import voucherSlice from './slice/VoucherSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        shipping: shippingSlice.reducer,
        voucher: voucherSlice.reducer,
    },
});

export default store;
