import axios from 'axios';

const API_URL = 'http://localhost:3001'; // URL del microservicio de productos

export const getProducts = async () => {
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();
    return data;
};



 