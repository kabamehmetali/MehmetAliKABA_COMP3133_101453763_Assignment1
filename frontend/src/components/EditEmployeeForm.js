// src/components/EditEmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_EMPLOYEE } from '../graphql/mutations/employeeMutations';

const EditEmployeeForm = ({ employee, onUpdateComplete }) => {
  const [form, setForm] = useState({ ...employee });

  const [updateEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: (data) => {
      if (onUpdateComplete) onUpdateComplete(data.updateEmployeeByEid);
    },
  });

  useEffect(() => {
    setForm({ ...employee });
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee({
      variables: { _id: employee._id, input: { ...form, salary: parseFloat(form.salary) } },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">First Name</label>
        <input className="form-control" name="first_name" value={form.first_name || ''} onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Last Name</label>
        <input className="form-control" name="last_name" value={form.last_name || ''} onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input className="form-control" name="email" type="email" value={form.email || ''} onChange={handleChange} />
      </div>
      <div className="col-md-6">
        <label className="form-label">Gender</label>
        <select className="form-select" name="gender" value={form.gender || 'Other'} onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label">Designation</label>
        <input className="form-control" name="designation" value={form.designation || ''} onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Salary</label>
        <input className="form-control" name="salary" type="number" value={form.salary || ''} onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Date of Joining</label>
        <input className="form-control" name="date_of_joining" type="date" value={form.date_of_joining ? form.date_of_joining.split('T')[0] : ''} onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Department</label>
        <input className="form-control" name="department" value={form.department || ''} onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Employee Photo</label>
        <input className="form-control" name="employee_photo" value={form.employee_photo || ''} onChange={handleChange} />
      </div>
      <div className="col-12">
        <button className="btn btn-success" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Employee'}
        </button>
        {error && <p className="text-danger mt-2">{error.message}</p>}
      </div>
    </form>
  );
};

export default EditEmployeeForm;
