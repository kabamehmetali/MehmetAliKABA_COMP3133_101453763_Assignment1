// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './services/apollo';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './styles/global.css'; 

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
