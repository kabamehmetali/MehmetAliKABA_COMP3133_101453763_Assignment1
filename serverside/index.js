require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./src/config/db');

const userTypeDef = require('./src/graphql/typeDefs/userTypeDef');
const employeeTypeDef = require('./src/graphql/typeDefs/employeeTypeDef');
const userResolver = require('./src/graphql/resolvers/userResolver');
const employeeResolver = require('./src/graphql/resolvers/employeeResolver');

(async function startServer() {
  try {
    await connectDB();

    const typeDefs = [userTypeDef, employeeTypeDef];
    const resolvers = [userResolver, employeeResolver];

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
            // Attach the logged-in user's _id to the context.
            return { user: { _id: decoded.userId } };
          } catch (err) {
            console.error('Invalid token:', err);
          }
        }
        return {};
      },
      formatError: (err) => ({ message: err.message }),
    });

    await server.start();

    const app = express();
    server.applyMiddleware({ app, path: '/graphql' });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
  }
})();
