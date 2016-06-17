import _ from 'lodash';

const rooms = [
    {
        id: 1,
        title: 'A Hedge Maze',
        description: 'I am in a |~e5001:hedge| maze, with paths leading in several directions.',
        itemIds: ['i1003'],
        environmentDescriptions: {
            'e5001': {word: 'hedge', description: 'It looks like some species of juniper.'}
        },
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
        description: 'I am in a hedge maze.',
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
        description: 'I am in a hedge maze.',
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
        description: 'I am in a hedge maze.',
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

const roomsById = _.keyBy(rooms, 'id');

export default roomsById;