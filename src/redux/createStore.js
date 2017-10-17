// import {createStore as _createStore, applyMiddleware, compose} from 'redux';
// import {routerMiddleware} from 'react-router-redux';
// import thunk from 'redux-thunk';
// import reducer from './reducer';
//
// export default function createStore(history, client, data = {}) {
//   // Sync dispatched route actions to the history
//   const reduxRouterMiddleware = routerMiddleware(history);
//
//   const middleware = [thunk.withExtraArgument(client), reduxRouterMiddleware];
//
//   let finalCreateStore;
//   /* eslint-disable no-undef */
//   if (__DEVELOPMENT__ && __DEVTOOLS__) {
//     /* eslint-disable import/no-extraneous-dependencies */
//     const {persistState} = require('redux-devtools');
//
//     const composeEnhancers =
//       typeof window === 'object' &&
//       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//           // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//         }) : compose;
//
//     finalCreateStore = composeEnhancers(
//       applyMiddleware(...middleware),
//       persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
//     )(_createStore);
//   } else {
//     finalCreateStore = applyMiddleware(...middleware)(_createStore);
//   }
//
//   const store = finalCreateStore(reducer, data);
//
//   /* eslint-disable no-undef */
//   if (__DEVELOPMENT__ && module.hot) {
//     module.hot.accept('./reducer', () => {
//       store.replaceReducer(require('./reducer'));
//     });
//   }
//
//   return store;
// }

import {createStore as _createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createMiddleware from './clientMiddleware';
import reducers from './reducer';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware];

  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
  const store = _createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

  /* eslint-disable no-undef */
  if (__DEVELOPMENT__) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default);
    });
  }

  return store;
}
