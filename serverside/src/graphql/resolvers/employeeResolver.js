// src/graphql/resolvers/employeeResolver.js
const Employee = require('../../models/Employee');

module.exports = {
  Query: {
    // Only returns employees created by the logged‑in user.
    getAllEmployees: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return await Employee.find({ created_by: context.user._id });
    },
    // Search employee by _id, only if it belongs to the logged‑in user.
    searchEmployeeByEid: async (_, { _id }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const employee = await Employee.findOne({ _id, created_by: user._id });
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    },
    // Search employees by designation or department, but only for the logged‑in user.
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const query = { created_by: user._id };
      if (designation) query.designation = designation;
      if (department) query.department = department;
      return await Employee.find(query);
    }
  },

  Mutation: {
    addNewEmployee: async (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      // Check if the email already exists.
      const existing = await Employee.findOne({ email: input.email });
      if (existing) {
        throw new Error('An employee with this email already exists');
      }
      // Create a new employee with the created_by field set to the logged‑in user's _id.
      const newEmployee = new Employee({
        ...input,
        created_by: user._id
      });
      await newEmployee.save();
      return newEmployee;
    },

    updateEmployeeByEid: async (_, { _id, input }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      // Find the employee and ensure it belongs to the logged‑in user.
      const employee = await Employee.findOne({ _id, created_by: user._id });
      if (!employee) {
        throw new Error('Employee not found or not authorized to update');
      }
      Object.keys(input).forEach((key) => {
        employee[key] = input[key];
      });
      await employee.save();
      return employee;
    },

    deleteEmployeeByEid: async (_, { _id }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      // Ensure that only employees owned by the user can be deleted.
      const employee = await Employee.findOne({ _id, created_by: user._id });
      if (!employee) {
        throw new Error('Employee not found or not authorized to delete');
      }
      await Employee.deleteOne({ _id });
      return 'Employee deleted successfully';
    }
  }
};
