import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};
