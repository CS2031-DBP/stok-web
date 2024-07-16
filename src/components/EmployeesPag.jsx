import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchgetEmployeesPag, getRoleBasedOnToken, fetchGetOwner, fetchDeleteEmployeeFromOwner } from '../services/api';
import { Button, Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

const EmployeesPag = ({ page, setPage, size, setSize, refresh, handleRefresh }) => {
    const [employees, setEmployees] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const role = getRoleBasedOnToken();
                let profileData;

                if (role === 'ROLE_OWNER') {
                    profileData = await fetchGetOwner();
                    const data = await fetchgetEmployeesPag(profileData.id, page, size);
                    setEmployees(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    alert("Sin permisos");
                }
            } catch (error) {
                console.error('Error al obtener los empleados:', error);
            }
        };

        fetchEmployees();
    }, [page, size, refresh]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSizeChange = (event) => {
        setSize(Number(event.target.value));
        setPage(0);
    };

    const handleUnassignEmployee = async (employeeId) => {
        try {
            const role = getRoleBasedOnToken();
            let profileData;

            if (role === 'ROLE_OWNER') {
                profileData = await fetchGetOwner();
                await fetchDeleteEmployeeFromOwner(profileData.id, employeeId);
                alert('Empleado desvinculado exitosamente');
                setPage(0); // Reiniciar la página a la primera después de la desvinculación
                handleRefresh();
            }
        } catch (error) {
            console.error('Error al desvincular el empleado:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Pagination>
                    <Pagination.Prev 
                        onClick={() => handlePageChange(page - 1)} 
                        disabled={page === 0}
                    >
                        Anterior
                    </Pagination.Prev>
                    <Pagination.Item disabled>{page + 1} de {totalPages}</Pagination.Item>
                    <Pagination.Next 
                        onClick={() => handlePageChange(page + 1)} 
                        disabled={page >= totalPages - 1}
                    >
                        Siguiente
                    </Pagination.Next>
                </Pagination>
                <div className="d-flex align-items-center">
                    <label className="mr-2">Tamaño de página:</label>
                    <input 
                        type="number" 
                        value={size} 
                        onChange={handleSizeChange} 
                        min="1"
                        max="10"
                        className="form-control w-auto"
                    />
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Número de Teléfono</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{employee.firstName} {employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>
                                    <Button 
                                        variant="danger"
                                        onClick={() => handleUnassignEmployee(employee.id)}
                                    >
                                        Desvincular
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-danger">No se encontraron empleados.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default EmployeesPag;