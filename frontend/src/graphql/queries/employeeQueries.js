// src/graphql/queries/employeeQueries.js
import { gql } from '@apollo/client';

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      _id
      first_name
      last_name
      email
      designation
      department
      salary
    }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($designation: String, $department: String) {
    searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
      _id
      first_name
      last_name
      email
      designation
      department
      salary
    }
  }
`;
