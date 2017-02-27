import { createElement } from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './components/AppRoot';

const MOUNT_NODE = document.getElementById('root');

const renderElement = (reactElement, node) => {
  ReactDOM.render(reactElement, node);
};

let render = () => renderElement(createElement(AppRoot), MOUNT_NODE);

if (__DEV__) {
  if (module.hot) {
    const renderApp = render;

    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const Redbox = require('redbox-react').default;

    const renderError = (error) =>
      renderElement(createElement(Redbox, { error }), MOUNT_NODE);

    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // This is needed for hot-module-replacement
    module.hot.accept('./components/AppRoot', renderApp);
  }
}

render();
