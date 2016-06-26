import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './reducers';
import _ from 'lodash';
import actionWords from './data/action-words';

const initialStore = {
    currentRoom: null,
    gameState: {},
    actions: actionWords,
    inventory: ['i1001', 'i1002'],
    items: null,
    log: [],
    commandLine: [],
    roomChanges: {},
    itemChanges: {}
};

export default createStore(mainReducer, initialStore, applyMiddleware(thunk));
