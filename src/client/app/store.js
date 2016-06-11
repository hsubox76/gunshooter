import { createStore } from 'redux';
import { mainReducer } from './reducers';
import _ from 'lodash';

const rooms = [
    {
        title: 'A Restaurant',
        description: 'You are in a restaurant.'
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
        word: 'examine',
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
    roomsById: _.map(rooms, (room, index) => { return _.extend({}, room, {id: index}); }),
    currentRoomId: 0,
    actions: startingActions,
    inventory: [items[0], items[1]],
    commandLine: []
};

export default createStore(mainReducer, initialStore);
