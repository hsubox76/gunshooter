import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './reducers';
import _ from 'lodash';

const rooms = [
    {
        id: 1,
        title: 'A Tunnel',
        description: 'You are in a dark tunnel.',
        itemIds: [1003],
        exits: {
            n: 2,
            e: 3,
            w: 4,
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
    },
    {
        id: 3,
        title: 'A Dead End',
        description: 'You are in a dark tunnel.',
        exits: {
            n: null,
            e: null,
            w: 1,
            s: null,
            u: null,
            d: null
        }
    },
    {
        id: 4,
        title: 'A Dead End',
        description: 'You are in a dark tunnel.',
        exits: {
            n: null,
            e: 1,
            w: null,
            s: null,
            u: null,
            d: null
        }
    }
];

const items = [
    {
        id: 1001,
        word: 'gun',
        article: 'a',
        description: 'It is a gun, the kind that you shoot people with.'
    },
    {
        id: 1002,
        word: 'hat',
        article: 'a',
        description: 'It looks like a fedora.'
    },
    {
        id: 1003,
        word: 'piece of pipe',
        article: 'a',
        description: 'It is a broken-off piece of pipe.',
        groundDescription: 'There is a broken-off |~1003:piece of pipe| lying on the ground.'
    }
];

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

const initialStore = {
    roomsById: _.keyBy(rooms, 'id'),
    currentRoomId: 1,
    actions: startingActions,
    inventory: [items[0], items[1]],
    items: items,
    roomItems: [],
    log: [],
    commandLine: []
};

export default createStore(mainReducer, initialStore, applyMiddleware(thunk));
