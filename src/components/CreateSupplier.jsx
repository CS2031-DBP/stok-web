import React, { useState, useEffect } from 'react';
import { fetchGetOwner, fetchCreateSupplier } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

const CreateSupplier = ({ onSupplierCreated }) => {
    const [ownerId, setOwnerId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const profileData = await fetchGetOwner();
                setOwnerId(profileData.id);
            } catch (error) {
                console.error('Error fetching profile information', error);
            }
        };

        fetchProfileInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchCreateSupplier(ownerId, firstName, lastName, email, phoneNumber);
            console.log(response);
            onSupplierCreated();
            navigate('/suppliers');
        } catch (error) {
            console.log(error);
            setError('Error durante la creación del Proveedor');
        }
    }

    return (
        <section className="p-4">
            <h1 className="text-center text-3xl font-bold mb-4">Crear Proveedor</h1>
            {error && (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="text-lg font-medium">Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="py-2 px-3 mb-3 border focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-lg font-medium">Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="py-2 px-3 mb-3 border focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-lg font-medium">Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-2 px-3 mb-3 border focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-lg font-medium">Número de Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="py-2 px-3 mb-3 border focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </Form.Group>
                <div className="flex justify-center">
                    <Button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded">
                        Crear Proveedor
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default CreateSupplier;