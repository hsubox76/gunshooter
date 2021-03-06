var _ = require('lodash');

const items = [
    {
        id: 'i1001',
        word: 'gun',
        article: 'a',
        description: 'It is a gun, the kind that you shoot people with.',
        bulletCount: 1,
        shoot: 'Shoot the gun with the gun? That would be a neat trick.',
        groundDescription: 'There is a shooting |~i1001:gun| (for shooting) lying on the ground.'
    },
    {
        id: 'i1002',
        word: 'hat',
        article: 'a',
        description: 'It looks like a fedora.',
        shoot: 'I shoot a neat little hole through the hat.',
        groundDescription: 'There is a shabby |~i1002: hat| lying on the ground.'
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

module.exports = itemsById;
