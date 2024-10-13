'use client';

import { createSlice } from '@reduxjs/toolkit';

const voucherSlice = createSlice({
    name: 'voucher',
    initialState: { voucher: {} },
    reducers: {
        addVoucher: (state: any, action: any) => {
            state.voucher = action.payload;
        },
    },
});

export default voucherSlice;
