# COMP3133 Assignment
# Mehmet Ali KABA
# 101453763


This project is a full-stack application built with **Node.js, Express, GraphQL, and MongoDB** on the backend and **React, Apollo Client, and Bootstrap** on the frontend. It implements user authentication (signup and login) and CRUD operations for managing employee records using GraphQL.

> **Note:** This README covers the project setup and usage before further role-based filtering modifications (such as showing only a normal user's employees versus admin viewing all). It explains everything up to the point where the modal/backend updates for default user registration and employee filtering are introduced.



- **User Authentication:**
  - **Signup:** Users can create a new account.
  - **Login:** Users log in using a single input field for username or email plus a password.
- **Employee Management:**
  - **Get All Employees:** Retrieves a list of all employees.
  - **Add New Employee:** Users can add employee records.
  - **Search Employee by ID:** Retrieve employee details by their ID.
  - **Update Employee by ID:** Update employee information.
  - **Delete Employee by ID:** Delete an employee record.
  - **Search Employees by Designation/Department:** Retrieve employees filtered by designation or department.
- **GraphQL API:**  
  - Built with Apollo Server; all data exchanges in JSON format.
- **Frontend:**  
  - Built with React, uses React Router for navigation, Apollo Client for GraphQL queries/mutations, and styled using Bootstrap.
- **JWT Security:**  
  - JSON Web Tokens are used for authentication.

---

## Project Structure

```
/project-root
│
├── serverside
│   ├── index.js                # Main backend entry point
│   ├── .env                    # Environment configuration (MONGO_URI, JWT_SECRET, PORT)
│   ├── package.json            # Backend dependencies and scripts
│   └── src
│       ├── config
│       │   └── db.js           # MongoDB connection using Mongoose
│       ├── models
│       │   ├── User.js         # Mongoose schema for Users
│       │   └── Employee.js     # Mongoose schema for Employees
│       └── graphql
│           ├── typeDefs
│           │   ├── userTypeDef.js     # GraphQL type definitions for User & authentication
│           │   └── employeeTypeDef.js # GraphQL type definitions for Employee & operations
│           └── resolvers
│               ├── userResolver.js    # Resolvers for signup and login
│               └── employeeResolver.js# Resolvers for employee CRUD operations
│
└── frontend
    ├── package.json            # Frontend dependencies and scripts
    ├── public
    │   └── index.html          # Root HTML (with <div id="root"></div>)
    └── src
        ├── index.js            # Entry point; wraps App in ApolloProvider & imports Bootstrap CSS
        ├── App.js              # Main component with React Router & Navbar layout
        ├── pages
        │   ├── Home.js         # Landing page with welcome message and navigation links
        │   ├── Login.js        # Login page with a single input for username/email and password
        │   ├── Signup.js       # Signup page for registering new users
        │   └── EmployeesPage.js# Page for employee CRUD operations
        ├── components
        │   ├── EmployeeCard.js # Displays employee details in a Bootstrap card
        │   └── AddEmployeeForm.js  # Form component for adding a new employee
        ├── graphql
        │   ├── queries
        │   │   └── employeeQueries.js   # GraphQL query to get all employees
        │   └── mutations
        │       ├── userMutations.js     # GraphQL queries (login) & mutations (signup) for users
        │       └── employeeMutations.js # GraphQL mutations for employee CRUD operations
        ├── services
        │   └── apollo.js       # Apollo Client configuration
        └── styles
            └── global.css      # Custom global styles and optional Bootstrap overrides
```

---

## Installation

### Backend Setup

1. **Navigate to the `serverside` folder:**
   ```bash
   cd serverside
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**  
   Create a `.env` file in the `serverside` folder with the following content (adjust as needed):
   ```env
   MONGO_URI=mongodb://localhost:27017/comp3133__101453763_assigment1
   JWT_SECRET=yourSecretKeyHere
   PORT=4000
   ```
4. **Start the Backend Server:**
   ```bash
   npm start
   ```
   You should see:
   ```
   MongoDB connected successfully
   Server ready at http://localhost:4000/graphql
   ```

### Frontend Setup

1. **Navigate to the `frontend` folder:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the React Development Server:**
   ```bash
   npm start
   ```
   The app should open in your browser at [http://localhost:3000](http://localhost:3000).



## GraphQL API Operations

### 1. Signup
```graphql
mutation Signup($username: String!, $email: String!, $password: String!) {
  signup(username: $username, email: $email, password: $password) {
    _id
    username
    email
  }
}
```

### 2. Login
```graphql
query Login($username: String, $email: String, $password: String!) {
  login(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
```

### 3. Get All Employees (Requires Token)
```graphql
query {
  getAllEmployees {
    _id
    first_name
    last_name
    email
    designation
    salary
    department
    date_of_joining
  }
}
```

### 4. Add New Employee (Requires Token)
```graphql
mutation AddNewEmployee($input: EmployeeInput!) {
  addNewEmployee(input: $input) {
    _id
    first_name
    last_name
    email
    designation
    salary
    department
    date_of_joining
  }
}
```

### 5. Search Employee by ID (Requires Token)
```graphql
query SearchEmployeeByEid($_id: ID!) {
  searchEmployeeByEid(_id: $_id) {
    _id
    first_name
    last_name
    email
    designation
    salary
    department
    date_of_joining
  }
}
```

### 6. Update Employee by ID (Requires Token)
```graphql
mutation UpdateEmployeeByEid($_id: ID!, $input: EmployeeInput!) {
  updateEmployeeByEid(_id: $_id, input: $input) {
    _id
    first_name
    last_name
    email
    designation
    salary
    department
    date_of_joining
  }
}
```

### 7. Delete Employee by ID (Requires Token)
```graphql
mutation DeleteEmployeeByEid($_id: ID!) {
  deleteEmployeeByEid(_id: $_id)
}
```

### 8. Search Employees by Designation or Department (Requires Token)
```graphql
query SearchEmployees($designation: String, $department: String) {
  searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
    _id
    first_name
    last_name
    email
    designation
    salary
    department
    date_of_joining
  }
}
