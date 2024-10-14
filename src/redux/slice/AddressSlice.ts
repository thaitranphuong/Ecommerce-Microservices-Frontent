'use client';

import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: { address: {} },
    reducers: {
        addAddress: (state: any, action: any) => {
            state.address = action.payload;
        },
    },
});

export default addressSlice;
