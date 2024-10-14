'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slice/CartSlice';
import shippingSlice from './slice/ShippingSlice';
import voucherSlice from './slice/VoucherSlice';
import addressSlice from './slice/AddressSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        shipping: shippingSlice.reducer,
        voucher: voucherSlice.reducer,
        address: addressSlice.reducer,
    },
});

export default store;
