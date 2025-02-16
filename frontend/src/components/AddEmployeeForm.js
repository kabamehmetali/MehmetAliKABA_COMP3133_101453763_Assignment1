// src/components/AddEmployeeForm.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NEW_EMPLOYEE } from '../graphql/mutations/employeeMutations';

const initialInput = {
  first_name: '',
  last_name: '',
  email: '',
  gender: 'Other',
  designation: '',
  salary: 1000,
  date_of_joining: '',
  department: '',
  employee_photo: ''
};

const AddEmployeeForm = ({ onEmployeeAdded }) => {
  const [form, setForm] = useState(initialInput);

  const [addEmployee, { loading, error }] = useMutation(ADD_NEW_EMPLOYEE, {
    onCompleted: () => {
      setForm(initialInput);
      if (onEmployeeAdded) onEmployeeAdded();
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee({ variables: { input: { ...form, salary: parseFloat(form.salary) } } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input className="form-control" name="first_name" value={form.first_name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input className="form-control" name="last_name" value={form.last_name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <select className="form-select" name="gender" value={form.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Designation</label>
          <input className="form-control" name="designation" value={form.designation} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Salary</label>
          <input className="form-control" name="salary" type="number" value={form.salary} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Date of Joining</label>
          <input className="form-control" name="date_of_joining" type="date" value={form.date_of_joining} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Department</label>
          <input className="form-control" name="department" value={form.department} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Employee Photo</label>
          <input className="form-control" name="employee_photo" value={form.employee_photo} onChange={handleChange} />
        </div>
        
        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
          {error && <p className="text-danger mt-2">{error.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
