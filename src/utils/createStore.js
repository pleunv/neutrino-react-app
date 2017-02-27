import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
// import { createEpicMiddleware } from 'redux-observable';

import { makeRootReducer } from '../reducers';
// import rootEpic from '../epics';


export default (initialState = {}, history, thunkArgs = {}) => {
  const enhancers = [];
  // const epicMiddleware = createEpicMiddleware(rootEpic);

  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(
        thunk.withExtraArgument(thunkArgs),
        routerMiddleware(history),
        // epicMiddleware
      ),
      ...enhancers
    )
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const reducers = require('../reducers').makeRootReducer; // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers));
    });

    // module.hot.accept('../epics', () => {
    //   const hotRootEpic = require('../epics').default; // eslint-disable-line global-require
    //   epicMiddleware.replaceEpic(hotRootEpic);
    // });
  }

  return store;
};
