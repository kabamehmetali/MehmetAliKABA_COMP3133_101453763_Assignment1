const { gql } = require('apollo-server-express');

const employeeTypeDef = gql`
  # Employee Type
  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String
    updated_at: String
  }

  # Input for creating/updating an employee
  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!          # Now required
    gender: String!         # Now required
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  # Extend Query from userTypeDef
  extend type Query {
    # Get all employees
    getAllEmployees: [Employee]

    # Search employee by _id
    searchEmployeeByEid(_id: ID!): Employee

    # Search employees by designation or department
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee]
  }

  # Extend Mutation from userTypeDef
  extend type Mutation {
    # Create new employee
    addNewEmployee(input: EmployeeInput!): Employee

    # Update existing employee by _id
    updateEmployeeByEid(_id: ID!, input: EmployeeInput!): Employee

    # Delete existing employee by _id
    deleteEmployeeByEid(_id: ID!): String
  }
`;

module.exports = employeeTypeDef;
