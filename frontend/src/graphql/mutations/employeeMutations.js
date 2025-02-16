import { gql } from '@apollo/client';

export const ADD_NEW_EMPLOYEE = gql`
  mutation AddNewEmployee($input: EmployeeInput!) {
    addNewEmployee(input: $input) {
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

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployeeByEid($_id: ID!) {
    deleteEmployeeByEid(_id: $_id)
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployeeByEid($_id: ID!, $input: EmployeeInput!) {
    updateEmployeeByEid(_id: $_id, input: $input) {
      _id
      first_name
      last_name
      email
      designation
      department
      salary
      gender
      date_of_joining
      employee_photo
    }
  }
`;

/* 
Optionally, if you want an Update mutation:
  mutation UpdateEmployeeByEid($_id: ID!, $input: EmployeeInput!) {
    updateEmployeeByEid(_id: $_id, input: $input) {
      _id
      first_name
      last_name
      salary
      ...
    }
  }
*/
