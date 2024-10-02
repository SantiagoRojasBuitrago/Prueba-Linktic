import axios from 'axios';

const API_URL = 'http://localhost:3002'; // URL del microservicio de órdenes

export const getOrders = async () => {
    const response = await fetch('http://localhost:3002/orders');
    const data = await response.json();
    return data;
};

export const createOrder = async (orderData) => {
    const response = await fetch('http://localhost:3002/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return await response.json();
};



