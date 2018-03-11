import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { composeWithDevTools } from 'redux-devtools-extension';
import app from './src/Reducer/app';
import initState from './initState';
import WhatAreHuman from './whatAreHuman';

const link = createHttpLink({
  uri: 'http://127.0.0.1:4000/graphql/',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// const data = client.query({ query });

const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

const store = createStore(
    app,
    initState,
    composeWithDevTools(applyMiddleware(loggerMiddleware)),
);

const App = () => (
    <Provider store={store}>
        <ApolloProvider client={client} >
            <WhatAreHuman />
        </ApolloProvider>
    </Provider>
);

export default App;
