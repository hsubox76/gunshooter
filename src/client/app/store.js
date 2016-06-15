import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './reducers';
import _ from 'lodash';
import rooms from './data/rooms';
import items from './data/items';

const startingActions = [
    {
        id: 1,
        word: 'look at',
        clickable: true,
        visible: true
    },
    {
        id: 2,
        word: 'take',
        clickable: true,
        visible: true
    },
    {
        id: 3,
        word: 'shoot',
        clickable: true,
        visible: true
    },
    {
        id: 4,
        word: 'use',
        preposition: 'on',
        clickable: true,
        visible: true
    }
];

const initialRoom = rooms[1];
const initialInventory = [items[0], items[1]];

const initialStore = {
    currentRoom: rooms[1],
    actions: startingActions,
    inventory: [items['i1001'], items['i1002']],
    roomItems: [],
    log: [],
    commandLine: []
};

export default createStore(mainReducer, initialStore, applyMiddleware(thunk));
