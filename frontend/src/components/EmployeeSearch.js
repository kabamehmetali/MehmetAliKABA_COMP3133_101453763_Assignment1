// src/components/EmployeeSearch.js
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_EMPLOYEES } from '../graphql/queries/employeeQueries';

const EmployeeSearch = ({ onResults }) => {
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  
  const [searchEmployees, { loading, error }] = useLazyQuery(
    SEARCH_EMPLOYEES,
    {
      onCompleted: (data) => {
        onResults(data.searchEmployeeByDesignationOrDepartment);
      }
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    searchEmployees({ variables: { designation, department } });
  };

  return (
    <div className="mb-4">
      <h4>Search Employees</h4>
      <form onSubmit={handleSearch} className="row g-2">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {error && <p className="text-danger mt-2">Error: {error.message}</p>}
    </div>
  );
};

export default EmployeeSearch;
