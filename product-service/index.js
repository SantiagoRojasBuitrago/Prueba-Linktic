const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar cors

const app = express();
const PORT = process.env.PORT || 3001;

// Usar cors en la aplicación
app.use(cors({ origin: '*' }));

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    // Agrega otros campos según sea necesario
});

require('dotenv').config();

// Crear el modelo del producto
const Product = mongoose.model('Product', productSchema);

// Conectar a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
        // Inserta productos iniciales solo si no existen
        insertInitialProducts();
    })
    .catch(err => {
        console.error('Error de conexión:', err);
    });

// Función para insertar productos iniciales
async function insertInitialProducts() {
    const initialProducts = [
        { name: 'Producto A', price: 100 },
        { name: 'Producto B', price: 200 },
        { name: 'Producto C', price: 300 },
    ];

    try {
        for (const product of initialProducts) {
            // Verifica si el producto ya existe
            const existingProduct = await Product.findOne({ name: product.name });
            if (!existingProduct) {
                // Si no existe, crea el nuevo producto
                await Product.create(product);
                console.log(`Producto ${product.name} insertado.`);
            } else {
                console.log(`Producto ${product.name} ya existe. No se inserta.`);
            }
        }
    } catch (error) {
        console.error('Error al insertar productos iniciales:', error);
    }
}

// Rutas para manejar productos
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
});