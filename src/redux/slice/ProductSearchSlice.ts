'use client';

import { createSlice } from '@reduxjs/toolkit';

const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState: { productSearch: '' },
    reducers: {
        addProductSearch: (state: any, action: any) => {
            state.productSearch = action.payload;
        },
    },
});

export default productSearchSlice;
