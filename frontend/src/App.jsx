import React, { useState, useEffect } from 'react';
import { getProducts } from './services/ProductService';
import { createOrder, getOrders } from './services/OrderService';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Cargar los productos cuando el componente se monte
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const productList = await getProducts();
            setProducts(productList);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const orderList = await getOrders();
            setOrders(orderList);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleCreateOrder = async () => {
        if (selectedProduct) {
            const orderData = {
                productId: selectedProduct._id,
                quantity,
            };
            try {
                await createOrder(orderData);
                alert('Order created successfully');
                fetchOrders(); // Actualiza las órdenes después de crear una
            } catch (error) {
                console.error('Error creating order:', error);
                alert('Failed to create order');
            }
        } else {
            alert('Please select a product');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">E-commerce Platform</h1>
            
            {/* Mostrar lista de productos */}
            <h2>Product Catalog</h2>
            {products.length > 0 ? (
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: ${product.price}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading products...</p>
            )}

            {/* Selección de producto y cantidad */}
            {selectedProduct && (
                <div className="my-4 p-3 border rounded">
                    <h3>Selected Product: {selectedProduct.name}</h3>
                    <label className="form-label">Quantity: </label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button className="btn btn-success" onClick={handleCreateOrder}>
                        Create Order
                    </button>
                </div>
            )}

            {/* Mostrar lista de órdenes */}
            <h2>Orders</h2>
            <button className="btn btn-info mb-3" onClick={fetchOrders}>
                Load Orders
            </button>
            {orders.length > 0 ? (
                <ul className="list-group">
                    {orders.map((order) => (
                        <li key={order._id} className="list-group-item">
                            Product ID: {order.productId}, Quantity: {order.quantity}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders yet</p>
            )}
        </div>
    );
};

export default App;
