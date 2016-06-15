import _ from 'lodash';

const items = [
    {
        id: 'i1001',
        word: 'gun',
        article: 'a',
        description: 'It is a gun, the kind that you shoot people with.'
    },
    {
        id: 'i1002',
        word: 'hat',
        article: 'a',
        description: 'It looks like a fedora.'
    },
    {
        id: 'i1003',
        word: 'piece of pipe',
        article: 'a',
        description: 'It is a broken-off piece of pipe.',
        groundDescription: 'There is a broken-off |~i1003:piece of pipe| lying on the ground.'
    }
];

const itemsById = _.keyBy(items, 'id');

export default itemsById;
