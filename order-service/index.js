const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MONGODB_URI } = require('./config'); // Importa la URL de conexión

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json()); // Middleware para parsear el cuerpo JSON

require('dotenv').config();


let db;

// Conectar a MongoDB
const connectToDB = async() => {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db('linktic'); // Cambia 'myDatabase' por el nombre de tu base de datos
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connectToDB();

// Obtener todas las órdenes
app.get('/orders', async(req, res) => {
    try {
        const orders = await db.collection('orders').find({}).toArray();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Error fetching orders');
    }
});

// Crear una nueva orden
app.post('/orders', async(req, res) => {
    const newOrder = {
        productId: req.body.productId,
        quantity: req.body.quantity,
    };

    try {
        const result = await db.collection('orders').insertOne(newOrder);
        newOrder._id = result.insertedId; // Agregar el ID generado por MongoDB
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
});

app.listen(3002, () => {
    console.log('Order service running on port 3002');
});