'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '~/utils/api';
import { getUser } from '~/utils/localstorage';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: [], checkoutProducts: [] },
    reducers: {
        addCheckoutProduct: (state: any, action: any) => {
            state.checkoutProducts.push(action.payload);
        },
        changeCheckoutProduct: (state: any, action: any) => {
            console.log('payload' + action.payload);
            state.checkoutProducts.forEach((item: any, index: any) => {
                item.productId === action.payload.productId && state.checkoutProducts.splice(index, 1, action.payload);
            });
        },
        removeCheckoutProduct: (state: any, action: any) => {
            state.checkoutProducts.forEach((item: any, index: any) => {
                item.productId === action.payload.productId && state.checkoutProducts.splice(index, 1);
            });
        },
        removeAllCheckoutProduct: (state: any) => {
            state.checkoutProducts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state: any, action: any) => {
                state.cartItems = action.payload;
            })
            .addCase(addToCart.fulfilled, (state: any, action: any) => {
                state.cartItems = action.payload;
            })
            .addCase(deleteFromCart.fulfilled, (state: any, action: any) => {
                state.cartItems = action.payload;
            })
            .addCase(changeCartQuantity.fulfilled, (state: any, action: any) => {
                state.cartItems = action.payload;
            });
    },
});

export const getCart = createAsyncThunk('cart/getCart', async () => {
    const result = await api.getRequest('/cart/get-all/' + getUser().id);
    if (result && result.statusCode === 200) return result.data;
    return [];
});

export const addToCart = createAsyncThunk('cart/addToCart', async (cartItem: any) => {
    let result = await api.postRequest('/cart/create', cartItem);
    if (result && result.statusCode === 200) {
        result = await api.getRequest('/cart/get-all/' + getUser().id);
        if (result && result.statusCode === 200) return result.data;
    }
    return [];
});

export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', async (cartItem: any) => {
    let result = await api.deleteRequest(`/cart/delete/${cartItem.userId}/${cartItem.productId}`);
    if (result && result.statusCode === 200) {
        result = await api.getRequest('/cart/get-all/' + getUser().id);
        if (result && result.statusCode === 200) return result.data;
    }
    return [];
});

export const changeCartQuantity = createAsyncThunk('cart/changeCartQuantity', async (cartItem: any) => {
    let result = await api.putRequest('/cart/update', cartItem);
    if (result && result.statusCode === 200) {
        result = await api.getRequest('/cart/get-all/' + getUser().id);
        if (result && result.statusCode === 200) return result.data;
    }
    return [];
});

export default cartSlice;
