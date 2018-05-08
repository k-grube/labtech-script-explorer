import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import fetch from 'isomorphic-unfetch';
import clientMiddleware from '../utils/reduxClientMiddleware';
import script from './script';

const reducers = combineReducers({
  script,
  form: formReducer,
});

const reducersInitialState = {
  script: {},
  form: {},
};

export const initStore = (initialState = reducersInitialState) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(clientMiddleware(fetch))),
  );
};
