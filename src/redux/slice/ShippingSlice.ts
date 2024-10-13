'use client';

import { createSlice } from '@reduxjs/toolkit';

const shippingSlice = createSlice({
    name: 'shipping',
    initialState: { shipping: {} },
    reducers: {
        addShipping: (state: any, action: any) => {
            state.shipping = action.payload;
        },
    },
});

export default shippingSlice;
