import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './reducers';
import _ from 'lodash';
import rooms from './data/rooms';
import items from './data/items';
import actionWords from './data/action-words';

const initialRoom = rooms[1];
const initialInventory = [items[0], items[1]];

const initialStore = {
    currentRoomId: 1,
    rooms: rooms,
    items: items,
    actions: actionWords,
    inventory: [items['i1001'], items['i1002']],
    log: [],
    commandLine: []
};

export default createStore(mainReducer, initialStore, applyMiddleware(thunk));
