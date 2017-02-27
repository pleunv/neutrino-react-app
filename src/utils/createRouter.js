import React from 'react';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

function syncWithStore(history, store) {
  return syncHistoryWithStore(history, store, {
    selectLocationState: (state) => state.router
  });
}

export default function createRouter(store, history, routes) {
  return React.createElement(Router, {
    history: syncWithStore(history, store)
  }, routes);
}
