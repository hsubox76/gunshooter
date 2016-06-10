import { createStore } from 'redux';
import { mainReducer } from './reducers';

const initialStore = {};

export default createStore(mainReducer, initialStore);
