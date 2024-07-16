import React, { useState, useEffect } from 'react';
import { fetchCreateInventory, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee, fetchgetAllProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

export const CreateInventory = ({ onInventoryCreated }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState(null);
    const [ownerId, setOwnerId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const role = getRoleBasedOnToken();
                let profileData;

                if (role === 'ROLE_OWNER') {
                    profileData = await fetchGetOwner();
                    setOwnerId(profileData.id);
                } else if (role === 'ROLE_EMPLOYEE') {
                    profileData = await fetchGetEmployee();
                    setOwnerId(profileData.owner.id);
                }
            } catch (error) {
                console.error('Error fetching profile information', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const productsData = await fetchgetAllProducts();
                setProducts(productsData);
                setFilteredProducts(productsData); // Inicialmente, mostrar todos los productos
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProfileInfo();
        fetchProducts();
    }, []);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    const handleSelectProduct = (productName) => {
        setSelectedProduct(productName);
        setSearchTerm(productName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const product = products.find(prod => prod.name === selectedProduct);
            if (!product) {
                setError('Producto no encontrado');
                return;
            }
            const inventoryResponse = await fetchCreateInventory(ownerId, product.id, quantity);
            console.log(inventoryResponse);
            onInventoryCreated();
            navigate('/inventories');
        } catch (error) {
            console.log(error);
            setError('Error durante la creación del inventario');
        }
    }

    return (
        <section className="p-4">
            <h1 className="text-center text-3xl font-bold mb-4">Crear Inventario</h1>
            {error && (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="text-lg font-medium">Busca y Selecciona un Producto</Form.Label>
                    <Dropdown onSelect={handleSelectProduct}>
                        <Dropdown.Toggle as={Form.Control}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar producto por nombre"
                            className="py-2 px-3 mb-3 border focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <Dropdown.Menu>
                            {filteredProducts.map((product) => (
                                <Dropdown.Item key={product.id} eventKey={product.name}>
                                    {product.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-lg font-medium">Cantidad</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        className="py-2 px-3 border focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </Form.Group>
                <div className="flex justify-center">
                    <Button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded">
                        Crear Inventario
                    </Button>
                </div>
            </Form>
        </section>
    );
};