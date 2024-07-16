import React, { useState, useEffect } from 'react';
import { getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee, fetchAssignEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

const AssignEmployee = ({ onEmployeeAssigned }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [error, setError] = useState(null);
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

        fetchProfileInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchAssignEmployee(ownerId, employeeId);
            console.log(response);
            onEmployeeAssigned();
            navigate('/employees');
        } catch (error) {
            console.log(error);
            setError('Error durante la asignación del empleado');
        }
    };

    return (
        <section className="p-4">
            <h1 className="text-center text-3xl font-bold mb-4">Asignar Empleado</h1>
            {error && (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="text-lg font-medium">ID del Empleado</Form.Label>
                    <Form.Control
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        placeholder="Ingrese el ID del empleado"
                        className="py-2 px-3 mb-3 border focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </Form.Group>
                <div className="flex justify-center">
                    <Button type="submit" className='bg-primary text-white font-bold py-2 px-4 rounded'>
                        Asignar
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default AssignEmployee;