'use client';

// Import SDK và typing
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useEffect } from 'react';

const PayPalButton = ({ value, onSubmit }: { value: number; onSubmit: () => void }) => {
    let payValue = value / 25000;

    const getExchangeRate = async () => {
        const result = await fetch(
            'https://api.exchangeratesapi.io/v1/latest?access_key=5cef64273c55528d0a2913c204321914&symbols=USD,VND&format=1',
        );
        const data = await result.json();
        if (result?.status === 200) {
            payValue = value / (data.rates.VND / data.rates.USD);
        }
    };
    useEffect(() => {
        getExchangeRate();
    }, [value]);

    const createOrder = function (data: any, actions: any) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: payValue.toFixed(1),
                    },
                    items: [],
                },
            ],
        });
    };

    const onApprove = function (data: any, action: any) {
        return action.order.capture().then(function (response: any) {
            if (response.status === 'COMPLETED') {
                onSubmit();
            }
        });
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId: 'ASfT2VKSmgjDVHDjRoCrZ7pFLf7REl3Wgp8AkwpwlPsQ81d8uJ5dGRl8PswkO6y9-Mc7nUoKvBu5xxni',
            }}
        >
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} style={{ layout: 'horizontal' }} />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
