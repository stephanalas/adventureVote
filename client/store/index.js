import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import reducer from './reducers';
const store = createStore(reducer, applyMiddleware(thunks, loggingMiddleware));

export default store;
