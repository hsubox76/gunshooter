import { createStore } from 'redux';
import { mainReducer } from './reducers';
import _ from 'lodash';

const rooms = [
    {
        id: 1,
        title: 'A Tunnel',
        description: 'You are in a dark tunnel.',
        exits: {
            n: 1,
            e: 2,
            w: 3,
            s: null,
            u: null,
            d: null
        }
    },
    {
        id: 2,
        title: 'A Dead End',
        description: 'You are in a dark tunnel.',
        exits: {
            n: null,
            e: null,
            w: null,
            s: 1,
            u: null,
            d: null
        }
    }
];

const items = [
    {
        word: 'gun',
        article: 'a',
        description: 'It is a gun, the kind that you shoot people with.'
    },
    {
        word: 'hat',
        article: 'a',
        description: 'It looks like a fedora.'
    }
];

const startingActions = [
    {
        word: 'look',
        preposition: 'at',
        clickable: true,
        visible: true
    },
    {
        word: 'pick up',
        clickable: true,
        visible: true
    },
    {
        word: 'shoot',
        clickable: true,
        visible: true
    }
];

const initialStore = {
    roomsById: _.keyBy(rooms, 'id'),
    currentRoomId: 1,
    actions: startingActions,
    inventory: [items[0], items[1]],
    log: [],
    commandLine: []
};

export default createStore(mainReducer, initialStore);
