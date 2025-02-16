// src/components/EmployeeCard.js
import React from 'react';

const EmployeeCard = ({ employee }) => {
  return (
    <>
      <div className="card-header">
        <h5 className="card-title mb-0">{employee.first_name} {employee.last_name}</h5>
      </div>
      <div className="card-body">
        <p className="card-text"><strong>Email:</strong> {employee.email}</p>
        <p className="card-text"><strong>Designation:</strong> {employee.designation}</p>
        <p className="card-text"><strong>Department:</strong> {employee.department}</p>
        <p className="card-text"><strong>Salary:</strong> {employee.salary}</p>
      </div>
    </>
  );
};

export default EmployeeCard;
