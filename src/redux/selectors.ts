'use client';

export const cartSelector = (state: any) => state.cart.cartItems;
export const checkoutSelector = (state: any) => state.cart.checkoutProducts;
export const shippingSelector = (state: any) => state.shipping.shipping;
export const voucherSelector = (state: any) => state.voucher.voucher;
export const addressSelector = (state: any) => state.address.address;
export const productSearchSelector = (state: any) => state.productSearch.productSearch;
