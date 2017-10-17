import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import script from './script';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  script,
});
