const { gql } = require('apollo-server-express');

const userTypeDef = gql`
  # User Type
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    created_at: String
    updated_at: String
  }

  # Payload returned after login
  type AuthPayload {
    token: String
    user: User
  }

  # Queries
  type Query {
    # Login by providing username OR email, plus password
    login(username: String, email: String, password: String!): AuthPayload
  }

  # Mutations
  type Mutation {
    # Create new user (signup)
    signup(username: String!, email: String!, password: String!): User
  }
`;

module.exports = userTypeDef;
