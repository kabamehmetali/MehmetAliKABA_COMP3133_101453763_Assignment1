import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_EMPLOYEES } from '../graphql/queries/employeeQueries';
import { DELETE_EMPLOYEE } from '../graphql/mutations/employeeMutations';
import EmployeeCard from '../components/EmployeeCard';
import AddEmployeeForm from '../components/AddEmployeeForm';
import EmployeeSearch from '../components/EmployeeSearch';
import EditEmployeeForm from '../components/EditEmployeeForm';

const EmployeesPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // State to store search results and selected employee for editing
  const [searchResults, setSearchResults] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch all employees for the logged-in user
  const { data, loading, error, refetch } = useQuery(GET_ALL_EMPLOYEES);
  const employees = data?.getAllEmployees || [];

  // Mutation to delete an employee
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
    },
  });

  // Redirect to login if no token found
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Delete employee handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee({ variables: { _id: id } });
    }
  };

  // When clicking edit, store employee in state to open the edit form
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  // Callback from edit form once update is complete
  const handleUpdateComplete = (updatedEmployee) => {
    setEditingEmployee(null);
    refetch();
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="card p-4 shadow-sm">
      {/* Header with title and logout */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees</h2>
        <button className="btn btn-warning" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Search Component */}
      <EmployeeSearch onResults={(results) => setSearchResults(results)} />

      <hr />
      {/* Add New Employee Form */}
      <h3>Add New Employee</h3>
      <AddEmployeeForm onEmployeeAdded={refetch} />

      <hr />
      {/* Employee List */}
      <h3>Employee List</h3>
      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p className="text-danger">Error: {error.message}</p>
      ) : (
        <>
          {searchResults ? (
            searchResults.length > 0 ? (
              <div className="row">
                {searchResults.map((emp) => (
                  <div key={emp._id} className="col-md-6 col-lg-4 mb-3">
                    <div className="card h-100">
                      <EmployeeCard employee={emp} />
                      <div className="card-body">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleEdit(emp)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(emp._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No employees found matching the search criteria.</p>
            )
          ) : employees.length > 0 ? (
            <div className="row">
              {employees.map((emp) => (
                <div key={emp._id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100">
                    <EmployeeCard employee={emp} />
                    <div className="card-body">
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleEdit(emp)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No employees found.</p>
          )}
        </>
      )}

      {/* Edit Employee Form (visible if an employee is selected for editing) */}
      {editingEmployee && (
        <div className="mt-4">
          <h3>Edit Employee</h3>
          <EditEmployeeForm
            employee={editingEmployee}
            onUpdateComplete={handleUpdateComplete}
          />
          <button className="btn btn-secondary mt-2" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
