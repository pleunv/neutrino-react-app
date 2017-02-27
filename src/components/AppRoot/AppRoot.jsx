import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';

import createApolloClient from '../../utils/createApolloClient';
import createBrowserHistory from '../../utils/createBrowserHistory';
import createRouter from '../../utils/createRouter';
import createStore from '../../utils/createStore';

import routes from '../../routes';


const browserHistory = createBrowserHistory(__PROD__);

// eslint-disable-next-line no-underscore-dangle
const store = createStore(window.__INITIAL_STATE__, browserHistory);
const apolloClient = createApolloClient();
const withRHC = (element) => <AppContainer>{element}</AppContainer>;
const routerComponent = createRouter(store, browserHistory, routes);

export default function AppRoot() {
  const app = (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        {routerComponent}
      </Provider>
    </ApolloProvider>
  );

  return __DEV__ ? withRHC(app) : app;
}
